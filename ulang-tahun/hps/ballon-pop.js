document.addEventListener('DOMContentLoaded', function() {
            // Elemen DOM
            const gameContainer = document.getElementById('gameContainer');
            const scoreElement = document.getElementById('score');
            const timerElement = document.getElementById('timer');
            const startBtn = document.getElementById('startBtn');
            const gameOverElement = document.getElementById('gameOver');
            const finalScoreElement = document.getElementById('finalScore');
            const playAgainBtn = document.getElementById('playAgainBtn');
            
            // Variabel permainan
            let score = 0;
            let timeLeft = 60;
            let gameStarted = false;
            let gameTimer;
            let balloonColors = ['#FF6B6B', '#4ECDC4', '#FFD166', '#FF9770', '#70D6FF', '#FF70A6'];
            let balloonInterval;
            
            // Fungsi untuk memulai permainan
            function startGame() {
                // Reset variabel
                score = 0;
                timeLeft = 60;
                gameStarted = true;
                
                // Membersihkan container
                clearBalloons();
                
                // Update UI
                scoreElement.textContent = score;
                timerElement.textContent = timeLeft;
                startBtn.disabled = true;
                
                // Mulai timer
                gameTimer = setInterval(() => {
                    timeLeft--;
                    timerElement.textContent = timeLeft;
                    
                    if (timeLeft <= 0) {
                        endGame();
                    }
                }, 1000);
                
                // Mulai membuat balon
                balloonInterval = setInterval(createBalloon, 1000);
            }
            
            // Fungsi untuk mengakhiri permainan
            function endGame() {
                gameStarted = false;
                clearInterval(gameTimer);
                clearInterval(balloonInterval);
                
                // Update UI
                finalScoreElement.textContent = score;
                gameOverElement.style.display = 'flex';
                startBtn.disabled = false;
            }
            
            // Fungsi untuk membuat balon
            function createBalloon() {
                if (!gameStarted) return;
                
                const balloon = document.createElement('div');
                balloon.classList.add('balloon');
                
                // Posisi horizontal acak
                const leftPosition = Math.random() * (gameContainer.offsetWidth - 60);
                balloon.style.left = leftPosition + 'px';
                
                // Warna acak
                const randomColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
                balloon.style.color = randomColor;
                
                // Kecepatan acak
                const speed = Math.random() * 3 + 3; // 3-6 detik
                
                // Membuat SVG balon
                balloon.innerHTML = `
                    <svg class="balloon-svg" viewBox="0 0 50 100" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25,2 C38,2 45,20 45,35 C45,50 38,65 25,65 C12,65 5,50 5,35 C5,20 12,2 25,2 Z" fill="currentColor"/>
                        <path d="M25,65 L25,85" stroke="gray" stroke-width="2" fill="none"/>
                        <path d="M22,85 L28,85" stroke="gray" stroke-width="2" fill="none"/>
                    </svg>
                `;
                
                // Animasi mengambang ke atas
                balloon.style.animation = `float-up ${speed}s linear forwards`;
                
                // Event Listener untuk mengklik balon
                balloon.addEventListener('click', () => {
                    if (!gameStarted) return;
                    
                    // Animasi pop
                    balloon.classList.add('pop-animation');
                    
                    // Tambah skor
                    score++;
                    scoreElement.textContent = score;
                    
                    // Hapus balon setelah animasi selesai
                    setTimeout(() => {
                        if (balloon.parentNode === gameContainer) {
                            gameContainer.removeChild(balloon);
                        }
                    }, 300);
                });
                
                // Tambahkan balon ke container
                gameContainer.appendChild(balloon);
                
                // Hapus balon setelah animasi selesai
                setTimeout(() => {
                    if (balloon.parentNode === gameContainer) {
                        gameContainer.removeChild(balloon);
                    }
                }, speed * 1000);
            }
            
            // Fungsi untuk membersihkan semua balon
            function clearBalloons() {
                const balloons = document.querySelectorAll('.balloon');
                balloons.forEach(balloon => {
                    if (balloon.parentNode === gameContainer) {
                        gameContainer.removeChild(balloon);
                    }
                });
            }
            
            // Event Listeners
            startBtn.addEventListener('click', startGame);
            
            playAgainBtn.addEventListener('click', () => {
                gameOverElement.style.display = 'none';
                startGame();
            });
        });