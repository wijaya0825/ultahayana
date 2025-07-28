function startGame(gameType) {
            event.target.closest('.game-card').style.transform = 'scale(0.95)';
            setTimeout(() => {
                event.target.closest('.game-card').style.transform = '';
            }, 150);
            
            switch(gameType) {
                case 'coloring':
                    alert('🎨 Memulai Game Mewarnai! Siapkan kreativitasmu!');
                    break;
                case 'balloon':
                    alert('🎈 Game Balon POP dimulai! Siap-siap pecahkan balon!');
                    break;
                case 'memory':
                    alert('🧩 Memory Game aktif! Latih daya ingatmu!');
                    break;
            }
        }
        
        function createConfetti() {
            const colors = ['#ff6b9d', '#f8b500', '#fff', '#c44569'];
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 3 + 's';
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
        
        setInterval(createConfetti, 300);
        
        document.querySelectorAll('.game-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });