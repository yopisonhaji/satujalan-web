document.addEventListener('DOMContentLoaded', () => {
    // Loader
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Animate hamburger
        const bars = mobileToggle.querySelectorAll('.bar');
        // Simple toggle logic can be expanded for animation
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    document.querySelectorAll('.service-card, .feature-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // CSS class handling for animations
    const style = document.createElement('style');
    style.innerHTML = `
        .animate-up {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // --- MODAL & BOOKING LOGIC ---

    const modal = document.getElementById('bookingModal');
    const softwareModal = document.getElementById('softwareModal');

    const closeBtn = document.querySelector('.close-modal');
    const closeSwBtn = document.querySelector('.close-software');

    // Open Hardware Modal
    const hardwareBtn = document.querySelector('.btn-primary');
    if (hardwareBtn) {
        hardwareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('show');
        });
    }

    // Open Software Modal
    const softwareBtn = document.querySelector('.btn-secondary');
    if (softwareBtn) {
        softwareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            softwareModal.classList.add('show');
        });
    }

    // Close Modals
    closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    if (closeSwBtn) closeSwBtn.addEventListener('click', () => softwareModal.classList.remove('show'));

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('show');
        if (e.target === softwareModal) softwareModal.classList.remove('show');
    });

    // Cost Calculation Logic
    const transportMap = {
        'Jakarta': 10000,
        'Depok': 25000,
        'Bogor': 35000,
        'Tangerang': 25000, // Updated to match HTML
        'Bekasi': 30000,
        'Lainnya': 0,
        'GPS': 0 // Dynamic
    };

    // BSD Serpong Coordinates (Base Station)
    const BASE_COORDS = { lat: -6.3090, lng: 106.6713 }; // Example: Around BSD

    function getDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    // Dummy Technician Data
    const techMap = {
        'Jakarta': { name: 'Rudi', rating: '4.9', dist: '5 KM' },
        'Depok': { name: 'Ahmad', rating: '4.8', dist: '8 KM' },
        'Bogor': { name: 'Dedi', rating: '4.7', dist: '12 KM' },
        'Tangerang': { name: 'Budi', rating: '4.9', dist: '7 KM' },
        'Bekasi': { name: 'Siti', rating: '5.0', dist: '6 KM' },
        'GPS': { name: 'System', rating: '5.0', dist: 'Calculating...' }
    };

    const citySelect = document.getElementById('city');
    const serviceSelect = document.getElementById('serviceType');
    const transportDisplay = document.getElementById('transportCost');
    const totalDisplay = document.getElementById('totalCost');
    const gpsGroup = document.getElementById('gps-group');
    const btnLocation = document.getElementById('btn-location');
    const locStatus = document.getElementById('location-status');
    const userLatInput = document.getElementById('user-lat');
    const userLongInput = document.getElementById('user-long');
    const calcDistInput = document.getElementById('calc-distance');

    // Handle City Change (Show/Hide GPS Button)
    citySelect.addEventListener('change', () => {
        if (citySelect.value === 'GPS') {
            gpsGroup.style.display = 'block';
            updateCost(); // Reset
        } else {
            gpsGroup.style.display = 'none';
            updateCost();
        }
    });

    // Handle GPS Button Click
    if (btnLocation) {
        btnLocation.addEventListener('click', () => {
            if ("geolocation" in navigator) {
                locStatus.textContent = "Getting Location...";
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const long = position.coords.longitude;

                        userLatInput.value = lat;
                        userLongInput.value = long;

                        const dist = getDistance(BASE_COORDS.lat, BASE_COORDS.lng, lat, long);
                        calcDistInput.value = dist.toFixed(2);

                        locStatus.innerHTML = `<span style="color: #00f2ff;">Location Found! Distance from Base (BSD): <b>${dist.toFixed(1)} KM</b></span>`;

                        updateCost();
                    },
                    (error) => {
                        console.error("Error GPS:", error);
                        locStatus.textContent = "Failed to get location. Ensure GPS is on.";
                    }
                );
            } else {
                locStatus.textContent = "Browser does not support Geolocation.";
            }
        });
    }

    // Create Tech Info & Error Elements
    let techInfoDiv = document.createElement('div');
    techInfoDiv.className = 'est-row tech-info';
    techInfoDiv.style.marginTop = '10px';
    techInfoDiv.style.fontSize = '0.8rem';
    techInfoDiv.style.display = 'none';

    const estBox = document.querySelector('.estimation-box');
    if (estBox) estBox.appendChild(techInfoDiv);

    function updateCost() {
        const city = citySelect.value;
        const service = serviceSelect.value;

        // Validation: Out of Area (Manual)
        if (city === 'Lainnya') {
            transportDisplay.textContent = '-';
            totalDisplay.textContent = '-';
            techInfoDiv.innerHTML = `<span style="color: #ff4757;"><i class="fas fa-times-circle"></i> Sorry, we do not serve this area yet.</span>`;
            techInfoDiv.style.display = 'block';
            return;
        }

        let transport = transportMap[city] || 0;

        // GPS Dynamic Pricing Logic
        if (city === 'GPS') {
            const distance = parseFloat(calcDistInput.value);
            if (!isNaN(distance)) {
                // Formula: Base 15k + (2.5k per KM)
                transport = 15000 + (distance * 2500);
                // Round to hundreds
                transport = Math.ceil(transport / 100) * 100;
            } else {
                transport = 0; // Waiting for GPS
            }
        }

        let baseService = 150000;
        let serviceText = "Rp 150,000";

        // Logic: Seikhlasnya for "Install Ulang"
        if (service.includes('Install Ulang')) {
            baseService = 0; // Seikhlasnya logic
            serviceText = "Pay As You Wish";

            const serviceCostSpan = document.querySelector('.estimation-box .est-row:first-child span:last-child');
            if (serviceCostSpan) serviceCostSpan.textContent = serviceText;
        } else {
            const serviceCostSpan = document.querySelector('.estimation-box .est-row:first-child span:last-child');
            if (serviceCostSpan) serviceCostSpan.textContent = "Rp 150,000";
        }

        if (city === 'GPS' && transport === 0) {
            transportDisplay.textContent = "Waiting for GPS...";
        } else {
            transportDisplay.textContent = `Rp ${transport.toLocaleString('id-ID')}`;
        }

        if (baseService === 0) {
            totalDisplay.textContent = `Rp ${transport.toLocaleString('id-ID')} + Service Fee (Pay as you wish)`;
        } else {
            totalDisplay.textContent = `Rp ${(baseService + transport).toLocaleString('id-ID')}`;
        }

        // Update Tech Info for Manual Cities
        if (city !== 'GPS' && techMap[city]) {
            const tech = techMap[city];
            techInfoDiv.innerHTML = `<span style="color: #00f2ff;"><i class="fas fa-user-astronaut"></i> Nearest Tech: <b>${tech.name}</b> (${tech.dist}) ⭐${tech.rating}</span>`;
            techInfoDiv.style.display = 'block';
        } else if (city === 'GPS' && parseFloat(calcDistInput.value) > 0) {
            techInfoDiv.innerHTML = `<span style="color: #00f2ff;"><i class="fas fa-satellite"></i> High GPS Accuracy. Real-time Transport Fee.</span>`;
            techInfoDiv.style.display = 'block';
        } else {
            techInfoDiv.style.display = 'none';
        }
    }

    // citySelect.addEventListener('change', updateCost); // Already added logic above for GPS toggle
    serviceSelect.addEventListener('change', updateCost); // Also update when service changes

    // Initial cost calculation on load
    updateCost();

    // Form Submission -> WhatsApp (Hardware)
    const bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const serviceType = document.getElementById('serviceType').value;
        const deviceType = document.getElementById('deviceType').value;
        const city = document.getElementById('city').value;
        let address = document.getElementById('address').value; // let, cause we might append MAP link
        const time = document.getElementById('bookingTime').value;
        const payment = document.querySelector('input[name="paymentMethod"]:checked').value;

        // Grab values for logic
        let transport = transportMap[city] || 0;

        // Dynamic GPS values for submission
        if (city === 'GPS') {
            const dist = parseFloat(calcDistInput.value);
            const lat = userLatInput.value;
            const long = userLongInput.value;

            if (lat && long) {
                // Append Map Link to Address
                address += `\n📍 *Map Location:* https://www.google.com/maps?q=${lat},${long}`;
            }

            if (!isNaN(dist)) {
                transport = 15000 + (dist * 2500);
                transport = Math.ceil(transport / 100) * 100;
            }
        }

        // Use global baseService logic re-calculation or assume default 150k / 0 for Seikhlasnya
        // For simplicity reusing the check:
        let currentBase = 150000;
        if (serviceType.includes('Install Ulang')) currentBase = 0;

        const total = currentBase + transport;

        // Tracking Link (Real Local Link)
        // In production, this would be a real domain. For now, we assume relative path works if they open it on same device,
        // or we just mock it properly.
        const trackingId = `HW-${Math.floor(Math.random() * 1000)}`;
        const trackingLink = `${window.location.origin}/tracking_en.html?id=${trackingId}`; // Direct link to English page

        const waNumber = '6281515333370';
        const message = `Hello SatuJalan, I would like to book a service:
        
📋 *HARDWARE BOOKING FORM*
--------------------------------
🔧 *Service:* ${serviceType}
💻 *Device/Issue:* ${deviceType}
🏙️ *City/Mode:* ${city}
📍 *Address:* ${address}
⏰ *Time:* ${time}
💳 *Payment:* ${payment}
--------------------------------
💰 *Est. Total:* Rp ${total.toLocaleString('id-ID')}
🔗 *Ref Tracking:* ${trackingLink}

Please confirm schedule & technician.`;

        window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
        modal.classList.remove('show');
    });

    // Form Submission -> WhatsApp (Software)
    const softwareForm = document.getElementById('softwareForm');
    if (softwareForm) {
        softwareForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const type = document.getElementById('swServiceType').value;
            const desc = document.getElementById('projectDesc').value;
            const budget = document.getElementById('budget').value;
            const timeline = document.getElementById('timeline').value;
            const onsite = document.querySelector('input[name="onsite"]:checked').value;

            const waNumber = '6281515333370';
            const message = `Hello SatuJalan, I am interested in a software project:
            
💻 *PROJECT REQUEST*
--------------------------------
🌐 *Type:* ${type}
📝 *Description:* ${desc}
💰 *Budget:* ${budget}
⏱️ *Timeline:* ${timeline}
🤝 *Meeting:* ${onsite}

Please provide proposal & offer.`;

            window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
            softwareModal.classList.remove('show');
        });
    }
    // --- ENVATO DOWNLOAD LOGIC ---

    // 1. Sliding Text Animation
    const subtitleText = document.getElementById('subtitle-text');
    const messages = [
        "Reinstall Windows with <span class='highlight'>Pay As You Wish</span>. Supported by comprehensive technical solutions from hardware to software, hassle-free—we come to you.",
        "Prices <span class='highlight'>start from 10k for Envato downloads</span>. Get premium assets at affordable prices!",
        "Web creation <span class='highlight'>starting from 700k</span>, get your personal website to boost your value."
    ];
    let msgIndex = 0;

    if (subtitleText) {
        setInterval(() => {
            // Slide Out
            subtitleText.classList.add('text-slide-out');

            setTimeout(() => {
                // Change Text
                msgIndex = (msgIndex + 1) % messages.length;
                subtitleText.innerHTML = messages[msgIndex];

                // Prepare for Slide In (Move to start position)
                subtitleText.classList.remove('text-slide-out');
                subtitleText.classList.add('text-slide-in');

                // Trigger Reflow to restart animation
                void subtitleText.offsetWidth;

                // Slide In (Move to natural position)
                subtitleText.classList.remove('text-slide-in');
            }, 500); // Wait for slide-out transition
        }, 5000); // Every 5 seconds
    }

    // 2. Download Modal
    const downloadModal = document.getElementById('downloadModal');
    const downloadBtn = document.getElementById('btn-download');
    const closeDownBtn = document.querySelector('.close-download');

    // QRIS Toggle Logic
    const paymentRadios = document.querySelectorAll('input[name="dlPayment"]');
    const qrisSection = document.getElementById('envato-qris');

    if (paymentRadios.length > 0 && qrisSection) {
        paymentRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === 'QRIS') {
                    qrisSection.style.display = 'block';
                } else {
                    qrisSection.style.display = 'none';
                }
            });
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            downloadModal.classList.add('show');
        });
    }

    if (closeDownBtn) {
        closeDownBtn.addEventListener('click', () => {
            downloadModal.classList.remove('show');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === downloadModal) downloadModal.classList.remove('show');
    });

    // 3. Download Form Submission
    const downloadForm = document.getElementById('downloadForm');
    if (downloadForm) {
        downloadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const link = document.getElementById('envatoLink').value;
            const payment = document.querySelector('input[name="dlPayment"]:checked').value;

            const waNumber = '6281515333370';
            const message = `Hello SatuJalan, I want to Request Envato File Download:
            
📥 *REQUEST DOWNLOAD ENVATO*
--------------------------------
🔗 *Link:* ${link}
💳 *Method:* ${payment}
💰 *Price:* Starts from Rp 10.000 / File

Please process, thank you.`;

            window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
            downloadModal.classList.remove('show');
        });
    }

    // --- DYNAMIC LOGO MARQUEE (SEPARATED) ---

    const initMarquee = (containerId, logoList, folderName) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Create objects
        const logos = logoList.map(filename => ({
            src: `${folderName}/${filename}`,
            alt: filename.replace('.png', '')
        }));

        // Helper to create img
        const createLogo = (logo) => {
            const img = document.createElement('img');
            img.src = logo.src;
            img.alt = logo.alt;
            img.className = 'logo-item';
            return img;
        };

        // Populate (Need enough duplicates for smooth infinite scroll)
        // For visual density, we want at least 20-30 items
        const minItems = 20;
        const iterations = Math.ceil(minItems / logos.length);

        for (let i = 0; i < iterations; i++) {
            logos.forEach(logo => {
                container.appendChild(createLogo(logo));
            });
        }
    };

    // 1. Brand Logos (Hardware) -> Scroll Left
    const brandLogos = [
        'logo acer.png', 'logo asus.png', 'logo dell.png',
        'logo hp.png', 'logo iphone.png', 'logo lenovo.png',
        'logo predator.png'
    ];
    initMarquee('brand-marquee', brandLogos, 'logo brend');

    // 2. Code Logos (Software) -> Scroll Right
    const codeLogos = [
        'logo html.png', 'logo js.png', 'logo microsoft .net.png',
        'logo php.png', 'logo python.png', 'logo react js.png',
        'logo vs code.png'
    ];
    initMarquee('code-marquee', codeLogos, 'logo code');

    // --- NO LANGUAGE SWITCHER (Separate File Strategy) ---


    // --- TESTIMONIAL MARQUEE LOGIC ---
    const testimonialTrack = document.getElementById('testimonial-track');
    if (testimonialTrack) {
        const items = testimonialTrack.innerHTML;
        testimonialTrack.innerHTML = items + items; // Duplicate for infinite scroll
    }

    // --- PORTFOLIO LOGIC ---

    // 1. Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to click
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                }
            });
        });
    });

    // 2. Lightbox
    const portfolioModal = document.getElementById('portfolioModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const captionText = document.getElementById('caption');
    const closeLightbox = document.querySelector('.close-lightbox');

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const h4 = item.querySelector('h4');
            const p = item.querySelector('p');

            portfolioModal.style.display = "block";
            lightboxImg.src = img.src;
            captionText.innerHTML = `<strong>${h4.innerText}</strong><br>${p.innerText}`;
        });
    });

    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            portfolioModal.style.display = "none";
        });
    }

    // Close lightbox when clicking outside image
    if (portfolioModal) {
        portfolioModal.addEventListener('click', (e) => {
            if (e.target === portfolioModal) {
                portfolioModal.style.display = "none";
            }
        });
    }


    // --- ADVANCED PRICING TOGGLE ---
    const toggleAdvancedBtn = document.getElementById('toggle-advanced-btn');
    const advancedGrid = document.getElementById('advanced-pricing-grid');

    if (toggleAdvancedBtn && advancedGrid) {
        toggleAdvancedBtn.addEventListener('click', () => {
            // Check current visual state
            const isHidden = window.getComputedStyle(advancedGrid).display === 'none';

            if (isHidden) {
                // Show
                advancedGrid.style.display = 'grid';
                // Trigger reflow for transition
                void advancedGrid.offsetWidth;

                advancedGrid.classList.remove('advanced-hidden');
                advancedGrid.classList.add('advanced-visible');

                // Update Button
                toggleAdvancedBtn.innerHTML = '<i class="fas fa-chevron-up"></i> Show Less';
            } else {
                // Hide
                advancedGrid.classList.remove('advanced-visible');
                // Re-add hidden class for opacity transition
                advancedGrid.classList.add('advanced-hidden');

                // Wait for transition (0.5s) then hide display
                setTimeout(() => {
                    advancedGrid.style.display = 'none';
                }, 500);

                // Update Button
                toggleAdvancedBtn.innerHTML = '<i class="fas fa-chevron-down"></i> View Advanced Packages';
            }
        });
    }

});

