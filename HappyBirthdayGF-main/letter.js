// Register GSAP plugins
gsap.registerPlugin(TextPlugin);

const lockScreen = document.querySelector('.lock-screen');
const letterContent = document.querySelector('.letter-content');
const paper = document.querySelector('.paper');
const nextBtn = document.querySelector('.next-btn');
const bgImages = document.querySelectorAll('.bg-img');

// Animation Timeline
const tl = gsap.timeline({ paused: true });

// Define the animation sequence
tl.to(lockScreen, {
    duration: 0.5,
    scale: 0,
    opacity: 0,
    ease: "back.in"
})
.set(lockScreen, { display: "none" })
.set(letterContent, { display: "flex" })
.to(paper, {
    duration: 1,
    scale: 1,
    opacity: 1,
    ease: "elastic.out(1, 0.5)"
})
.to('.bg-img', { // Make background images float gently further away
    duration: 2,
    scale: 1.2,
    opacity: 0.2,
    filter: "blur(8px)",
    stagger: 0.2
}, "<")
.to('.message-line', { // Stagger text lines appearing
    duration: 1,
    opacity: 1,
    y: 0,
    stagger: 0.8,
    ease: "power2.out"
})
.to('.sign-off', {
    duration: 1,
    opacity: 1,
    y: 0,
    ease: "power2.out"
})
.to(nextBtn, {
    duration: 1,
    opacity: 1,
    display: "block",
    y: 0,
    ease: "back.out"
});

// Event Listener for Unlock
lockScreen.addEventListener('click', () => {
    tl.play();
    createSparkles(); // Add some magic sparkles when opening
});

// INSIDE letter.js
nextBtn.addEventListener('click', () => {
    gsap.to('body', {
        opacity: 0,
        duration: 1.5,
        onComplete: () => {
            // UPDATED LINK: Go to the stars first!
            window.location.href = 'stars.html'; 
        }
    });
});

// Helper function for sparkles
function createSparkles() {
    for(let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerText = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = Math.random() * 20 + 10 + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '100';
        document.body.appendChild(sparkle);

        gsap.to(sparkle, {
            y: -100,
            opacity: 0,
            duration: 1.5,
            ease: "power1.out",
            onComplete: () => sparkle.remove()
        });
    }
}