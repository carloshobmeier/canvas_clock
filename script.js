const canvas = document.getElementById('clockCanvas');
const ctx = canvas.getContext('2d');
let raio = canvas.height / 2;

ctx.translate(raio, raio);
raio *= 0.90;

setInterval(desenharRelogio, 1000);

function desenharRelogio() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    raio = canvas.height / 2 * 0.90;

    ctx.translate(canvas.width / 2, canvas.height / 2);

    desenharFundo(ctx, raio);
    desenharNumeros(ctx, raio);
    desenharHoras(ctx, raio);
}

function desenharFundo(ctx, raio) {
    ctx.beginPath();
    ctx.arc(0, 0, raio, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.strokeStyle = 'black';
    ctx.lineWidth = raio * 0.1 / 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, raio * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
}

function desenharNumeros(ctx, raio) {
    ctx.font = `${raio * 0.30}px HARRINGTON`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (let num = 1; num <= 12; num++) {
        const angulo = num * Math.PI / 6;
        ctx.rotate(angulo);
        ctx.translate(0, -raio * 0.85);
        ctx.rotate(-angulo);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(angulo);
        ctx.translate(0, raio * 0.85);
        ctx.rotate(-angulo);
    }
}

function desenharHoras(ctx, raio) {
    const agora = new Date();
    let hora = agora.getHours();
    let minuto = agora.getMinutes();
    let segundo = agora.getSeconds();

    hora = hora % 12;
    hora = (hora * Math.PI / 6) +
           (minuto * Math.PI / (6 * 60)) +
           (segundo * Math.PI / (360 * 60));
    desenharPonteiro(ctx, hora, raio * 0.5, raio * 0.07, 'black');

    minuto = (minuto * Math.PI / 30);
    desenharPonteiro(ctx, minuto, raio * 0.8, raio * 0.07, 'grey');

    segundo = (segundo * Math.PI / 30);
    desenharPonteiro(ctx, segundo, raio * 0.9, raio * 0.01, 'red');
}

function desenharPonteiro(ctx, posicao, comprimento, largura, cor) {
    ctx.beginPath();
    ctx.strokeStyle = cor;
    ctx.lineWidth = largura;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(posicao);
    ctx.lineTo(0, -comprimento);
    ctx.stroke();
    ctx.rotate(-posicao);
}


window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {

    canvas.height = window.innerHeight * 0.8;
    canvas.width = canvas.height;

    desenharRelogio();
}

resizeCanvas();