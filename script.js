/**
 * Ocean View Villa - Premium Core Engine
 * Handles Security, Asset Protection & Dynamic Enhancements
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Ocean View Villa global script successfully initialized.');

    // 1. نظام حماية الصور المتقدم (Asset Protection Engine)
    const initializeAssetProtection = () => {
        // إنشاء عنصر الإشعار العائم ديناميكياً داخل الصفحة إذا لم يكن موجوداً
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
            
            // إعادة ضبط الوقت لتفادي تداخل النقرات
            clearTimeout(toastTimeout);
            toastTimeout = setTimeout(() => {
                toast.classList.remove('show');
            }, 2500);
        };

        // منع سحب وإفلات الصور تماماً عبر المتصفح
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('dragstart', (e) => {
                e.preventDefault();
                triggerProtectionAlert('Premium Asset: Dragging images is disabled.');
            });
        });

        // منع النقر بزر الفأرة الأيمن (Right-Click) على الصور أو داخل معرض الصور
        document.addEventListener('contextmenu', (e) => {
            if (e.target.tagName === 'IMG' || e.target.closest('#gallery')) {
                e.preventDefault();
                triggerProtectionAlert('Asset Protection Active: Photography is copyrighted.');
            }
        });
    };

    // تشغيل الحماية فوراً
    initializeAssetProtection();

    // 2. تحديث الحماية تلقائياً في حال إضافة صور جديدة ديناميكياً مستقبلاً
    const observer = new MutationObserver(() => {
        document.querySelectorAll('img').forEach(img => {
            if (!img.hasAttribute('data-protected')) {
                img.setAttribute('data-protected', 'true');
                img.addEventListener('dragstart', (e) => e.preventDefault());
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
