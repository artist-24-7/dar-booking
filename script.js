/**
 * Ocean View Villa - Premium Core Engine
 * Handles Security, Asset Protection, Geo-Routing, Activity Search & High-Fidelity Image Zoom Modals
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

        // Prevent image drag
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('dragstart', (e) => {
                e.preventDefault();
                triggerProtectionAlert('Premium Asset: Dragging images is disabled.');
            });
        });

        // Prevent right click on images and gallery assets
        document.addEventListener('contextmenu', (e) => {
            if (e.target.tagName === 'IMG' || e.target.closest('#gallery') || e.target.closest('#villa-gallery')) {
                e.preventDefault();
                triggerProtectionAlert('Asset Protection Active: Photography is copyrighted.');
            }
        });
    };

    initializeAssetProtection();

    // Watch dynamic contents
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
    // 4. HIGH-FIDELITY IMMERSIVE ZOOM SYSTEM (Fixed & Fully Functional)
    // ==========================================================================
    const initializeLightboxZoom = () => {
        // Selector target elements safely including dynamic sections
        const zoomableImages = document.querySelectorAll('#gallery img, #villa-gallery img, .gallery-item img, [id*="gallery"] img');
        
        zoomableImages.forEach(img => {
            img.style.cursor = 'zoom-in';
            
            img.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const lightbox = document.createElement('div');
                lightbox.className = 'fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 transition-opacity duration-300 opacity-0 skiptranslate';
                
                // Positioned the close button firmly to be fixed at top-right for flawless mobile response
                lightbox.innerHTML = `
                    <button class="close-lightbox-btn fixed top-4 right-4 z-[10000] text-white text-4xl bg-slate-900/80 hover:bg-amber-500 w-12 h-12 rounded-full flex items-center justify-center transition-all border border-slate-700 shadow-2xl cursor-pointer focus:outline-none">&times;</button>
                    <div class="relative max-w-4xl max-h-[85vh] flex items-center justify-center animate-slide-up select-none">
                        <img src="${img.src}" alt="${img.alt || 'Ocean View Villa Asset'}" class="max-w-full max-h-[80vh] rounded-xl shadow-2xl object-contain border border-slate-800 transition-transform duration-300 cursor-zoom-out global-zoom-img no-translate">
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                
                // Smooth Fade-In Animation setup
                setTimeout(() => {
                    lightbox.classList.remove('opacity-0');
                    lightbox.classList.add('opacity-100');
                }, 10);
                
                const lightboxImg = lightbox.querySelector('.global-zoom-img');
                let isZoomed = false;
                
                // Handle image internal zoom safely
                lightboxImg.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation(); // Stop background from closing instantly when clicking the asset image
                    if (!isZoomed) {
                        lightboxImg.style.transform = 'scale(1.25)';
                        isZoomed = true;
                    } else {
                        lightboxImg.style.transform = 'scale(1)';
                        isZoomed = false;
                    }
                });
                
                const dismissLightbox = () => {
                    lightbox.classList.remove('opacity-100');
                    lightbox.classList.add('opacity-0');
                    setTimeout(() => lightbox.remove(), 300);
                };
                
                // Close perfectly whenever clicking anywhere outside the actual asset image layout
                lightbox.addEventListener('click', (event) => {
                    if (event.target !== lightboxImg) {
                        dismissLightbox();
                    }
                });
                
                // Direct close tap execution on button click
                lightbox.querySelector('.close-lightbox-btn').addEventListener('click', (event) => {
                    event.stopPropagation();
                    dismissLightbox();
                });
            });
        });
    };

    initializeLightboxZoom();
});
