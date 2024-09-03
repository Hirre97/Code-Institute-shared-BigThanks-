// Create and style the center welcome circle first
const centerWelcome = document.createElement('video');
centerWelcome.id = 'centerWelcome';
centerWelcome.style.position = 'fixed';
centerWelcome.style.top = '50%';
centerWelcome.style.left = '50%';
centerWelcome.style.transform = 'translate(-50%, -50%)';
centerWelcome.style.width = '500px';
centerWelcome.style.height = '500px';
centerWelcome.src = '/public/ci.mp4';
centerWelcome.style.borderRadius = '50%';
centerWelcome.autoplay = true;
centerWelcome.loop = true;
centerWelcome.muted = true;
centerWelcome.style.objectFit = 'cover';
centerWelcome.style.objectPosition = 'center';
centerWelcome.style.display = 'none';
document.body.appendChild(centerWelcome);

// Create and style the floating circle as a video element
const floatingCircle = document.createElement('video');
floatingCircle.id = 'floatingCircle'; // Correct ID
floatingCircle.style.position = 'fixed';
floatingCircle.style.top = '50%';
floatingCircle.style.left = '50%';
floatingCircle.style.transform = 'translate(-50%, -50%)';
floatingCircle.style.width = '500px';
floatingCircle.style.height = '500px';
floatingCircle.style.marginLeft = '250px'
floatingCircle.style.borderRadius = '50%';
floatingCircle.autoplay = false; // Initially not autoplaying
floatingCircle.loop = false; // Do not loop initially
floatingCircle.muted = true; // Optional: Muting video for autoplay
floatingCircle.src = '/public/initial.mp4'; // Initial video source
floatingCircle.style.objectFit = 'cover';
floatingCircle.style.objectPosition = 'center';

document.body.appendChild(floatingCircle);

// Movement variables for floating circle
let movex = 0;
let movey = 0;
let movespeed = 10;
let directionx = 1;
let directiony = 1;

// Function to shift position
function shift(value, amount, direction) {
    return value + amount * direction;
}

function fly() {
    if (movex > window.innerWidth - 500 || movex < 0) {
        directionx *= -1;
    }
    if (movey > window.innerHeight - 500 || movey < 0) {
        directiony *= -1;
    }

    if (
        movex.toFixed(2) > ((window.innerWidth - 550) / 2).toFixed(2) - 5.00 &&
        movey.toFixed(2) > ((window.innerHeight - 950) / 2).toFixed(1) - 5.00
    ) {
        floatingCircle.style.background = 'linear-gradient(to right, \
            rgb(255, 0, 0),   /* Red */ \
            rgb(255, 165, 0), /* Orange */ \
            rgb(255, 255, 0), /* Yellow */ \
            rgb(0, 128, 0),   /* Green */ \
            rgb(0, 0, 255),   /* Blue */ \
            rgb(75, 0, 130),  /* Indigo */ \
            rgb(238, 130, 238)/* Violet */ \
        )';
        centerWelcome.style.display = 'block';
        floatingCircle.style.opacity = '0.5';
    } else {
        floatingCircle.style.backgroundImage = 'url("/public/di.gif")';
        floatingCircle.style.backgroundSize = 'cover';
        floatingCircle.style.backgroundRepeat = 'no-repeat';
        floatingCircle.style.backgroundPosition = 'center';
        floatingCircle.style.animation = 'hue-rotate 1s infinite linear';
        centerWelcome.style.display = 'none';
        floatingCircle.style.opacity = '1';
    }

    movex = shift(movex, movespeed, directionx);
    movey = shift(movey, movespeed, directiony);

    floatingCircle.style.left = movex + 'px';
    floatingCircle.style.right = movey + 'px'; // Corrected from 'right' to 'top'

    requestAnimationFrame(fly);
}

// Start the animation
fly();

