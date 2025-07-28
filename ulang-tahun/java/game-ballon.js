let score = 0;
        let currentLevel = 1;
        let targetScore = 50;
        let currentTarget = 0;
        let timeLeft = 45;
        let gameActive = false;
        let gameTimer;
        let balloonSpawnTimer;
        let birdSpawnTimer;
        let balloons = [];
        let birds = [];
        let balloonId = 0;
        let birdId = 0;
        let combo = 0;
        let lastHitTime = 0;

        const balloonTypes = ['normal', 'fast', 'bonus', 'mini', 'giant', 'explosive'];
        const gameContainer = document.getElementById('gameContainer');
        const scoreElement = document.getElementById('score');
        const levelElement = document.getElementById('currentLevel');
        const targetElement = document.getElementById('currentTarget');
        const targetScoreElement = document.getElementById('targetScore');
        const timeElement = document.getElementById('time');
        const progressFill = document.getElementById('progressFill');
        const startScreen = document.getElementById('startScreen');
        const levelCompleteScreen = document.getElementById('levelComplete');
        const gameOverScreen = document.getElementById('gameOver');
        const gameCompleteScreen = document.getElementById('gameComplete');
        const comboIndicator = document.getElementById('comboIndicator');
        const crosshair = document.getElementById('crosshair');

        // Level configurations - shorter time for challenge
        const levelConfig = {
            1: { target: 50, time: 45, types: ['normal'], spawnRate: 1200, birdChance: 0.1 },
            2: { target: 80, time: 45, types: ['normal'], spawnRate: 1100, birdChance: 0.1 },
            3: { target: 120, time: 40, types: ['normal'], spawnRate: 1000, birdChance: 0.15 },
            4: { target: 150, time: 40, types: ['normal'], spawnRate: 950, birdChance: 0.15 },
            5: { target: 180, time: 40, types: ['normal', 'fast'], spawnRate: 900, birdChance: 0.2 },
            6: { target: 220, time: 35, types: ['normal', 'fast'], spawnRate: 850, birdChance: 0.2 },
            7: { target: 260, time: 35, types: ['normal', 'fast'], spawnRate: 800, birdChance: 0.25 },
            8: { target: 300, time: 35, types: ['normal', 'fast'], spawnRate: 750, birdChance: 0.25 },
            9: { target: 350, time: 30, types: ['normal', 'fast', 'bonus'], spawnRate: 700, birdChance: 0.3 },
            10: { target: 400, time: 30, types: ['normal', 'fast', 'bonus', 'mini'], spawnRate: 650, birdChance: 0.3 },
            11: { target: 450, time: 30, types: ['normal', 'fast', 'bonus', 'mini'], spawnRate: 600, birdChance: 0.35 },
            12: { target: 500, time: 25, types: ['normal', 'fast', 'bonus', 'mini'], spawnRate: 550, birdChance: 0.35 },
            13: { target: 600, time: 25, types: ['normal', 'fast', 'bonus', 'mini', 'giant'], spawnRate: 500, birdChance: 0.4 },
            14: { target: 700, time: 25, types: ['normal', 'fast', 'bonus', 'mini', 'giant'], spawnRate: 480, birdChance: 0.4 },
            15: { target: 800, time: 20, types: ['normal', 'fast', 'bonus', 'mini', 'giant'], spawnRate: 460, birdChance: 0.45 },
            16: { target: 900, time: 20, types: ['normal', 'fast', 'bonus', 'mini', 'giant'], spawnRate: 440, birdChance: 0.45 },
            17: { target: 1000, time: 20, types: ['normal', 'fast', 'bonus', 'mini', 'giant', 'explosive'], spawnRate: 420, birdChance: 0.5 },
            18: { target: 1200, time: 15, types: ['normal', 'fast', 'bonus', 'mini', 'giant', 'explosive'], spawnRate: 400, birdChance: 0.5 },
            19: { target: 1400, time: 15, types: ['normal', 'fast', 'bonus', 'mini', 'giant', 'explosive'], spawnRate: 380, birdChance: 0.55 },
            20: { target: 1600, time: 15, types: ['normal', 'fast', 'bonus', 'mini', 'giant', 'explosive'], spawnRate: 350, birdChance: 0.6 }
        };

        // Mouse movement for crosshair (desktop only)
        gameContainer.addEventListener('mousemove', (e) => {
            if (gameActive && window.innerWidth > 768) {
                crosshair.style.display = 'block';
                crosshair.style.left = (e.clientX - 15) + 'px';
                crosshair.style.top = (e.clientY - 15) + 'px';
            }
        });

        gameContainer.addEventListener('touchstart', () => {
            crosshair.style.display = 'none';
        });

        function startGame() {
            startScreen.style.display = 'none';
            score = 0;
            currentLevel = 1;
            initializeLevel();
        }

        function initializeLevel() {
            gameActive = true;
            currentTarget = 0;
            combo = 0;
            
            const config = levelConfig[currentLevel];
            targetScore = config.target;
            timeLeft = config.time;
            
            updateUI();
            
            // Start game timer
            gameTimer = setInterval(() => {
                timeLeft--;
                updateTime();
                if (timeLeft <= 0) {
                    if (currentTarget >= targetScore) {
                        completeLevel();
                    } else {
                        endGame();
                    }
                }
            }, 1000);
            
            // Start spawning balloons
            spawnBalloon();
            balloonSpawnTimer = setInterval(() => spawnBalloon(), config.spawnRate);
            
            // Start spawning birds
            birdSpawnTimer = setInterval(() => {
                if (Math.random() < config.birdChance) {
                    spawnBird();
                }
            }, 3000);
        }

        function completeLevel() {
            gameActive = false;
            clearInterval(gameTimer);
            clearInterval(balloonSpawnTimer);
            clearInterval(birdSpawnTimer);
            
            // Calculate time bonus
            const timeBonus = timeLeft * 10;
            score += timeBonus;
            
            // Remove all balloons and birds
            balloons.forEach(balloon => {
                if (balloon.element.parentNode) {
                    balloon.element.remove();
                }
            });
            birds.forEach(bird => {
                if (bird.element.parentNode) {
                    bird.element.remove();
                }
            });
            balloons = [];
            birds = [];
            
            crosshair.style.display = 'none';
            
            // Check if game is complete (level 20)
            if (currentLevel >= 20) {
                document.getElementById('finalTotalScore').textContent = score;
                gameCompleteScreen.style.display = 'block';
            } else {
                // Show level complete screen
                document.getElementById('levelScore').textContent = currentTarget;
                document.getElementById('completedTarget').textContent = targetScore;
                document.getElementById('timeBonus').textContent = timeBonus;
                levelCompleteScreen.style.display = 'block';
            }
        }

        function nextLevel() {
            currentLevel++;
            levelCompleteScreen.style.display = 'none';
            initializeLevel();
        }

        function endGame() {
            gameActive = false;
            clearInterval(gameTimer);
            clearInterval(balloonSpawnTimer);
            clearInterval(birdSpawnTimer);
            
            balloons.forEach(balloon => {
                if (balloon.element.parentNode) {
                    balloon.element.remove();
                }
            });
            birds.forEach(bird => {
                if (bird.element.parentNode) {
                    bird.element.remove();
                }
            });
            balloons = [];
            birds = [];
            
            crosshair.style.display = 'none';
            
            document.getElementById('finalScore').textContent = score;
            document.getElementById('highestLevel').textContent = currentLevel;
            document.getElementById('missedTarget').textContent = Math.max(0, targetScore - currentTarget);
            gameOverScreen.style.display = 'block';
        }

        function restartGame() {
            gameOverScreen.style.display = 'none';
            levelCompleteScreen.style.display = 'none';
            gameCompleteScreen.style.display = 'none';
            score = 0;
            currentLevel = 1;
            initializeLevel();
        }

        function spawnBalloon() {
            if (!gameActive) return;
            
            const config = levelConfig[currentLevel];
            const balloon = document.createElement('div');
            const balloonType = config.types[Math.floor(Math.random() * config.types.length)];
            balloon.className = 'balloon ' + balloonType;
            balloon.id = 'balloon-' + balloonId++;
            
            // Add moving behavior for higher levels
            if (currentLevel >= 17 && Math.random() < 0.3) {
                balloon.classList.add('moving');
            }
            
            // Random position
            const maxX = window.innerWidth - (balloonType === 'giant' ? 90 : 60);
            const maxY = window.innerHeight - (balloonType === 'giant' ? 120 : 100);
            balloon.style.left = Math.random() * maxX + 'px';
            balloon.style.top = Math.random() * maxY + 'px';
            
            balloon.addEventListener('click', () => popBalloon(balloon, balloonType));
            balloon.addEventListener('touchstart', (e) => {
                e.preventDefault();
                popBalloon(balloon, balloonType);
            });
            
            gameContainer.appendChild(balloon);
            
            const balloonObj = {
                element: balloon,
                type: balloonType,
                lifetime: 0
            };
            balloons.push(balloonObj);
            
            // Balloon lifetime varies by type
            const lifetime = balloonType === 'fast' ? 2500 : 
                           balloonType === 'mini' ? 3500 : 5000;
            
            setTimeout(() => {
                if (balloon.parentNode && gameActive) {
                    balloon.remove();
                    const index = balloons.findIndex(b => b.element === balloon);
                    if (index > -1) {
                        balloons.splice(index, 1);
                    }
                }
            }, lifetime);
        }

        function spawnBird() {
            if (!gameActive) return;
            
            const bird = document.createElement('div');
            bird.className = 'bird';
            bird.id = 'bird-' + birdId++;
            
            // Random height
            const maxY = window.innerHeight - 100;
            bird.style.top = Math.random() * maxY + 'px';
            bird.style.left = '-100px';
            
            bird.addEventListener('click', () => hitBird(bird));
            bird.addEventListener('touchstart', (e) => {
                e.preventDefault();
                hitBird(bird);
            });
            
            gameContainer.appendChild(bird);
            
            const birdObj = {
                element: bird
            };
            birds.push(birdObj);
            
            // Remove bird after animation
            setTimeout(() => {
                if (bird.parentNode) {
                    bird.remove();
                    const index = birds.findIndex(b => b.element === bird);
                    if (index > -1) {
                        birds.splice(index, 1);
                    }
                }
            }, 6000);
        }

        function hitBird(bird) {
            if (!gameActive) return;
            
            bird.style.animation = 'pop 0.3s ease-out forwards';
            
            // Reduce score
            const penalty = 25;
            score = Math.max(0, score - penalty);
            currentTarget = Math.max(0, currentTarget - penalty);
            
            // Reset combo
            combo = 0;
            
            updateUI();
            
            setTimeout(() => {
                if (bird.parentNode) {
                    bird.remove();
                }
                const index = birds.findIndex(b => b.element === bird);
                if (index > -1) {
                    birds.splice(index, 1);
                }
            }, 300);
            
            createPopEffect(bird, -penalty, '#FF0000');
        }

        function popBalloon(balloon, type) {
            if (!gameActive) return;
            
            balloon.classList.add('popping');
            
            // Calculate points based on balloon type
            let points = 0;
            switch(type) {
                case 'normal': points = 10; break;
                case 'fast': points = 15; break;
                case 'bonus': points = 25; break;
                case 'mini': points = 20; break;
                case 'giant': points = 50; break;
                case 'explosive': points = 35; break;
            }
            
            // Check for combo
            const currentTime = Date.now();
            if (currentTime - lastHitTime < 2000) {
                combo++;
                if (combo >= 3) {
                    points *= Math.floor(combo / 3) + 1;
                    showCombo(combo);
                }
            } else {
                combo = 1;
            }
            lastHitTime = currentTime;
            
            // Special effects for explosive balloons
            if (type === 'explosive') {
                explodeNearbyBalloons(balloon);
            }
            
            score += points;
            currentTarget += points;
            updateUI();
            
            // Check level completion
            if (currentTarget >= targetScore) {
                setTimeout(() => completeLevel(), 500);
            }
            
            setTimeout(() => {
                if (balloon.parentNode) {
                    balloon.remove();
                }
                const index = balloons.findIndex(b => b.element === balloon);
                if (index > -1) {
                    balloons.splice(index, 1);
                }
            }, 300);
            
            createPopEffect(balloon, points, '#FFD700');
        }

        function explodeNearbyBalloons(explosiveBalloon) {
            const explosiveRect = explosiveBalloon.getBoundingClientRect();
            const explosionRadius = 100;
            
            balloons.forEach(balloonObj => {
                if (balloonObj.element === explosiveBalloon) return;
                
                const rect = balloonObj.element.getBoundingClientRect();
                const distance = Math.sqrt(
                    Math.pow(rect.left - explosiveRect.left, 2) + 
                    Math.pow(rect.top - explosiveRect.top, 2)
                );
                
                if (distance <= explosionRadius) {
                    setTimeout(() => {
                        if (balloonObj.element.parentNode) {
                            popBalloon(balloonObj.element, balloonObj.type);
                        }
                    }, 100);
                }
            });
        }

        function showCombo(comboCount) {
            document.getElementById('comboCount').textContent = Math.floor(comboCount / 3);
            comboIndicator.style.display = 'block';
            setTimeout(() => {
                comboIndicator.style.display = 'none';
            }, 1500);
        }

        function createPopEffect(element, points, color = '#FFD700') {
            const rect = element.getBoundingClientRect();
            const effect = document.createElement('div');
            effect.textContent = points > 0 ? '+' + points : points;
            effect.style.position = 'absolute';
            effect.style.left = (rect.left + rect.width/2) + 'px';
            effect.style.top = (rect.top + rect.height/2) + 'px';
            effect.style.color = color;
            effect.style.fontWeight = 'bold';
            effect.style.fontSize = '20px';
            effect.style.pointerEvents = 'none';
            effect.style.zIndex = '300';
            effect.style.animation = 'pop 1s ease-out forwards';
            effect.style.textShadow = '2px 2px 4px rgba(0,0,0,0.5)';
            
            document.body.appendChild(effect);
            
            setTimeout(() => {
                effect.remove();
            }, 1000);
        }

        function updateUI() {
            scoreElement.textContent = score;
            levelElement.textContent = currentLevel;
            targetElement.textContent = currentTarget;
            targetScoreElement.textContent = targetScore;
            
            // Update progress bar
            const progress = Math.min((currentTarget / targetScore) * 100, 100);
            progressFill.style.width = progress + '%';
        }

        function updateTime() {
            timeElement.textContent = timeLeft;
            if (timeLeft <= 10) {
                timeElement.style.color = '#E74C3C';
            } else {
                timeElement.style.color = '#333';
            }
        }

        // Prevent context menu on mobile
        gameContainer.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        // Initialize clouds
        document.addEventListener('DOMContentLoaded', () => {
            for (let i = 0; i < 3; i++) {
                const cloud = document.createElement('div');
                cloud.className = 'cloud';
                cloud.style.width = (60 + Math.random() * 40) + 'px';
                cloud.style.height = (20 + Math.random() * 20) + 'px';
                cloud.style.top = (Math.random() * 80) + '%';
                cloud.style.animationDuration = (20 + Math.random() * 15) + 's';
                cloud.style.animationDelay = -(Math.random() * 20) + 's';
                gameContainer.appendChild(cloud);
            }
        });