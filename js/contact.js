document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm.querySelectorAll('input, select, textarea');

    // Form validation patterns
    const patterns = {
        name: /^[a-zA-Z\s]{2,50}$/,
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        phone: /^[\d\s()-]{10,15}$/,
        company: /^[a-zA-Z0-9\s&-]{2,50}$/
    };

    // Error messages
    const errorMessages = {
        name: 'Please enter a valid name (2-50 characters)',
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid phone number',
        company: 'Please enter a valid company name',
        subject: 'Please select a topic',
        message: 'Please enter your message (minimum 10 characters)'
    };

    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('input', (e) => validateField(e.target));
        input.addEventListener('blur', (e) => validateField(e.target));
    });

    function validateField(field) {
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        
        // Remove existing error message
        removeError(field);

        // Validate required fields
        if (field.hasAttribute('required') && !fieldValue) {
            showError(field, `${field.previousElementSibling.textContent} is required`);
            return false;
        }

        // Validate patterns for specific fields
        if (patterns[fieldName] && fieldValue) {
            if (!patterns[fieldName].test(fieldValue)) {
                showError(field, errorMessages[fieldName]);
                return false;
            }
        }

        // Additional validation for message length
        if (fieldName === 'message' && fieldValue.length < 10) {
            showError(field, errorMessages.message);
            return false;
        }

        return true;
    }

    function showError(field, message) {
        // Remove any existing error
        removeError(field);

        // Create and add error message
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        field.parentNode.appendChild(error);

        // Add error class to form group
        field.parentNode.classList.add('has-error');
    }

    function removeError(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
            field.parentNode.classList.remove('has-error');
        }
    }

    // Form submission handling
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields before submission
        let isValid = true;
        formInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showNotification('Please check the form for errors', 'error');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <div class="loading-spinner"></div>
            <span>Sending...</span>
        `;
        submitBtn.disabled = true;

        try {
            // Collect form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Simulate API call (replace with actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success handling
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();

        } catch (error) {
            // Error handling
            showNotification('Failed to send message. Please try again later.', 'error');
            console.error('Form submission error:', error);

        } finally {
            // Reset button state
            submitBtn.innerHTML = `
                <span>Send Message</span>
                <i class="fas fa-paper-plane"></i>
            `;
            submitBtn.disabled = false;
        }
    });

    // Notification system
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}); 