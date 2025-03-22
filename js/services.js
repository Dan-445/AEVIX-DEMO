document.addEventListener('DOMContentLoaded', () => {
    // Category filtering
    const categoryPills = document.querySelectorAll('.category-pill');
    const serviceCards = document.querySelectorAll('.service-card');

    categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Remove active class from all pills
            categoryPills.forEach(p => p.classList.remove('active'));
            // Add active class to clicked pill
            pill.classList.add('active');

            const category = pill.dataset.category;
            
            serviceCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // Neural network animation
    const createNeuralNetwork = () => {
        const network = document.getElementById('neuralNetwork');
        // Add neural network animation
        // ... (implementation details)
    };

    createNeuralNetwork();
}); 