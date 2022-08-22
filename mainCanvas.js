const canvas = document.getElementById("TotMain");
const ctx = canvas.getContext("2d");
canvas.width = (window.innerWidth / 100) * 70;
console.log(canvas.width);
canvas.height = (window.innerWidth / 100) * 25;
let particleArray = [];
let adjustX = 5;
let adjustY = 5;

// handle mouse
const mouse = {
    x: null,
    y: null,
    radius: 100,
};
// canvas.addEventListener("mousemove", (e) => {});
window.addEventListener("mousemove", (e) => {
    mouse.x = e.x - (window.innerWidth / 100) * 27;
    mouse.y = e.y - canvas.getBoundingClientRect().top;
    // console.log("찐 마우스 좌표", e.x, e.y, "로고 표시 좌표", mouse.x, mouse.y);
});
ctx.textAlign = "center";
ctx.fillStyle = "white";
ctx.font = `bold ${(canvas.width / 100) * 3}px Verdana`;
ctx.fillText("Tottenham", 42, 10);
ctx.fillText("Hotspur", 42, 20);

const textCoordinates = ctx.getImageData(0, 0, 200, 100);

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 8 + 1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 10;
            }
        }
    }
}

const init = () => {
    particleArray = [];
    // for (let i = 0; i < 1000; i++) {
    //     let x = Math.random() * canvas.width;
    //     let y = Math.random() * canvas.height;
    //     particleArray.push(new Particle(x, y));
    // }
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
            if (
                textCoordinates.data[
                    y * 4 * textCoordinates.width + x * 4 + 3
                ] > 0
            ) {
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particle(positionX * 5, positionY * 5));
            }
        }
    }
};
init();
console.log(particleArray);

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
    }
    connect();
    requestAnimationFrame(animate);
};

const connect = () => {
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
            let dx = particleArray[a].x - particleArray[b].x;
            let dy = particleArray[a].y - particleArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 10) {
                opacityValue = 1 - distance / 20;
                ctx.strokeStyle = "rgba(255,255,255," + opacityValue + ")";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y);
                ctx.stroke();
            }
        }
    }
};
animate();
