const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

// --- 1. SETUP CANVAS ---
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// --- 2. STAR CLASS (Warp Speed Effect) ---
const stars = [];
const STAR_COUNT = 800; // Number of stars

class Star {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = (Math.random() - 0.5) * canvas.width * 2;
        this.y = (Math.random() - 0.5) * canvas.height * 2;
        this.z = Math.random() * canvas.width; 
    }
    update() {
        this.z -= 4; // Speed of stars moving towards screen
        if (this.z <= 0) this.reset();
    }
    draw() {
        let x = (this.x / this.z) * 100 + canvas.width / 2;
        let y = (this.y / this.z) * 100 + canvas.height / 2;
        let s = (1 - this.z / canvas.width) * 2; // Size
        
        if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(x, y, s, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// Create Stars
for (let i = 0; i < STAR_COUNT; i++) stars.push(new Star());

let animationId;
function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)"; // Trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    animationId = requestAnimationFrame(animate);
}
animate(); // Start Animation

// --- 3. CINEMATIC TIMELINE (The Story) ---
const tl = gsap.timeline();

// Text 1: Millions of stars...
tl.to('.t1', { opacity: 1, duration: 2 })
  .to('.t1', { opacity: 0, duration: 1, delay: 2.5 })

// Text 2: Jan 3rd...
  .to('.t2', { opacity: 1, duration: 2 })
  .to('.t2', { opacity: 0, duration: 1, delay: 2 })

// STOP THE STARS (Freeze the universe)
  .to({v:0}, {
      duration: 2,
      onUpdate: function() {
         // Fade out the canvas
         canvas.style.opacity = 1 - this.progress(); 
      },
      onComplete: () => {
          cancelAnimationFrame(animationId);
      }
  })

// Text 3: Except ONE...
  .to('.t3', { opacity: 1, duration: 1.5 })
  .to('.t3', { opacity: 0, duration: 1, delay: 2 })

// The Chosen Star Appears & Glows
  .to('.chosen-star', { opacity: 1, scale: 1, duration: 2 })
  .to('.chosen-star', { boxShadow: "0 0 60px gold", backgroundColor: "gold", scale: 2, duration: 1.5 })

// Reveal Zodiac
  .to('.chosen-star', { opacity: 0, duration: 0.5 }) 
  .set('.zodiac-container', { display: "flex" })
  .to('.zodiac-sign', { opacity: 1, duration: 2, ease: "power2.out" })
  .to('.t4', { opacity: 1, duration: 2 }, "-=1")

// Reveal Video
  .to('.zodiac-container', { y: -30, scale: 0.8, duration: 1, delay: 2 })
  .set('.video-wrapper', { display: "block" })
  .to('.video-wrapper', { opacity: 1, duration: 2, ease: "power2.out" })

// Reveal Button
  .set('.next-btn', { display: "inline-block" })
  .to('.next-btn', { opacity: 1, duration: 1, delay: 1 });

// --- 4. NAVIGATION ---
document.querySelector('.next-btn').addEventListener('click', () => {
    gsap.to('body', {
        opacity: 0,
        duration: 2,
        backgroundColor: "white",
        onComplete: () => {
            window.location.href = 'last.html'; // Go to Finale
        }
    });
});