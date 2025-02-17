// -------------------back-ground-----------------------------
const canvas = document.querySelector("canvas"),
ctx = canvas.getContext("2d"),
objects = [],
objectsCount = 200,
mouse = {
  x: -100,
  y: -100
},
minDist = 200;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const image = new Image();
image.src = './images/snowflake.png';
let newImage = null; 
let transitionProgress = 0; 
// Effect
for (let i = 0; i < objectsCount; i++) {
    let opacity = Math.random() + 0.4;
    let objectWidth = (Math.floor(Math.random() * 20) + 20) * (opacity + 0.4);
    let objectHeight = image.naturalHeight / image.naturalWidth * objectWidth;
    let speed = Math.random() * 1 + 1;
    objects.push({
        width: objectWidth,
        height: objectHeight,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - objectHeight,
        speed: speed,
        vY: speed,
        vX: 0,
        d: Math.random() * 1.2 - 0.6,
        stepSize: Math.random() / 20,
        step: 0,
        angle: Math.random() * 180 - 90,
        rad: Math.random(),
        opacity: opacity,
        _rotate: Math.random(),
        currentOpacity: 1 
    });
}

// Redraw
function drawobjects() {
    objects.forEach(object => {
        ctx.beginPath();
        object.rad = (object.angle * Math.PI) / 180;
        ctx.save();
        let cx = object.x + object.width / 2;
        let cy = object.y + object.height / 2;
        if(newImage == null){ // fist img
            ctx.globalAlpha = object.currentOpacity * (1 - transitionProgress);
            ctx.setTransform(
                Math.cos(object.rad),
                Math.sin(object.rad),
                -Math.sin(object.rad),
                Math.cos(object.rad),
                cx - cx * Math.cos(object.rad) + cy * Math.sin(object.rad),
                cy - cx * Math.sin(object.rad) - cy * Math.cos(object.rad)
            );
            ctx.drawImage(image, object.x, object.y, object.width, object.height);
        }
        if (newImage) { // reset img
            ctx.globalAlpha = object.currentOpacity * transitionProgress;
            ctx.setTransform(
                Math.cos(object.rad),
                Math.sin(object.rad),
                -Math.sin(object.rad),
                Math.cos(object.rad),
                cx - cx * Math.cos(object.rad) + cy * Math.sin(object.rad),
                cy - cx * Math.sin(object.rad) - cy * Math.cos(object.rad)
            );
            ctx.drawImage(newImage, object.x, object.y, object.width, object.height);
        }
        ctx.restore();
    });
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawobjects();
}
// Update effec
function update() {
    objects.forEach(object => {
        let dist = Math.sqrt((object.x - mouse.x) ** 2 + (object.y - mouse.y) ** 2);
        if (dist < minDist) {
            let force = minDist / (dist * dist),
                xcomp = (mouse.x - object.x) / dist,
                ycomp = (mouse.y - object.y) / dist,
                deltaV = force * 2;
            object.vX -= deltaV * xcomp;
            object.vY -= deltaV * ycomp;
            if (object.d * xcomp > 0) object.d = -object.d;
            else object.vX *= 0.98;
            if (object.vY < object.speed) object.vY = object.speed;
            object.vX += Math.cos(object.step += (Math.random() * 0.05)) * object.stepSize;
        }
        object.y += object.vY;
        object.x += object.vX + object.d;
        let _angle = Math.random() + 0.2;
        if (object._rotate === 0) object.angle += _angle;
        else object.angle -= _angle;
        if (object.y > canvas.height || object.x > canvas.width || object.x < -object.width) reset(object);
    });

    if (newImage && transitionProgress < 1) transitionProgress += 0.01; 
}
function reset(object) {
    object.opacity = Math.random() + 0.4;
    object.width = (Math.floor(Math.random() * 20) + 20) * (object.opacity + 0.4);
    object.height = image.naturalHeight / image.naturalWidth * object.width;
    object.x = Math.random() * canvas.width;
    object.y = 0 - object.height;
    object.speed = Math.random() * 1 + 0.5;
    object.vY = object.speed;
    object.vX = 0;
    object._rotate = Math.random();
}
// Click
canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
function tick() {
    draw();
    update();
    requestAnimationFrame(tick);
}
tick();
//Resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ------------------- Modal -----------------------------
const btnClose = document.querySelector('.close');
const readEmail = document.querySelector('.js-email');
const modal = document.querySelector('.js-modal');
const modalContainer = document.querySelector('.js-modal-container');
function show() { 
    setTimeout(() => {
        modal.classList.add('open'); 
    },1500);
}
function hide() { modal.classList.remove('open'); }
readEmail.addEventListener('click', function() {
    show();
    newImage = new Image();
    newImage.src = './images/heart.png';
    transitionProgress = 0; 
});
modal.addEventListener('click', hide);
modalContainer.addEventListener('click', function (event) { event.stopPropagation(); })
// --------------------Card------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    document.getElementsByClassName('open')[0].addEventListener('click', function () {
        document.getElementsByClassName('card-center-content')[0].classList.add('is-open')
    })
    document.getElementsByClassName('open')[0].addEventListener('click', function () {
        document.getElementsByClassName('card-packaging')[0].classList.add('is-open')
    })
    document.getElementsByClassName('close')[0].addEventListener('click', function () {
        document.getElementsByClassName('card-packaging')[0].classList.remove('is-open')
    })
});
// ---------------------Audio------------------------------------
const audio = document.getElementById("AudioMain");
function playNewMusic() {
    audio.pause(); 
    audio.load(); 
    audio.play();
}
document.querySelector('.js-email').addEventListener("click", function() {
    setTimeout(() => {
        playNewMusic();  
    }, 1000);
});

const anya = document.querySelector(".anya");
// initialize audio object:
const audio1 = document.getElementById("AudioAnya");
// play sound on hover (mouseover)
anya.addEventListener("mouseover", function () {
	setTimeout(() => {
        audio1.pause(); 
        audio1.load(); 
        audio1.play();  
    }, 1000);
});
// pause sound on mouseleave
anya.addEventListener("mouseleave", function () {
	// console.log(audio.duration);
	audio1.pause();
	audio1.currentTime = 0;
});

function OpenL() {
   
    window.open('https://i.pinimg.com/736x/eb/8c/32/eb8c32f9490ca9c95d8a210e51d94025.jpg');
  }
