const audio = document.getElementById('bg-music');
const toggleBtn = document.getElementById('music-toggle');
let volumeIcon = document.getElementById('music-volume-icon');
let volumeDownBtn = document.getElementById('music-volume-down');
let volumeUpBtn = document.getElementById('music-volume-up');
const volumeStep = 0.1;
if (!volumeIcon) {
  // Buat ikon volume
  volumeIcon = document.createElement('span');
  volumeIcon.id = 'music-volume-icon';
  volumeIcon.style.fontSize = '18px';
}
if (!volumeDownBtn) {
  volumeDownBtn = document.createElement('button');
  volumeDownBtn.id = 'music-volume-down';
  volumeDownBtn.textContent = '➖';
  volumeDownBtn.style.fontSize = '16px';
  volumeDownBtn.style.marginRight = '4px';
}
if (!volumeUpBtn) {
  volumeUpBtn = document.createElement('button');
  volumeUpBtn.id = 'music-volume-up';
  volumeUpBtn.textContent = '➕';
  volumeUpBtn.style.fontSize = '16px';
  volumeUpBtn.style.marginLeft = '4px';
}
// Sisipkan tombol dan ikon ke DOM
const parent = document.getElementById('music-volume')?.parentNode;
if (parent) {
  parent.insertBefore(volumeDownBtn, document.getElementById('music-volume'));
  parent.insertBefore(volumeIcon, document.getElementById('music-volume'));
  parent.insertBefore(volumeUpBtn, document.getElementById('music-volume').nextSibling);
  document.getElementById('music-volume').style.display = 'none';
}
// Ambil volume terakhir dari localStorage, default 0.5
const lastVolume = localStorage.getItem('bg-music-volume');
audio.volume = lastVolume !== null ? parseFloat(lastVolume) : 0.5;
// Fungsi update ikon volume
function updateVolumeIcon(vol) {
  if (vol == 0) {
    volumeIcon.textContent = '🔇';
  } else if (vol < 0.4) {
    volumeIcon.textContent = '🔈';
  } else if (vol < 0.8) {
    volumeIcon.textContent = '🔉';
  } else {
    volumeIcon.textContent = '🔊';
  }
}
updateVolumeIcon(audio.volume);

// Ambil posisi terakhir dari localStorage
const lastTime = localStorage.getItem('bg-music-time');
if (lastTime) {
  audio.currentTime = parseFloat(lastTime);
}

// Ambil status play/pause terakhir
const lastPaused = localStorage.getItem('bg-music-paused');
if (lastPaused === 'true') {
  audio.pause();
  toggleBtn.textContent = '▶️';
} else {
  audio.play();
  toggleBtn.textContent = '⏸️';
}

// Simpan posisi setiap detik
setInterval(() => {
  if (!audio.paused) {
    localStorage.setItem('bg-music-time', audio.currentTime);
  }
}, 1000);

// Play/pause toggle, selalu satu klik
toggleBtn.addEventListener('click', function() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
});

// Update ikon tombol dan status pause di localStorage
audio.addEventListener('play', function() {
  toggleBtn.textContent = '⏸️';
  localStorage.setItem('bg-music-paused', 'false');
});
audio.addEventListener('pause', function() {
  toggleBtn.textContent = '▶️';
  localStorage.setItem('bg-music-paused', 'true');
});

// Volume control dengan tombol
volumeDownBtn.addEventListener('click', function() {
  let newVol = Math.max(0, Math.round((audio.volume - volumeStep) * 10) / 10);
  audio.volume = newVol;
  localStorage.setItem('bg-music-volume', newVol);
  updateVolumeIcon(newVol);
});
volumeUpBtn.addEventListener('click', function() {
  let newVol = Math.min(1, Math.round((audio.volume + volumeStep) * 10) / 10);
  audio.volume = newVol;
  localStorage.setItem('bg-music-volume', newVol);
  updateVolumeIcon(newVol);
});

// Autoplay policy workaround
document.addEventListener('click', function once() {
  if (localStorage.getItem('bg-music-paused') !== 'true') {
    audio.play();
  }
  document.removeEventListener('click', once);
});