document.addEventListener('DOMContentLoaded', () => {
    const billingToggle = document.getElementById('billingToggle');
    const priceElements = document.querySelectorAll('.amount');
    const periodElements = document.querySelectorAll('.period');
    const pricingCards = document.querySelectorAll('.pricing-card');

    // Enhanced pricing toggle with animation
    billingToggle.addEventListener('change', () => {
        const isAnnual = billingToggle.checked;
        
        priceElements.forEach(element => {
            const monthlyPrice = element.getAttribute('data-monthly');
            const annualPrice = element.getAttribute('data-annual');
            
            // Animate price change
            element.style.transform = 'translateY(-20px)';
            element.style.opacity = '0';
            
            setTimeout(() => {
                element.textContent = isAnnual ? annualPrice : monthlyPrice;
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }, 200);
        });

        periodElements.forEach(element => {
            element.textContent = isAnnual ? '/month (billed annually)' : '/month';
        });
    });

    // Add hover effects for pricing cards
    pricingCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Enhanced FAQ interaction
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.querySelector('p');
            const isExpanded = item.classList.contains('expanded');

            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('expanded');
                    otherItem.querySelector('p').style.maxHeight = '0';
                }
            });

            // Toggle current FAQ
            item.classList.toggle('expanded');
            answer.style.maxHeight = isExpanded ? '0' : `${answer.scrollHeight}px`;
        });

        // Hover effect
        item.addEventListener('mouseenter', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.7';
                }
            });
        });

        item.addEventListener('mouseleave', () => {
            faqItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
            });
        });
    });

    // Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Modal functionality
    const compareBtn = document.getElementById('compareBtn');
    const modal = document.getElementById('comparisonModal');
    const closeBtn = modal.querySelector('.close-modal');

    compareBtn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}); 