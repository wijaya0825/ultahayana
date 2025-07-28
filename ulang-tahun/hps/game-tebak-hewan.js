const animals = [
  { name: "gajah", img: "https://upload.wikimedia.org/wikipedia/commons/3/37/African_Bush_Elephant.jpg" },
  { name: "kucing", img: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg" },
  { name: "jerapah", img: "https://upload.wikimedia.org/wikipedia/commons/9/9f/Giraffe_standing.jpg" },
  { name: "singa", img: "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg" },
  { name: "harimau", img: "https://upload.wikimedia.org/wikipedia/commons/5/56/Tiger.50.jpg" },
  { name: "kuda", img: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Horse_in_Shetland.jpg" },
  { name: "sapi", img: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Cow_female_black_white.jpg" },
  { name: "ayam", img: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Gallus_gallus_domesticus_rooster.jpg" },
  { name: "bebek", img: "https://upload.wikimedia.org/wikipedia/commons/4/45/Mallard2.jpg" },
  { name: "kambing", img: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Goat_eating_grass.jpg" },
  { name: "kelinci", img: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Rabbit_in_montana.jpg" },
  { name: "beruang", img: "https://upload.wikimedia.org/wikipedia/commons/e/e7/GrizzlyBearJeanBeaufort.jpg" },
  { name: "panda", img: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Grosser_Panda.JPG" },
  { name: "zebra", img: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Plains_Zebra_Equus_quagga.jpg" },
  { name: "buaya", img: "https://upload.wikimedia.org/wikipedia/commons/7/76/NileCrocodile.jpg" }
];


let currentAnimal = {};
const imgElement = document.getElementById("animalImage");
const feedback = document.getElementById("feedback");

function loadAnimal() {
  const random = animals[Math.floor(Math.random() * animals.length)];
  currentAnimal = random;
  imgElement.src = random.img;
  feedback.textContent = "";
  document.getElementById("answerInput").value = "";
}

function checkAnswer() {
  const userAnswer = document.getElementById("answerInput").value.toLowerCase().trim();
  if (userAnswer === currentAnimal.name) {
    feedback.textContent = "🎉 Benar! Hebat!";
    feedback.style.color = "green";
    setTimeout(loadAnimal, 2000);
  } else {
    feedback.textContent = "❌ Coba lagi!";
    feedback.style.color = "red";
  }
}

window.onload = loadAnimal;
