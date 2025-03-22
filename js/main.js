document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);

    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .section-title, .animated');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.classList.add('fade-in');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Enhanced navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Add loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate form submission (replace with actual API call)
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } catch (error) {
                alert('There was an error sending your message. Please try again.');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Blog Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-card');
    const searchInput = document.getElementById('searchInput');

    // Category filtering
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter posts
            blogPosts.forEach(post => {
                if (category === 'all' || post.dataset.category === category) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            blogPosts.forEach(post => {
                const title = post.querySelector('h3').textContent.toLowerCase();
                const excerpt = post.querySelector('.excerpt').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    post.style.display = 'block';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    }

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            console.log('Form submitted');
        });
    });

    // Initialize particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80 },
            color: { value: '#dc143c' },
            shape: { type: 'circle' },
            opacity: {
                value: 0.5,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#dc143c',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                out_mode: 'out'
            }
        }
    });

    // Animate statistics numbers
    function animateStats() {
        const stats = document.querySelectorAll('.stat-item');
        
        stats.forEach(stat => {
            const target = parseInt(stat.dataset.value);
            const number = stat.querySelector('.stat-number');
            let current = 0;
            
            const increment = target / 50; // Adjust speed
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                number.textContent = Math.round(current);
            }, 40);
        });
    }

    // Neural network animation
    function createNeuralNetwork() {
        const container = document.querySelector('.nodes');
        const nodeCount = 50;
        
        for (let i = 0; i < nodeCount; i++) {
            const node = document.createElement('div');
            node.className = 'node';
            node.style.left = `${Math.random() * 100}%`;
            node.style.top = `${Math.random() * 100}%`;
            container.appendChild(node);
        }
    }

    // Initialize animations when page loads
    createNeuralNetwork();
    animateStats();
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.solution-card, .process-step').forEach(el => {
        observer.observe(el);
    });

    // Add this to your existing JavaScript
    function initTestimonials() {
        const slider = document.querySelector('.testimonial-slider');
        const cards = document.querySelectorAll('.testimonial-card');
        const indicators = document.querySelectorAll('.indicator');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentIndex = 0;

        function showTestimonial(index) {
            cards.forEach(card => {
                card.classList.remove('active');
                card.style.transform = 'translateX(100px) scale(0.8)';
                card.style.opacity = '0';
            });

            indicators.forEach(ind => ind.classList.remove('active'));

            cards[index].classList.add('active');
            cards[index].style.transform = 'translateX(0) scale(1)';
            cards[index].style.opacity = '1';
            
            indicators[index].classList.add('active');

            // Animate stats
            const stats = cards[index].querySelectorAll('.stat-value');
            stats.forEach(stat => {
                const value = stat.textContent;
                stat.textContent = '0';
                let current = 0;
                const target = parseInt(value);
                const increment = target / 30;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = value;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.round(current) + (value.includes('%') ? '%' : '');
                    }
                }, 50);
            });
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            showTestimonial(currentIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            showTestimonial(currentIndex);
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                showTestimonial(currentIndex);
            });
        });

        // Auto-advance every 5 seconds
        setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            showTestimonial(currentIndex);
        }, 5000);
    }

    // Initialize testimonials when the document loads
    initTestimonials();

    // Add this to your existing JavaScript
    function initProcessVisualization() {
        const canvas = document.getElementById('processCanvas');
        const ctx = canvas.getContext('2d');
        const nodes = [];
        const connections = [];
        
        // Canvas setup
        function resizeCanvas() {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Create nodes
        for (let i = 0; i < 50; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 - 1
            });
        }
        
        // Animation
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update nodes
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;
                
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(220, 20, 60, 0.5)';
                ctx.fill();
            });
            
            // Draw connections
            nodes.forEach((node1, i) => {
                nodes.slice(i + 1).forEach(node2 => {
                    const dx = node2.x - node1.x;
                    const dy = node2.y - node1.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(node1.x, node1.y);
                        ctx.lineTo(node2.x, node2.y);
                        ctx.strokeStyle = `rgba(220, 20, 60, ${1 - distance / 100})`;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }

    // Initialize the process visualization
    initProcessVisualization();
    
    // Process step interaction
    function initProcessSteps() {
        const processNodes = document.querySelectorAll('.process-node');
        const processSteps = document.querySelectorAll('.process-step-content');
        
        // Show first step by default
        processSteps[0].classList.add('active');
        processNodes[0].classList.add('active');
        
        processNodes.forEach(node => {
            node.addEventListener('click', () => {
                const step = parseInt(node.dataset.step);
                
                // Remove active class from all nodes and steps
                processNodes.forEach(n => n.classList.remove('active'));
                processSteps.forEach(s => s.classList.remove('active'));
                
                // Add active class to clicked node and corresponding step
                node.classList.add('active');
                processSteps[step - 1].classList.add('active');
                
                // Update progress bar
                const progressFill = document.querySelector('.progress-fill');
                progressFill.style.width = `${(step / 4) * 100}%`;
                
                // Trigger animation for features
                const features = processSteps[step - 1].querySelectorAll('.step-features li');
                features.forEach((feature, index) => {
                    feature.style.animationDelay = `${index * 0.1}s`;
                    feature.style.animation = 'none';
                    feature.offsetHeight; // Trigger reflow
                    feature.style.animation = null;
                });
            });
        });
    }

    initProcessSteps();

    // Initialize AOS
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });
    
    // Add hover effect for case study cards
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    caseStudyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const achievementValues = card.querySelectorAll('.achievement-value');
            achievementValues.forEach(value => {
                value.style.transform = 'scale(1.1)';
                value.style.color = '#ff1a1a';
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const achievementValues = card.querySelectorAll('.achievement-value');
            achievementValues.forEach(value => {
                value.style.transform = 'scale(1)';
                value.style.color = 'var(--primary-color)';
            });
        });
    });

    // Add this to your existing JavaScript
    function initMagneticIcons() {
        const cards = document.querySelectorAll('.solution-card');
        
        cards.forEach(card => {
            const icon = card.querySelector('.card-icon');
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
                
                if (icon) {
                    const centerX = icon.offsetWidth / 2;
                    const centerY = icon.offsetHeight / 2;
                    const deltaX = (x - centerX) / 8;
                    const deltaY = (y - centerY) / 8;
                    
                    icon.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 50px) rotate(0deg)`;
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (icon) {
                    icon.style.transform = 'translate3d(0, 0, 20px) rotate(-10deg)';
                }
            });
        });
    }

    // Initialize neural particles
    function initNeuralParticles() {
        const cards = document.querySelectorAll('.solution-card');
        
        cards.forEach(card => {
            const particlesContainer = document.createElement('div');
            particlesContainer.className = 'neural-particles';
            
            // Create particles
            for (let i = 0; i < 10; i++) {
                const particle = document.createElement('div');
                particle.className = 'neural-particle';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.animationDelay = `${Math.random() * 2}s`;
                particlesContainer.appendChild(particle);
            }
            
            card.appendChild(particlesContainer);
        });
    }

    // Call these functions when the document loads
    initMagneticIcons();
    initNeuralParticles();
    
    // Add animation delay to tech stack items
    document.querySelectorAll('.tech-stack span').forEach((tag, index) => {
        tag.style.setProperty('--tag-index', index);
    });

    // News Filtering
    function initNewsFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const newsCards = document.querySelectorAll('.news-card');
        const searchInput = document.querySelector('.search-box input');

        // Category filtering
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                newsCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Search functionality
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                
                newsCards.forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const content = card.querySelector('p').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || content.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
    }

    // Job Application Form
    function initJobApplication() {
        const form = document.getElementById('jobApplication');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const submitBtn = form.querySelector('.submit-btn');
            
            try {
                submitBtn.textContent = 'Submitting...';
                submitBtn.disabled = true;
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                alert('Application submitted successfully! We will contact you soon.');
                form.reset();
                
            } catch (error) {
                alert('There was an error submitting your application. Please try again.');
            } finally {
                submitBtn.textContent = 'Submit Application';
                submitBtn.disabled = false;
            }
        });

        // File upload preview
        const fileInputs = form.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const label = input.nextElementSibling.querySelector('span');
                const files = Array.from(e.target.files);
                
                if (files.length > 0) {
                    label.textContent = files.map(f => f.name).join(', ');
                }
            });
        });
    }

    // Initialize when document loads
    initNewsFilters();
    initJobApplication();
}); 