const letters = {
  tired: ['Я устала', 'Иди ко мне, кися. Давай я сегодня за нас двоих побуду тем, у кого есть силы говорить.', 'Я бы сейчас подвинулся на диване, чтобы ты могла положить голову мне на плечо. И сидел бы так, даже если бы рука затекла.', 'Можешь закрыть глазки. Отвечать на это письмо совсем не обязательно. Целую тебя в висок.'],
  miss: ['Я соскучилась', 'Я тоже, Катюшка. Знаешь, чего мне особенно хочется? Чтобы можно было сказать «иди сюда» — и ты правда подошла.', 'Представляю, как увижу тебя. Наверняка придумаю по дороге целую речь, а потом просто зароюсь носом тебе в волосы.', 'До того объятия оставлю здесь одно маленькое. Оно твоё, кися. Забирай хоть каждый вечер.'],
  quiet: ['Давай помолчим', 'Давай. Я подвинусь, вот твоё место у окошка.', 'За окном уже горят фонари. Чай потихоньку остывает. Твоя ладошка лежит в моей.', 'Побудем здесь столько, сколько захочешь. Люблю тебя.']
};
const dialog = document.querySelector('dialog');
const lines = document.querySelector('#lines');
const next = document.querySelector('#next');
let current, step;
function addLine(value) {
  const line = document.createElement('p');
  line.className = 'bubble';
  line.textContent = value;
  lines.append(line);
}
document.querySelectorAll('[data-letter]').forEach(button => {
  button.onclick = () => {
    current = letters[button.dataset.letter];
    document.querySelector('#subject').textContent = {tired:'Плечо для тебя',miss:'До нашей встречи',quiet:'Место у окошка'}[button.dataset.letter];
    lines.replaceChildren();
    addLine(current[0]); addLine(current[1]); step = 2;
    next.textContent = 'Читать дальше';
    dialog.showModal();
    dialog.scrollTop = 0;
  };
});
next.onclick = () => {
  if (step === current.length) { dialog.close(); return; }
  addLine(current[step++]);
  if (step === current.length) next.textContent = 'Сложить письмо ♡';
  next.scrollIntoView({block:'nearest'});
};
document.querySelector('.close').onclick = () => dialog.close();

// Нарисованная открытка целиком работает без сети.
const ctx = document.querySelector('canvas').getContext('2d');
ctx.scale(2,2);
function oval(x,y,rx,ry,color) {
  ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,2*Math.PI);ctx.fill();
}
function shape(points,color) {
  ctx.fillStyle=color;ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill();
}
function stroke(points,color,width=1) {
  ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineJoin='round';ctx.lineCap='round';
  ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();
}
ctx.fillStyle='#2e4052';ctx.fillRect(0,0,300,200);
let seed=15;
function random(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}
for(let i=0;i<85;i++) {const x=random()*300,y=random()*154;oval(x,y,random()*.65+.25,.7,'#e1d5b5')}
for(const [x,y] of [[40,47],[211,29],[264,93],[88,18],[51,113]]){shape([[x,y-4],[x+1,y-1],[x+4,y],[x+1,y+1],[x,y+4],[x-1,y+1],[x-4,y],[x-1,y-1]],'#f6d49c')}
oval(242,39,17,17,'#f3d59c');oval(249,32,16,16,'#2e4052');
shape([[0,154],[36,139],[67,148],[116,130],[166,154],[229,133],[300,148],[300,200],[0,200]],'#445969');
shape([[44,148],[224,135],[260,166],[74,183]],'#ccac86');
shape([[44,145],[225,132],[260,162],[74,180]],'#f2dcba');
stroke([[44,145],[153,163],[225,132]],'#b89a7d');stroke([[74,180],[121,158]],'#b89a7d');stroke([[260,162],[184,150]],'#b89a7d');
function cat(x,y,fur,ear,flip){
 ctx.save();ctx.translate(x,y);ctx.scale(flip,1);
 oval(-6,5,32,23,fur);
 shape([[-21,-19],[-19,-48],[-3,-35],[9,-35],[22,-48],[23,-18]],fur);
 shape([[-18,-29],[-17,-41],[-9,-33]],ear);shape([[12,-32],[19,-41],[19,-28]],ear);
 oval(1,-18,24,21,fur);
 stroke([[-14,-20],[-10,-18],[-6,-20]],'#51463e',1.6);stroke([[6,-20],[10,-18],[14,-20]],'#51463e',1.6);
 shape([[-3,-15],[3,-15],[0,-12]],'#a16c62');stroke([[0,-12],[-2,-10],[-5,-10]],'#65514a');stroke([[0,-12],[2,-10],[5,-10]],'#65514a');
 for(const s of [-1,1]){stroke([[s*14,-14],[s*29,-16]],'#67594d');stroke([[s*14,-11],[s*28,-9]],'#67594d')}
 ctx.beginPath();ctx.strokeStyle=ear;ctx.lineWidth=7;ctx.arc(-12,5,20,.28*Math.PI,.99*Math.PI);ctx.stroke();ctx.restore();
}
cat(123,123,'#cb8f69','#b07655',1);cat(171,124,'#ecddbf','#ceaf99',-1);
oval(147,57,3,3,'#e7a497');oval(152,57,3,3,'#e7a497');shape([[144,58],[155,58],[150,64]],'#e7a497');
for(let i=0;i<8500;i++){ctx.fillStyle=random()>.5?'#fff9de12':'#211c1b10';ctx.fillRect(random()*300,random()*200,.75,.7)}

