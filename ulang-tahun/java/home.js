// Create floating particles
        function createParticles() {
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 4 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
                document.body.appendChild(particle);
                
                // Remove particle after animation
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 6000);
            }
        }

        // Create confetti
        function createConfetti() {
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.animationDelay = Math.random() * 3 + 's';
                confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
                document.body.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 5000);
            }
        }

        // Enter party function
        function enterParty() {
            // Add click animation
            const button = document.querySelector('.enter-button');
            button.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                button.style.transform = 'scale(1)';
                // Create celebration effect
                createConfetti();
                
                // Redirect to main page after short delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }, 150);
        }

        // Initialize effects
        document.addEventListener('DOMContentLoaded', function() {
            // Create initial particles
            createParticles();
            
            // Create particles periodically
            setInterval(createParticles, 3000);
            
            // Create initial confetti
            setTimeout(createConfetti, 1000);
            
            // Create confetti periodically
            setInterval(createConfetti, 8000);
        });

        // Add keyboard support
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                enterParty();
            }
        });

        // Add touch support for mobile
        let touchStartY = 0;
        document.addEventListener('touchstart', function(event) {
            touchStartY = event.touches[0].clientY;
        });

        document.addEventListener('touchend', function(event) {
            const touchEndY = event.changedTouches[0].clientY;
            const touchDiff = touchStartY - touchEndY;
            
            // Swipe up gesture to enter
            if (touchDiff > 50) {
                enterParty();
            }
        });
        // Pastikan halaman selalu di-scroll ke atas saat dimuat
        window.onload = function() {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        };
