// Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.getElementById('guests').value;
    const message = document.getElementById('message').value;
    
    // التحقق من البيانات
    if (!name || !email || !checkin || !checkout || !guests || !message) {
        document.getElementById('formMessage').textContent = 'يرجى ملء جميع الحقول المطلوبة!';
        document.getElementById('formMessage').style.color = 'red';
        return;
    }
    
    // حساب عدد الليالي
    const checkInDate = new Date(checkin);
    const checkOutDate = new Date(checkout);
    const nights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);
    
    if (nights < 2) {
        document.getElementById('formMessage').textContent = 'الحد الأدنى للإيجار: ليلتان!';
        document.getElementById('formMessage').style.color = 'red';
        return;
    }
    
    // رسالة النجاح
    document.getElementById('formMessage').textContent = '✅ تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.';
    document.getElementById('formMessage').style.color = 'green';
    
    // إرسال البريد (عبر EmailJS أو Formspree)
    sendEmailViaFormspree(name, email, phone, checkin, checkout, guests, message, nights);
    
    // مسح النموذج
    document.getElementById('contactForm').reset();
    
    setTimeout(() => {
        document.getElementById('formMessage').textContent = '';
    }, 5000);
});

// إرسال البريد عبر Formspree
function sendEmailViaFormspree(name, email, phone, checkin, checkout, guests, message, nights) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('checkin', checkin);
    formData.append('checkout', checkout);
    formData.append('guests', guests);
    formData.append('nights', nights);
    formData.append('message', message);
    
    // ملاحظة: بعد ما تسجل على Formspree، بتحط الـ URL ديالك هنا
    // الشكل: https://formspree.io/f/YOUR_FORM_ID
    
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .catch((error) => console.log('Error:', error));
}

// Smooth Scrolling للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// تأثير Fade-in عند التمرير
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// تطبيق الـ observer على العناصر
document.querySelectorAll('.info-card, .gallery-item, .feature-box, .service-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// فتح الفيديو في صورة كبيرة (اختياري)
function openVideoModal(videoUrl) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center; z-index: 1000;" onclick="this.remove()">
            <div style="position: relative; width: 90%; max-width: 800px;">
                <iframe width="100%" height="500" src="${videoUrl}?autoplay=1" frameborder="0" allowfullscreen style="border-radius: 10px;"></iframe>
                <button onclick="this.parentElement.parentElement.remove()" style="position: absolute; top: -40px; right: 0; background: white; border: none; padding: 10px 15px; cursor: pointer; border-radius: 5px; font-weight: bold;">إغلاق</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}
