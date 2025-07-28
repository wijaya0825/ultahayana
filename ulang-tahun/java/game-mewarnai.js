document.addEventListener('DOMContentLoaded', function() {
      const canvas = document.getElementById('coloringCanvas');
      const ctx = canvas.getContext('2d');
      const colors = document.querySelectorAll('.color');
      const brushSizes = document.querySelectorAll('.brush-size');
      const eraserBtn = document.getElementById('eraserBtn');
      const coloringItems = document.querySelectorAll('.coloring-item');
      const clearBtn = document.getElementById('clearBtn');
      const currentColorIndicator = document.getElementById('currentColorIndicator');
      const currentSizeIndicator = document.getElementById('currentSizeIndicator');
      const canvasContainer = document.getElementById('canvasContainer');


      // Variabel state
      let currentColor = '#000000';
      let currentSize = 10;
      let isDrawing = false;
      let isErasing = false;
      let lastX = 0;
      let lastY = 0;
      let scale = 1;
      let baseImage = null;
      let coloredLayer = null;
      let currentImage = null;

      // Inisialisasi layer
      function initLayers() {
        baseImage = document.createElement('canvas');
        baseImage.width = canvas.width;
        baseImage.height = canvas.height;
        const baseCtx = baseImage.getContext('2d');

        coloredLayer = document.createElement('canvas');
        coloredLayer.width = canvas.width;
        coloredLayer.height = canvas.height;
        const colorCtx = coloredLayer.getContext('2d');

        // Set gambar default
        const defaultImage = new Image();
        defaultImage.src = 'https://via.placeholder.com/600x400/ffffff/000000?text=Pilih+Gambar';
        defaultImage.onload = function() {
          currentImage = defaultImage;
          panX = 0;
          panY = 0;
          scale = 1;
          drawBaseImage();
          drawLayers();
        };
      }

      // Gambar baseImage tanpa pan
      function drawBaseImage() {
        const baseCtx = baseImage.getContext('2d');
        baseCtx.clearRect(0, 0, canvas.width, canvas.height);
        if (!currentImage) return;
        // Hitung rasio dan posisi tengah
        const hRatio = canvas.width / currentImage.width;
        const vRatio = canvas.height / currentImage.height;
        const ratio = Math.min(hRatio, vRatio) * scale;
        const imgW = currentImage.width * ratio;
        const imgH = currentImage.height * ratio;
        const centerShiftX = (canvas.width - imgW) / 2;
        const centerShiftY = (canvas.height - imgH) / 2;
        baseCtx.drawImage(currentImage, 0, 0, currentImage.width, currentImage.height, centerShiftX, centerShiftY, imgW, imgH);
      }

      // Gambar semua layer ke canvas utama
      function drawLayers() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(baseImage, 0, 0);
        ctx.drawImage(coloredLayer, 0, 0);
      }

      // Fungsi menggambar
      function draw(e) {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left);
        const y = (e.clientY - rect.top);
        const colorCtx = coloredLayer.getContext('2d');
        colorCtx.lineJoin = 'round';
        colorCtx.lineCap = 'round';
        if (isErasing) {
          // Hapus hanya di coloredLayer
          colorCtx.globalCompositeOperation = 'destination-out';
        } else {
          colorCtx.globalCompositeOperation = 'source-over';
          colorCtx.strokeStyle = currentColor;
          colorCtx.fillStyle = currentColor;
        }
        colorCtx.lineWidth = currentSize;
        colorCtx.beginPath();
        colorCtx.moveTo(lastX, lastY);
        colorCtx.lineTo(x, y);
        colorCtx.stroke();
        lastX = x;
        lastY = y;
        drawLayers();
      }

      // Event listeners untuk menggambar saja
      canvas.addEventListener('mousedown', (e) => {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left);
        const y = (e.clientY - rect.top);
        isDrawing = true;
        lastX = x;
        lastY = y;
      });

      canvas.addEventListener('mousemove', (e) => {
        draw(e);
      });

      canvas.addEventListener('mouseup', () => { isDrawing = false; });
      canvas.addEventListener('mouseout', () => { isDrawing = false; });

      // Event untuk sentuhan (touch) agar layar tidak tergeser saat menggambar di HP
      canvas.addEventListener('touchstart', function(e) {
        if (e.touches.length > 0) {
          const rect = canvas.getBoundingClientRect();
          const touch = e.touches[0];
          const x = (touch.clientX - rect.left);
          const y = (touch.clientY - rect.top);
          isDrawing = true;
          lastX = x;
          lastY = y;
        }
        e.preventDefault();
      }, { passive: false });

      canvas.addEventListener('touchmove', function(e) {
        if (!isDrawing) return;
        if (e.touches.length > 0) {
          const rect = canvas.getBoundingClientRect();
          const touch = e.touches[0];
          // Buat event tiruan agar fungsi draw bisa dipakai
          const fakeEvent = {
            clientX: touch.clientX,
            clientY: touch.clientY,
            preventDefault: function() {}
          };
          draw(fakeEvent);
        }
        e.preventDefault();
      }, { passive: false });

      canvas.addEventListener('touchend', function(e) {
        isDrawing = false;
        e.preventDefault();
      }, { passive: false });

      // Pilih warna
      colors.forEach(color => {
        color.addEventListener('click', function() {
          currentColor = this.getAttribute('data-color');
          isErasing = false;
          colors.forEach(c => c.style.borderWidth = '2px');
          this.style.borderWidth = '3px';
          eraserBtn.classList.remove('active');
          currentColorIndicator.style.backgroundColor = currentColor;
        });
      });

      // Pilih ukuran kuas
      brushSizes.forEach(size => {
        size.addEventListener('click', function() {
          currentSize = parseInt(this.getAttribute('data-size'));
          brushSizes.forEach(s => s.style.transform = 'scale(1)');
          this.style.transform = 'scale(1.2)';
          currentSizeIndicator.textContent = currentSize + 'px';
        });
      });

      // Aktifkan penghapus (toggle + ganti teks)
      eraserBtn.addEventListener('click', function() {
        isErasing = !isErasing;
        const span = this.querySelector('span');
        if (isErasing) {
          this.classList.add('active');
          colors.forEach(c => c.style.borderWidth = '2px');
          if (span) span.textContent = 'Mewarnai';
        } else {
          this.classList.remove('active');
          if (span) span.textContent = 'Penghapus';
        }
      });



      // Pilih gambar
      coloringItems.forEach(item => {
        item.addEventListener('click', function() {
          const img = this.querySelector('img');
          const image = new Image();
          image.src = img.src;
          image.onload = function() {
            currentImage = image;
            scale = 1;
            drawBaseImage();
            // Clear warna user
            const colorCtx = coloredLayer.getContext('2d');
            colorCtx.clearRect(0, 0, canvas.width, canvas.height);
            drawLayers();
          };
          coloringItems.forEach(i => i.classList.remove('active'));
          this.classList.add('active');
        });
      });

      // Tombol hapus
      clearBtn.addEventListener('click', function() {
        const colorCtx = coloredLayer.getContext('2d');
        colorCtx.clearRect(0, 0, canvas.width, canvas.height);
        drawLayers();
      });

      // Inisialisasi
      initLayers();
      brushSizes[2].click(); // Pilih ukuran 10px sebagai default
    });