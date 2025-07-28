const canvas = document.getElementById('birthdayCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let currentColor = '#ff0000';
let isEraser = false;
let scale = 1;

// Gambar template kue ulang tahun (contoh)
const img = new Image();
img.src = 'https://i.imgur.com/ABC123Cake.png'; // Ganti dengan URL template Anda
img.onload = () => ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

// Event coloring
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);

function startDrawing(e) {
  isDrawing = true;
  draw(e);
}

function draw(e) {
  if (!isDrawing) return;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = isEraser ? '#ffffff' : currentColor;

  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX - rect.left) / scale;
  const y = (e.clientY - rect.top) / scale;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}

// Zoom
function zoomIn() {
  scale += 0.1;
  canvas.style.transform = `scale(${scale})`;
}

function zoomOut() {
  if (scale > 0.5) {
    scale -= 0.1;
    canvas.style.transform = `scale(${scale})`;
  }
}

// Tools
document.getElementById('colorPicker').addEventListener('input', (e) => {
  currentColor = e.target.value;
  isEraser = false;
});

function useEraser() {
  isEraser = true;
}

function resetCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function downloadImage() {
  const link = document.createElement('a');
  link.download = `birthday-color-${new Date().toISOString().slice(0, 10)}.png`;
  link.href = canvas.toDataURL();
  link.click();
}

// --- GAMBAR BENTUK OTOMATIS ---
function drawShape(type) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Background pesta (titik-titik & bintang)
  ctx.fillStyle = '#fff5e6';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 50; i++) {
    ctx.fillStyle = ['#ff6b6b', '#ffcc00', '#66d9ff'][i % 3];
    ctx.beginPath();
    ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Gambar bentuk
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#333';
  if (type === 'square') {
    ctx.fillStyle = '#ffffff'; // Area putih untuk diwarnai
    ctx.fillRect(250, 150, 300, 300);
    ctx.strokeRect(250, 150, 300, 300);
  } else if (type === 'circle') {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(400, 300, 150, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  // Tambahkan topi ulang tahun mini di pojok
  const hatImg = new Image();
  hatImg.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI1IDVMNDAgMjBIMTBMMjUgNVoiIGZpbGw9IiNGRjZCNkIiLz4KPHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iMTAiIGhlaWdodD0iMjAiIGZpbGw9IiNGRjZCNkIiLz4KPC9zdmc+';
  hatImg.onload = () => ctx.drawImage(hatImg, 20, 20, 50, 50);
}

// Default bentuk pertama
drawShape('square');