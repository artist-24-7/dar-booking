// Form Submission Logic
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // جلب البيانات
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const checkin = document.getElementById('checkin').value;
    const checkout = document.getElementById('checkout').value;
    const guests = document.getElementById('guests').value;
    const message = document.getElementById('message').value;
    const messageDiv = document.getElementById('formMessage');

    // 1. التحقق من البيانات (Validation)
    if (!name || !email || !checkin || !checkout || !guests) {
        messageDiv.textContent = '⚠️ يرجى ملء جميع الحقول المطلوبة!';
        messageDiv.style.color = 'red';
        return;
    }

    // 2. حساب عدد الليالي
    const checkInDate = new Date(checkin);
    const checkOutDate = new Date(checkout);
    const nights = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24);

    if (nights < 2) {
        messageDiv.textContent = '⚠️ أقل مدة للحجز هي ليلتان (2 nights)!';
        messageDiv.style.color = 'orange';
        return;
    }

    // رسالة "جاري الإرسال..."
    messageDiv.textContent = '⏳ جاري إرسال الطلب...';
    messageDiv.style.color = 'blue';

    // 3. تجهيز البيانات للإرسال
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('checkin', checkin);
    formData.append('checkout', checkout);
    formData.append('guests', guests);
    formData.append('nights', nights + ' ليالي');
    formData.append('message', message);

    // 4. الإرسال الفعلي لـ Formspree
    fetch('https://formspree.io/f/mqeldvjv', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // النجاح: الرسالة وصلات
            messageDiv.textContent = '✅ تم استلام طلبك! سنتصل بك قريباً لتأكيد الحجز.';
            messageDiv.style.color = 'green';
            document.getElementById('contactForm').reset(); // مسح الخانات
            
            // (اختياري) فتح الواتساب تلقائياً بعد الحجز
            // openWhatsApp(name, checkin, checkout, nights); 
        } else {
            // فشل الإرسال
            return response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    messageDiv.textContent = '❌ حدث خطأ: ' + data["errors"].map(error => error["message"]).join(", ");
                } else {
                    messageDiv.textContent = '❌ حدث خطأ غير متوقع، يرجى المحاولة لاحقاً.';
                }
                messageDiv.style.color = 'red';
            });
        }
    })
    .catch(error => {
        messageDiv.textContent = '❌ مشكلة في الاتصال! تحقق من الإنترنت.';
        messageDiv.style.color = 'red';
    });
});

// دالة لفتح الواتساب (اختياري)
function openWhatsApp(name, checkin, checkout, nights) {
    const phoneOwner = "212600000000"; // بدل هادي بالنمرة ديالك
    const text = `Salam, Smiti ${name}. Bghit nhjez mn ${checkin} tal ${checkout} (${nights} lyali).`;
    const url = `https://wa.me/${phoneOwner}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
}

// كود Smooth Scroll و Animation (خليتو ليك كيف ما كان حيث مزيان)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
