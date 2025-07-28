const fruits = [
  { name: "apel", color: "red", img: "https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg" },
  { name: "pisang", color: "yellow", img: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg" },
  { name: "jeruk", color: "orange", img: "https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg" },
  { name: "anggur", color: "purple", img: "https://upload.wikimedia.org/wikipedia/commons/1/17/Red_grapes.jpg" },
  { name: "kiwi", color: "green", img: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Kiwi_aka.jpg" }
];

const colors = [
  { name: "Merah", value: "red" },
  { name: "Kuning", value: "yellow" },
  { name: "Oranye", value: "orange" },
  { name: "Ungu", value: "purple" },
  { name: "Hijau", value: "green" }
];

let currentFruit;

function startGame() {
  const fruitSection = document.getElementById("fruitSection");
  const colorOptions = document.getElementById("colorOptions");
  const feedback = document.getElementById("feedback");

  // Reset
  fruitSection.innerHTML = "";
  colorOptions.innerHTML = "";
  feedback.textContent = "";

  // Ambil buah acak
  currentFruit = fruits[Math.floor(Math.random() * fruits.length)];

  // Tampilkan gambar buah
  const fruitImg = document.createElement("img");
  fruitImg.src = currentFruit.img;
  fruitImg.alt = currentFruit.name;
  fruitSection.appendChild(fruitImg);

  // Tampilkan tombol warna
  colors.forEach(color => {
    const btn = document.createElement("div");
    btn.className = "color-btn";
    btn.style.backgroundColor = color.value;
    btn.onclick = () => checkAnswer(color.value);
    colorOptions.appendChild(btn);
  });
}

function checkAnswer(selectedColor) {
  const feedback = document.getElementById("feedback");
  if (selectedColor === currentFruit.color) {
    feedback.textContent = "✅ Benar! Warna buahnya sesuai!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "❌ Salah. Coba lagi ya!";
    feedback.style.color = "red";
  }
}

window.onload = startGame;
