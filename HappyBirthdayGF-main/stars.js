const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

// Make Canvas Full Screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// --- STAR SYSTEM ---
const stars = [];
const STAR_COUNT = 1500; // The "Million" feel

class Star {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = (Math.random() - 0.5) * canvas.width * 2;
        this.y = (Math.random() - 0.5) * canvas.height * 2;
        this.z = Math.random() * canvas.width; // Depth
        this.size = 0.5;
    }

    update() {
        // Move stars towards screen (Warp Speed Effect)
        this.z = this.z - 2; // Speed
        if (this.z <= 0) this.reset();
    }

    draw() {
        // 3D Projection Math
        const x = (this.x / this.z) * 100 + canvas.width / 2;
        const y = (this.y / this.z) * 100 + canvas.height / 2;
        const s = (1 - this.z / canvas.width) * 3; // Size based on closeness

        if(x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.arc(x, y, s, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// Initialize Stars
for(let i=0; i<STAR_COUNT; i++) {
    stars.push(new Star());
}

let animationId;
function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Trails effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    
    animationId = requestAnimationFrame(animate);
}
animate(); // Start the loop

// --- CINEMATIC TIMELINE (GSAP) ---
const tl = gsap.timeline();

// 1. Text: "Millions of stars..."
tl.to('.t1', { opacity: 1, duration: 2 })
  .to('.t1', { opacity: 0, duration: 1, delay: 3 })

// 2. Text: "But on Jan 3rd..."
  .to('.t2', { opacity: 1, duration: 2 })
  .to('.t2', { opacity: 0, duration: 1, delay: 2 })
  
// 3. THE COSMIC SHIFT
// Stop the warp speed, fade out background stars
  .to({v:0}, { 
      duration: 2, 
      onUpdate: function() {
          // This creates a fake delay to sync with music/emotion
          ctx.globalAlpha = 1 - this.progress(); // Fade canvas out
      },
      onComplete: () => {
          cancelAnimationFrame(animationId); // Stop moving stars
          ctx.clearRect(0,0, canvas.width, canvas.height); // Clear screen
      }
  })

// 4. Text: "Except one..."
  .to('.t3', { opacity: 1, duration: 1.5 })
  .to('.t3', { opacity: 0, duration: 1, delay: 2 })

// 5. THE CHOSEN STAR APPEARS
  .to('.chosen-star', { opacity: 1, scale: 1, duration: 2, ease: "power2.out" })
  .to('.chosen-star', { 
      boxShadow: "0 0 50px #ffd700, 0 0 100px #ffd700", 
      backgroundColor: "#ffd700",
      scale: 3, 
      duration: 2 
  })

// 6. REVEAL CAPRICORN & HARSHITA
  .to('.chosen-star', { opacity: 0, duration: 0.5 }) // Star becomes the symbol
  .set('.zodiac-sign', { display: "block" })
  .to('.zodiac-sign', { opacity: 1, duration: 2, ease: "power4.out" })
  .to('.t4', { opacity: 1, duration: 2 }, "-=1")

// 7. VIDEO REVEAL
  .to('.zodiac-container', { y: -50, scale: 0.8, duration: 1.5, delay: 2 })
  .set('.video-wrapper', { display: "block" })
  .to('.video-wrapper', { opacity: 1, duration: 2, ease: "power2.out" })
  
// 8. BUTTON REVEAL
  .set('.next-btn', { display: "inline-block" })
  .to('.next-btn', { opacity: 1, duration: 1, delay: 2 });


// --- NAVIGATION ---
document.querySelector('.next-btn').addEventListener('click', () => {
    gsap.to('body', {
        opacity: 0, duration: 2, onComplete: () => {
            window.location.href = 'last.html';
        }
    });
});