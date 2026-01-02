// Register GSAP Plugins
gsap.registerPlugin(TextPlugin);

// --- 1. SETUP CURSOR ---
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { 
        x: e.clientX - 15, 
        y: e.clientY - 15, 
        duration: 0.3, 
        ease: "power2.out" 
    });
});

// --- 2. CINEMATIC ENTRANCE TIMELINE ---
const tl = gsap.timeline();

window.addEventListener('load', () => {
    
    // 1. Float the Glass Card Up
    tl.to('.glass-container', {
        duration: 1.5,
        y: 0,
        opacity: 1,
        ease: "power3.out"
    })
    
    // 2. Reveal Title & Gold Name
    .from('.main-title', {
        duration: 1.2,
        y: 20,
        opacity: 0,
        ease: "back.out(1.7)"
    }, "-=0.5")
    
    // 3. Typewriter Effect for the Poetic Intro
    .to('.poetic-intro', {
        duration: 3,
        text: "To the most beautiful soul in the world...",
        ease: "none"
    })
    
    // 4. Reveal Button
    .from('.enter-btn', {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        ease: "elastic.out(1, 0.5)"
    }, "+=0.5");
});

// --- 3. BUTTON CLICK (Transition to Cause.html) ---
const enterBtn = document.querySelector('.enter-btn');

enterBtn.addEventListener('click', () => {
    
    // Attempt to start music if not already playing
    const music = document.getElementById('bgMusic');
    if(music.paused) {
        music.play();
        localStorage.setItem('musicPlaying', 'true');
    }

    // Explode effect transition
    gsap.to('.glass-container', {
        scale: 1.1,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
    });

    gsap.to('body', {
        opacity: 0,
        duration: 1,
        delay: 0.4,
        onComplete: () => {
            window.location.href = 'cause.html';
        }
    });
});

// --- 4. FLOATING PARTICLES (Sparkles) ---
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'fixed';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.fontSize = Math.random() * 20 + 10 + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.opacity = 0;
    sparkle.style.zIndex = 0;
    document.body.appendChild(sparkle);

    gsap.to(sparkle, {
        y: -100,
        opacity: 1,
        duration: 2,
        onComplete: () => {
            gsap.to(sparkle, { opacity: 0, duration: 1, onComplete: () => sparkle.remove() });
        }
    });
}
setInterval(createSparkle, 800);