// Keyframes animation for hue-rotate
const style = document.createElement('style');
style.type = 'text/css';
const keyframes = `
@keyframes hue-rotate {
  0% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(90deg);
  }
  100% {
    filter: hue-rotate(180deg);
  }
}`;
style.innerHTML = keyframes;
document.body.appendChild(style);

// Create and animate the rotating cube
function createRotatingCube(size) {
    const cube = document.createElement('div');
    cube.style.width = size;
    cube.style.height = size;
    cube.style.position = 'absolute';
    cube.style.top = '50%';
    cube.style.left = '50%';
    cube.style.transform = 'translate(-50%, -50%)';
    cube.style.perspective = '1000px';

    const cubeInner = document.createElement('div');
    cubeInner.style.width = '100%';
    cubeInner.style.height = '100%';
    cubeInner.style.position = 'absolute';
    cubeInner.style.top = '0';
    cubeInner.style.left = '0';
    cubeInner.style.display = 'none'; // Initially hide the cube
    cubeInner.style.transformStyle = 'preserve-3d';
    cubeInner.style.transform = 'rotateX(0) rotateY(0)';

    const halfSize = parseInt(size) / 2;

    const faces = [
        { rotate: 'rotateY(0deg) translateZ(' + halfSize + 'px)', backgroundImage: 'url("/public/cg.gif")' },
        { rotate: 'rotateY(180deg) translateZ(' + halfSize + 'px)', backgroundImage: 'url("/public/cg.gif")' },
        { rotate: 'rotateY(90deg) translateZ(' + halfSize + 'px)', backgroundImage: 'url("/public/cg.gif")' },
        { rotate: 'rotateY(-90deg) translateZ(' + halfSize + 'px)', backgroundImage: 'url("/public/cg.gif")' },
        { rotate: 'rotateX(90deg) translateZ(' + halfSize + 'px)', backgroundImage: 'url("/public/cg.gif")' },
        { rotate: 'rotateX(-90deg) translateZ(' + halfSize + 'px)', backgroundImage: 'url("/public/cg.gif")' }
    ];

    faces.forEach((face) => {
        const side = document.createElement('div');
        side.style.width = size;
        side.style.height = size;
        side.style.position = 'absolute';
        side.style.backgroundImage = face.backgroundImage;
        side.style.backgroundRepeat = 'no-repeat';
        side.style.backgroundPosition = 'center';
        side.style.backgroundSize = 'cover';
        side.style.transform = `${face.rotate}`;
        side.style.transformOrigin = 'center';
        side.style.backfaceVisibility = 'hidden';
        cubeInner.appendChild(side);
    });

    cube.appendChild(cubeInner);

    let angleX = 0;
    let angleY = 0;
    function animate() {
        angleX += 0.5;
        angleY += 0.5;
        cubeInner.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        requestAnimationFrame(animate);
    }
    animate();

    return cube;
}

// Create and append the cube
const cube = createRotatingCube('150px');
document.body.appendChild(cube);

// Function to toggle video source and cube visibility
let isClicked = false;

const clickSound = document.createElement('audio');
clickSound.src = '/public/ch.wav'; // Make sure the path to your .wav file is correct
clickSound.preload = 'auto'; // Preload the audio for faster playback

document.body.appendChild(clickSound); // Append the audio element to the body

function toggle() {
    const floatingCircle = document.getElementById('floatingCircle');
    const cubeInner = cube.querySelector('div');
    if (floatingCircle && cubeInner) {
        if (isClicked) {
            floatingCircle.src = '/public/di.gif'; // Assuming this is an image URL for video change
            cubeInner.style.display = 'none'; // Hide the cube
        } else {
            floatingCircle.src = '/public/cl.mp4'; // Assuming this is a video URL
            cubeInner.style.display = 'block'; // Show the cube
        }
        floatingCircle.play(); // Optionally play the video
        clickSound.play(); // Play the click sound effect
        isClicked = !isClicked; // Toggle the click state
    }
}



// Attach click event listener to the floating circle
floatingCircle.addEventListener('click', toggle);


