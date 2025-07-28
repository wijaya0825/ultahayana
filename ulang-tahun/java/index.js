const target = new Date(2025,6,29,0,0,0); // 29 Juli 2025
function updateCount(){
  const now = new Date();
  const diff = target - now;
  if(diff <= 0){document.getElementById('timer').textContent = 'Hari ini!';return;}
  const h = Math.floor(diff/1000/60/60);
  const m = Math.floor(diff/1000/60)%60;
  const s = Math.floor(diff/1000)%60;
  document.getElementById('timer').textContent = `${h}j ${m}m ${s}d`;
}
setInterval(updateCount,1000);
updateCount();

setInterval(()=>{
  const c=document.createElement('div');
  c.className='confetti';
  c.style.left=Math.random()*100+'vw';
  c.style.setProperty('--c',['#ff5252','#7cb342','#ffeb3b','#ab47bc'][Math.floor(Math.random()*4)]);
  document.body.appendChild(c);
  setTimeout(()=>c.remove(),4000);
},600);

const modal=document.getElementById('gameModal');
const canvas=document.getElementById('gameCanvas');
const ctx=canvas.getContext('2d');
let balloons=[],scoreG=0,timeG=30,interval;
class Bal{
  constructor(){
    this.r=20+Math.random()*10;
    this.x=Math.random()*(canvas.width-this.r*2)+this.r;
    this.y=canvas.height+this.r;
    this.speed=1+Math.random()*1.5;
    this.color=['#ff5252','#7cb342','#ffeb3b','#ab47bc'][Math.floor(Math.random()*4)];
  }
  update(){this.y-=this.speed}
  draw(){
    ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    ctx.fillStyle=this.color;ctx.fill();
  }
}
function openGame(){
  modal.style.display='flex';
  scoreG=0;timeG=30;balloons=[];
  document.getElementById('scoreGame').textContent=scoreG;
  document.getElementById('timeGame').textContent=timeG;
  interval=setInterval(()=>{
    timeG--;document.getElementById('timeGame').textContent=timeG;
    if(timeG<=0){clearInterval(interval);clearInterval(loop);modal.style.display='none';}
  },1000);
  const loop=setInterval(()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if(Math.random()<0.05) balloons.push(new Bal());
    for(let i=balloons.length-1;i>=0;i--){
      let b=balloons[i];b.update();b.draw();
      if(b.y<-50) balloons.splice(i,1);
    }
  },1000/60);
}
canvas.addEventListener('click',e=>{
  const rect=canvas.getBoundingClientRect();
  const x=(e.clientX-rect.left)*(canvas.width/rect.width);
  const y=(e.clientY-rect.top)*(canvas.height/rect.height);
  for(let i=balloons.length-1;i>=0;i--){
    const b=balloons[i];
    const dx=x-b.x,dy=y-b.y;
    if(Math.sqrt(dx*dx+dy*dy)<b.r){
      balloons.splice(i,1);
      scoreG++;
      document.getElementById('scoreGame').textContent=scoreG;
    }
  }
});
function closeGame(){modal.style.display='none';clearInterval(interval);}
document.addEventListener('click',()=>document.getElementById('bgSong').play(),{once:true});