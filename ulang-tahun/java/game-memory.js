class MemoryGame {
            constructor() {
                this.cards = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
                this.gameCards = [];
                this.flippedCards = [];
                this.matches = 0;
                this.moves = 0;
                this.timer = 0;
                this.timerInterval = null;
                this.gameStarted = false;
                this.gameBoard = document.getElementById('gameBoard');
                this.startBtn = document.getElementById('startBtn');
                this.timerElement = document.getElementById('timer');
                this.movesElement = document.getElementById('moves');
                this.matchesElement = document.getElementById('matches');
                this.congratulations = document.getElementById('congratulations');
                this.closeBtn = document.getElementById('closeBtn');

                this.initializeGame();
            }

            initializeGame() {
                this.startBtn.addEventListener('click', () => {
                    if (this.gameStarted) {
                        this.resetGame();
                    } else {
                        this.startGame();
                    }
                });

                this.closeBtn.addEventListener('click', () => {
                    this.congratulations.style.display = 'none';
                });
            }

            startGame() {
                this.gameStarted = true;
                this.startBtn.textContent = '🔄 Mulai Ulang';
                this.gameBoard.classList.remove('hidden');
                this.createCards();
                this.startTimer();
            }

            resetGame() {
                this.stopTimer();
                this.timer = 0;
                this.moves = 0;
                this.matches = 0;
                this.flippedCards = [];
                this.gameCards = [];
                this.updateDisplay();
                this.congratulations.style.display = 'none';
                this.gameBoard.innerHTML = '';
                this.createCards();
                this.startTimer();
            }

            createCards() {
                // Duplikasi kartu untuk membuat pasangan
                this.gameCards = [...this.cards, ...this.cards];
                
                // Acak kartu
                this.shuffleArray(this.gameCards);

                // Buat elemen kartu
                this.gameBoard.innerHTML = '';
                this.gameCards.forEach((symbol, index) => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.dataset.symbol = symbol;
                    card.dataset.index = index;

                    card.innerHTML = `
                        <div class="card-face card-back">❓</div>
                        <div class="card-face card-front">${symbol}</div>
                    `;

                    card.addEventListener('click', () => this.flipCard(card));
                    this.gameBoard.appendChild(card);
                });
            }

            shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }

            flipCard(card) {
                if (card.classList.contains('flipped') || 
                    card.classList.contains('matched') || 
                    this.flippedCards.length >= 2) {
                    return;
                }

                card.classList.add('flipped');
                this.flippedCards.push(card);

                if (this.flippedCards.length === 2) {
                    this.moves++;
                    this.updateDisplay();
                    this.checkMatch();
                }
            }

            checkMatch() {
                const [card1, card2] = this.flippedCards;
                const symbol1 = card1.dataset.symbol;
                const symbol2 = card2.dataset.symbol;

                setTimeout(() => {
                    if (symbol1 === symbol2) {
                        // Pasangan cocok
                        card1.classList.add('matched');
                        card2.classList.add('matched');
                        this.matches++;
                        this.updateDisplay();
                        
                        if (this.matches === this.cards.length) {
                            this.gameComplete();
                        }
                    } else {
                        // Pasangan tidak cocok, balik kembali
                        card1.classList.remove('flipped');
                        card2.classList.remove('flipped');
                    }
                    this.flippedCards = [];
                }, 1000);
            }

            gameComplete() {
                this.stopTimer();
                const minutes = Math.floor(this.timer / 60);
                const seconds = this.timer % 60;
                const timeText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                
                document.getElementById('finalStats').innerHTML = `
                    ⏰ Waktu: ${timeText}<br>
                    🎯 Gerakan: ${this.moves}
                `;
                
                setTimeout(() => {
                    this.congratulations.style.display = 'block';
                }, 500);
            }

            startTimer() {
                this.timerInterval = setInterval(() => {
                    this.timer++;
                    this.updateDisplay();
                }, 1000);
            }

            stopTimer() {
                if (this.timerInterval) {
                    clearInterval(this.timerInterval);
                    this.timerInterval = null;
                }
            }

            updateDisplay() {
                const minutes = Math.floor(this.timer / 60);
                const seconds = this.timer % 60;
                this.timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                this.movesElement.textContent = this.moves;
                this.matchesElement.textContent = `${this.matches}/${this.cards.length}`;
            }
        }

        // Mulai permainan ketika halaman dimuat
        document.addEventListener('DOMContentLoaded', () => {
            new MemoryGame();
        });