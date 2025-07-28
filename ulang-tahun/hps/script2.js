document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk menghasilkan balon
    createBalloons();
    
    // Fungsi untuk modal galeri
    setupGalleryModal();
});

// Fungsi untuk membuat balon
function createBalloons() {
    const balloonsContainer = document.getElementById('balloons');
    const colors = [
        '#FF5252', '#FFEB3B', '#2196F3', '#4CAF50', '#9C27B0', '#FF9800', 
        '#F06292', '#4DD0E1', '#AED581', '#FFD54F', '#7986CB'
    ];
    const balloonCount = 15;
    
    for (let i = 0; i < balloonCount; i++) {
        // Buat elemen balon
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        
        // Warna acak untuk balon
        const colorIndex = Math.floor(Math.random() * colors.length);
        const balloonColor = colors[colorIndex];
        balloon.style.backgroundColor = balloonColor;
        
        // Posisi acak dari balon
        const leftPos = 5 + Math.random() * 90; // Margin 5% dari tepi
        balloon.style.left = leftPos + '%';
        
        // Waktu animasi dan delay yang bervariasi
        const animationDuration = 15 + Math.random() * 25; // 15-40 detik
        const animationDelay = Math.random() * 8;
        balloon.style.animationDuration = animationDuration + 's';
        balloon.style.animationDelay = animationDelay + 's';
        
        // Ukuran balon yang bervariasi
        const size = 50 + Math.random() * 40; // 50-90px
        balloon.style.width = size + 'px';
        balloon.style.height = size * 1.2 + 'px';
        
        // Efek kedalaman dengan z-index acak
        const zIndex = Math.floor(Math.random() * 10) + 1;
        balloon.style.zIndex = zIndex;
        
        // Tambahkan simpul pada balon
        const knot = document.createElement('div');
        knot.className = 'balloon-knot';
        knot.style.backgroundColor = balloonColor;
        balloon.appendChild(knot);
        
        // Tambahkan tali pada balon
        const string = document.createElement('div');
        string.className = 'balloon-string';
        string.style.animationDelay = (Math.random() * 2) + 's';
        balloon.appendChild(string);
        
        balloonsContainer.appendChild(balloon);
    }
}

// Fungsi untuk setup modal galeri
function setupGalleryModal() {
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const closeModal = document.querySelector('.close-modal');
    
    // Event untuk setiap item galeri
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const caption = this.getAttribute('data-caption');
            
            modalImage.src = imgSrc;
            modalImage.alt = caption;
            
            modal.style.display = 'flex';
        });
    });
    
    // Event untuk tombol close
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Event untuk klik di luar modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}