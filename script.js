/**
 * Ocean View Villa - Premium Core Engine
 * Handles Security, Asset Protection, Geo-Routing, Activity Search & High-Fidelity Image Zoom Modals
 * Fully optimized for seamless compatibility with index(6).html and layout-6 architectures.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Ocean View Villa global script successfully initialized.');

    // ==========================================================================
    // 1. ADVANCED PHOTO PROTECTION SYSTEM
    // ==========================================================================
    const initializeAssetProtection = () => {
        let toast = document.getElementById('copyright-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'copyright-toast';
            document.body.appendChild(toast);
        }

        let toastTimeout;
        const triggerProtectionAlert = (message) => {
            toast.innerHTML = `<i class="fa-solid fa-copyright text-amber-500 text-sm"></i> <span>${message}</span>`;
            toast.classList.add('show');
            
            clearTimeout(toastTimeout);
            toastTimeout = setTimeout(() => {
                toast.classList.remove('show');
            }, 2500);
        };

        // Prevent image drag across the site
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('dragstart', (e) => {
                e.preventDefault();
                triggerProtectionAlert('Premium Asset: Dragging images is disabled.');
            });
        });

        // Prevent right click on images and defined gallery slots
        document.addEventListener('contextmenu', (e) => {
            if (e.target.tagName === 'IMG' || e.target.closest('#gallery') || e.target.closest('#villa-gallery') || e.target.closest('.grid')) {
                e.preventDefault();
                triggerProtectionAlert('Asset Protection Active: Photography is copyrighted.');
            }
        });
    };

    initializeAssetProtection();

    // Watch dynamic contents to apply drag protection automatically
    const observer = new MutationObserver(() => {
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('data-protected')) {
                img.setAttribute('data-protected', 'true');
                img.addEventListener('dragstart', (e) => e.preventDefault());
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });


    // ==========================================================================
    // 2. AUTOMATED GEOROUTING LOCALE PACKAGES ENGINE
    // ==========================================================================
    const simulateGeoRouting = () => {
        const geoBar = document.getElementById('geo-bar');
        if (!geoBar) return;

        setTimeout(() => {
            const simulatedLocales = ['the United Kingdom', 'France', 'Germany', 'Spain', 'Italy', 'Morocco', 'Belgium', 'the Netherlands'];
            const randomCountry = simulatedLocales[Math.floor(Math.random() * simulatedLocales.length)];
            
            const textSpan = geoBar.querySelector('span');
            if (textSpan) {
                textSpan.innerHTML = `Welcome traveler! Visiting from <span class="underline decoration-2 underline-offset-2 font-bold">${randomCountry}</span>? Long stay custom discounts from 10% to 30% are automatically available for you!`;
            }
            
            geoBar.classList.remove('hidden');
            geoBar.classList.add('block', 'animate-slide-up');
        }, 1500);
    };

    simulateGeoRouting();


    // ==========================================================================
    // 3. LIVE ACTIVITY SEARCH & FILTER SYSTEM (For activities.html)
    // ==========================================================================
    const searchInput = document.getElementById('activity-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.activity-card');
            
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const text = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(query) || text.includes(query)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }


    // ==========================================================================
    // 4. HIGH-FIDELITY IMMERSIVE ZOOM SYSTEM (Universal Layout Engine)
    // ==========================================================================
    const initializeLightboxZoom = () => {
        // الاستهداف الشامل لجميع الصور داخل حاويات العرض لضمان التوافق مع الهيكل الجديد لـ index(6)
        const targetSelectors = 'section img, .grid img, main img, #gallery img, #villa-gallery img, [id*="gallery"] img';
        const allImages = document.querySelectorAll(targetSelectors);
        
        allImages.forEach(img => {
            // استثناء الأيقونات الصغيرة جداً أو الأعلام لكي لا يتم تكبيرها بالخطأ
            if (img.clientWidth < 60 && img.naturalWidth < 60) return;
            
            img.style.cursor = 'zoom-in';
            
            img.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation(); // حظر فوري لأي تداخل مع أدوات الترجمة التلقائية
                
                // بناء هيكل نافذة العرض المتطابقة مع كود الـ CSS الجديد
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox-modal notranslate skiptranslate';
                lightbox.setAttribute('translate', 'no');
                
                lightbox.innerHTML = `
                    <button class="lightbox-close-x notranslate" translate="no" aria-label="Close">&times;</button>
                    <div class="relative max-w-5xl max-h-[85vh] flex items-center justify-center animate-slide-up select-none notranslate" translate="no">
                        <img src="${img.src}" alt="${img.alt || 'Ocean View Villa Premium Asset'}" class="global-zoom-img notranslate" translate="no">
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                
                // تفعيل وضعية ملء الشاشة وحظر نزول الصفحة الخلفية
                document.documentElement.classList.add('custom-lightbox-active');
                
                // بدء تفعيل تأثير التلاشي التدريجي (Fade In)
                setTimeout(() => {
                    lightbox.classList.add('opacity-100');
                }, 10);
                
                const lightboxImg = lightbox.querySelector('.global-zoom-img');
                const closeBtn = lightbox.querySelector('.lightbox-close-x');
                let isZoomed = false;
                
                // نقرة ثانية اختيارية داخل الصورة لعمل زوم إضافي سلس (Double-Zoom Effect)
                lightboxImg.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                    
                    if (!isZoomed) {
                        lightboxImg.style.transform = 'scale(1.2)';
                        lightboxImg.style.cursor = 'zoom-out';
                        isZoomed = true;
                    } else {
                        lightboxImg.style.transform = 'scale(1)';
                        lightboxImg.style.cursor = 'zoom-in';
                        isZoomed = false;
                    }
                });
                
                // وظيفة إغلاق النافذة بطريقة نظيفة ومعاكسة التلاشي (Fade Out)
                const dismissLightbox = () => {
                    lightbox.classList.remove('opacity-100');
                    document.documentElement.classList.remove('custom-lightbox-active');
                    setTimeout(() => {
                        if (lightbox.parentNode) lightbox.remove();
                    }, 300);
                };
                
                // إغلاق فوري وآمن عند النقر على الخلفية الضبابية (Desktop PC)
                lightbox.addEventListener('click', (event) => {
                    if (event.target !== lightboxImg) {
                        dismissLightbox();
                    }
                });

                // إغلاق فائق الاستجابة متوافق مع شاشات اللمس والهواتف الذكية (Mobile Fix)
                lightbox.addEventListener('touchend', (event) => {
                    if (event.target !== lightboxImg && !event.target.classList.contains('global-zoom-img')) {
                        if (!isZoomed) {
                            dismissLightbox();
                        }
                    }
                });
                
                // إغلاق مباشر عند الضغط على زر الإغلاق المخصص (X)
                closeBtn.addEventListener('click', (event) => {
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                    dismissLightbox();
                });
            });
        });
    };

    initializeLightboxZoom();
});
