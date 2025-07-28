/* Konfeti background */
setInterval(()=>{
  const c=document.createElement('div');
  c.className='confetti';
  c.style.left=Math.random()*100+'vw';
  c.style.setProperty('--c',['#ff5252','#7cb342','#ffeb3b','#ab47bc','#26c6da'][Math.floor(Math.random()*5)]);
  document.body.appendChild(c);
  setTimeout(()=>c.remove(),5000);
},700);

/* Lightbox + deskripsi */
const overlay=document.getElementById('overlay');
const largeImg=document.getElementById('largeImg');
const desc=document.getElementById('desc');
document.querySelectorAll('.card').forEach(card=>{
  card.addEventListener('click',()=>{
    largeImg.src=card.querySelector('img').src;
    desc.textContent=card.dataset.desc;
    overlay.classList.add('show');
  });
});
overlay.addEventListener('click',()=>overlay.classList.remove('show'));