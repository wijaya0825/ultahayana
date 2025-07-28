        function showSection(sectionId) {
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(sectionId).classList.add('active');
        }

        document.getElementById('btnHome').addEventListener('click', () => showSection('home'));
        document.getElementById('btnWishes').addEventListener('click', () => showSection('wishes'));
        document.getElementById('btnGallery').addEventListener('click', () => showSection('gallery'));
        document.getElementById('btnColoring').addEventListener('click', () => showSection('coloring'));
        document.getElementById('btnGuessing').addEventListener('click', () => showSection('guessing'));

        document.getElementById('age').textContent = Math.floor(Math.random() * 9) + 5;

        function createBalloons() {
            const balloons = document.getElementById('balloons');
            const colors = ['#ff66b3', '#ff9900', '#66cc00', '#3399ff', '#cc66ff', '#ff6666'];
            
            for (let i = 0; i < 20; i++) {
                const balloon = document.createElement('div');
                balloon.className = 'balloon';
                balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                balloon.style.left = `${Math.random() * 100}%`;
                balloon.style.animationDuration = `${Math.random() * 10 + 10}s`;
                balloon.style.animationDelay = `${Math.random() * 5}s`;
                balloons.appendChild(balloon);
            }
        }
        createBalloons();

        function updateCountdown() {
            const now = new Date();
            const targetDate = new Date(document.getElementById('celebrationDate').textContent);
            
            if (now > targetDate) {
                targetDate.setFullYear(targetDate.getFullYear() + 1);
            }
            
            const timeDiff = targetDate - now;
            
            if (timeDiff <= 0) {
                document.getElementById('countdownTimer').textContent = "Hari Ini!";
                createConfetti();
                return;
            }
            
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
            
            document.getElementById('countdownTimer').textContent = `${days} hari, ${hours} jam, ${minutes} menit, ${seconds} detik`;
        }
        
        setInterval(updateCountdown, 1000);
        updateCountdown();
        
        function createConfetti() {
            const confettiContainer = document.createElement('div');
            confettiContainer.style.position = 'fixed';
            confettiContainer.style.top = '0';
            confettiContainer.style.left = '0';
            confettiContainer.style.width = '100%';
            confettiContainer.style.height = '100%';
            confettiContainer.style.pointerEvents = 'none';
            confettiContainer.style.zIndex = '999';
            document.body.appendChild(confettiContainer);
            
            const colors = ['#ff66b3', '#ff9900', '#66cc00', '#3399ff', '#cc66ff', '#ff6666'];
            
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.className = 'confetti';
                    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.left = `${Math.random() * 100}%`;
                    confetti.style.opacity = '1';
                    confettiContainer.appendChild(confetti);
                    
                    setTimeout(() => {
                        confetti.remove();
                    }, 5000);
                }, i * 100);
            }
        }

        let currentColor = '#ff0000';
        let isDrawing = false;
        const canvas = document.getElementById('coloringCanvas');
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';

        document.querySelectorAll('.color').forEach(colorEl => {
            colorEl.addEventListener('click', () => {
                document.querySelectorAll('.color').forEach(el => el.classList.remove('selected'));
                colorEl.classList.add('selected');
                currentColor = colorEl.getAttribute('data-color');
            });
        });

        document.querySelector('.color').classList.add('selected');

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);
        
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousedown', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        });
        
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const mouseEvent = new MouseEvent('mousemove', {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        });
        
        canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            const mouseEvent = new MouseEvent('mouseup');
            canvas.dispatchEvent(mouseEvent);
        });

        let lastX, lastY;

        function startDrawing(e) {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            lastX = e.clientX - rect.left;
            lastY = e.clientY - rect.top;
        }

        function draw(e) {
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ctx.strokeStyle = currentColor;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();
            
            lastX = x;
            lastY = y;
        }

        function stopDrawing() {
            isDrawing = false;
        }

        let randomNumber = Math.floor(Math.random() * 20) + 1;
        let tries = 0;

        document.getElementById('guessButton').addEventListener('click', checkGuess);
        document.getElementById('guessInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                checkGuess();
            }
        });

        function checkGuess() {
            const guess = parseInt(document.getElementById('guessInput').value);
            const result = document.getElementById('guessResult');
            
            if (isNaN(guess) || guess < 1 || guess > 20) {
                result.textContent = 'Masukkan angka antara 1 sampai 20!';
                result.style.color = '#ff0000';
                return;
            }
            
            tries++;
            document.getElementById('guessTries').textContent = `Jumlah tebakan: ${tries}`;
            
            if (guess === randomNumber) {
                result.textContent = `Benar! 🎉 Angkanya adalah ${randomNumber}`;
                result.style.color = '#33cc33';
                document.getElementById('guessInput').disabled = true;
                document.getElementById('guessButton').disabled = true;
                
                // Konfeti untuk merayakan
                setTimeout(() => {
                    alert('Selamat! Kamu berhasil menebak angkanya!');
                    // Reset game
                    randomNumber = Math.floor(Math.random() * 20) + 1;
                    tries = 0;
                    document.getElementById('guessTries').textContent = `Jumlah tebakan: ${tries}`;
                    document.getElementById('guessInput').disabled = false;
                    document.getElementById('guessButton').disabled = false;
                    document.getElementById('guessInput').value = '';
                    result.textContent = '';
                }, 1000);
            } else if (guess < randomNumber) {
                result.textContent = 'Terlalu rendah! Coba lagi.';
                result.style.color = '#ff9900';
            } else {
                result.textContent = 'Terlalu tinggi! Coba lagi.';
                result.style.color = '#ff9900';
            }
        }

        // Memuat gambar untuk mewarnai
        document.querySelectorAll('.coloring-item').forEach(item => {
            item.addEventListener('click', () => {
                // Dalam kasus nyata, kita akan memuat gambar asli untuk mewarnai
                // Tapi karena ini placeholder, kita hanya bersihkan canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Animasi untuk menunjukkan pemilihan gambar
                item.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 200);
            });
        });
        
        // Fungsi galeri
        const galleryItems = document.querySelectorAll('.gallery-item');
        const modal = document.getElementById('galleryModal');
        const modalImg = document.getElementById('modalImage');
        const closeModal = document.querySelector('.close-modal');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').src;
                const caption = item.getAttribute('data-caption');
                
                modalImg.src = imgSrc;
                modalImg.alt = caption;
                modal.style.display = 'flex';
            });
        });
        
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
        