// --- CHAT WIDGET LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox');
    const toggleChat = document.getElementById('toggleChat');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');

    if (toggleChat) {
        toggleChat.addEventListener('click', () => {
            chatBox.classList.add('active');
            toggleChat.style.display = 'none'; // Hide button when open
            chatInput.focus();
        });
    }

    if (closeChat) {
        closeChat.addEventListener('click', () => {
            chatBox.classList.remove('active');
            setTimeout(() => {
                toggleChat.style.display = 'flex'; // Show button when closed
            }, 300);
        });
    }

    // Send Message Logic
    async function sendUserMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        // 1. Add User Message
        addMessage(text, 'user-message');
        chatInput.value = '';

        // 2. Show Loading
        const loadingId = addMessage('...', 'bot-message', true);

        try {
            // 3. Call Local API
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });

            const data = await response.json();

            // 4. Update with Bot Reply
            updateMessage(loadingId, data.reply || "Sorry, no response.");

        } catch (error) {
            console.error('Chat Error:', error);
            updateMessage(loadingId, "Failed to connect to AI. Ensure python script is running.");
        }
    }

    function addMessage(text, className, isLoading = false) {
        const div = document.createElement('div');
        div.classList.add('message', className);
        div.textContent = text;
        if (isLoading) div.id = 'msg-' + Date.now();

        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return div.id;
    }

    function updateMessage(id, newText) {
        const msgDiv = document.getElementById(id);
        if (msgDiv) {
            msgDiv.textContent = newText;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    if (sendMessage) {
        sendMessage.addEventListener('click', sendUserMessage);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendUserMessage();
        });
    }
});
