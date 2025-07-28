document.addEventListener('DOMContentLoaded', function() {
            const emojis = ['🎂', '🎁', '🎈', '🎊', '🎯', '🎨', '🍦', '🍭'];
            let cards = [];
            let hasFlippedCard = false;
            let lockBoard = false;
            let firstCard, secondCard;
            let moves = 0;
            let timer = 0;
            let timerInterval;
            let matches = 0;
            
            // Elemen DOM
            const memoryGame = document.getElementById('memoryGame');
            const movesElement = document.getElementById('moves');
            const timerElement = document.getElementById('timer');
            const restartBtn = document.getElementById('restartBtn');
            const winMessage = document.getElementById('winMessage');
            const finalMoves = document.getElementById('finalMoves');
            const finalTime = document.getElementById('finalTime');
            const playAgainBtn = document.getElementById('playAgainBtn');
            
            // Inisialisasi permainan
            function initGame() {
                // Reset variabel
                hasFlippedCard = false;
                lockBoard = false;
                firstCard = null;
                secondCard = null;
                moves = 0;
                timer = 0;
                matches = 0;
                
                // Update tampilan
                movesElement.textContent = moves;
                timerElement.textContent = timer;
                
                // Membersihkan board
                memoryGame.innerHTML = '';
                
                // Menghentikan timer sebelumnya jika ada
                clearInterval(timerInterval);
                
                // Membuat array kartu (pasangan emoji)
                cards = [];
                const gameEmojis = [...emojis, ...emojis];
                
                // Mengacak array emoji
                shuffleArray(gameEmojis);
                
                // Membuat kartu
                gameEmojis.forEach((emoji, index) => {
                    const card = createCard(emoji, index);
                    memoryGame.appendChild(card);
                    cards.push(card);
                });
                
                // Memulai timer
                startTimer();
            }
            
            // Membuat elemen kartu
            function createCard(emoji, index) {
                const card = document.createElement('div');
                card.classList.add('memory-card');
                card.dataset.emoji = emoji;
                
                const frontFace = document.createElement('div');
                frontFace.classList.add('front-face');
                const emojiSpan = document.createElement('span');
                emojiSpan.classList.add('emoji');
                emojiSpan.textContent = emoji;
                frontFace.appendChild(emojiSpan);
                
                const backFace = document.createElement('div');
                backFace.classList.add('back-face');
                backFace.textContent = '?';
                
                card.appendChild(frontFace);
                card.appendChild(backFace);
                
                card.addEventListener('click', flipCard);
                
                return card;
            }
            
            // Fungsi untuk mengacak array
            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            }
            
            // Fungsi untuk membalik kartu
            function flipCard() {
                if (lockBoard) return;
                if (this === firstCard) return;
                
                this.classList.add('flip');
                
                if (!hasFlippedCard) {
                    // First click
                    hasFlippedCard = true;
                    firstCard = this;
                    return;
                }
                
                // Second click
                secondCard = this;
                moves++;
                movesElement.textContent = moves;
                
                checkForMatch();
            }
            
            // Memeriksa apakah dua kartu cocok
            function checkForMatch() {
                let isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
                
                if (isMatch) {
                    disableCards();
                    matches++;
                    
                    // Memeriksa apakah permainan selesai
                    if (matches === emojis.length) {
                        setTimeout(() => {
                            endGame();
                        }, 500);
                    }
                } else {
                    unflipCards();
                }
            }
            
            // Menonaktifkan kartu yang cocok
            function disableCards() {
                firstCard.removeEventListener('click', flipCard);
                secondCard.removeEventListener('click', flipCard);
                
                resetBoard();
            }
            
            // Membalikkan kembali kartu yang tidak cocok
            function unflipCards() {
                lockBoard = true;
                
                setTimeout(() => {
                    firstCard.classList.remove('flip');
                    secondCard.classList.remove('flip');
                    
                    resetBoard();
                }, 1000);
            }
            
            // Reset board untuk giliran berikutnya
            function resetBoard() {
                [hasFlippedCard, lockBoard] = [false, false];
                [firstCard, secondCard] = [null, null];
            }
            
            // Memulai timer
            function startTimer() {
                timerInterval = setInterval(() => {
                    timer++;
                    timerElement.textContent = timer;
                }, 1000);
            }
            
            // Mengakhiri permainan
            function endGame() {
                clearInterval(timerInterval);
                
                finalMoves.textContent = moves;
                finalTime.textContent = timer;
                winMessage.style.display = 'flex';
            }
            
            // Event listeners
            restartBtn.addEventListener('click', initGame);
            playAgainBtn.addEventListener('click', () => {
                winMessage.style.display = 'none';
                initGame();
            });
            
            // Memulai permainan saat halaman dimuat
            initGame();
        });