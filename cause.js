// Romantic Reasons Data (6 Items)
const reasons = [
    { 
        text: "You have the kindest heart I've ever known. 💖", 
        emoji: "💖", 
        gif: "gif1.gif" 
    },
    { 
        text: "Your smile lights up my entire world instantly. 💓", 
        emoji: "💓", 
        gif: "gif2.gif" 
    },
    { 
        text: "You support my dreams like nobody else does. 💗", 
        emoji: "💗", 
        gif: "gif1.gif" 
    },
    { 
        text: "Every boring moment becomes magical with you. 💘", 
        emoji: "💘", 
        gif: "gif2.gif" 
    },
    { 
        text: "You are beautiful inside and out, my pretty soul. 💝", 
        emoji: "💝", 
        gif: "gif1.gif" 
    },
    { 
        text: "I can't wait to create a million more memories with you. 💞", 
        emoji: "💞", 
        gif: "gif2.gif" 
    }
];

let currentIndex = 0;
const container = document.getElementById('reasons-container');
const btn = document.querySelector('.shuffle-button');
const counter = document.querySelector('.reason-counter');
const endingSection = document.querySelector('.ending-section');
const title = document.querySelector('.page-title');

// GSAP Setup
const tl = gsap.timeline();

// Initial Entry Animation
window.addEventListener('load', () => {
    gsap.from('.glass-panel', {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
    });
});

function createCard(reason) {
    // Clear previous card
    container.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'reason-card';
    card.innerHTML = `
        <div class="reason-text">${reason.emoji} ${reason.text}</div>
        <div class="gif-overlay">
            <img src="${reason.gif}" alt="Romantic Moment">
        </div>
    `;
    container.appendChild(card);

    // Card Animation (Float Up & Scale)
    gsap.fromTo(card, 
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" }
    );
}

// Button Click Logic
btn.addEventListener('click', () => {
    
    // Animation for button press
    gsap.fromTo(btn, { scale: 0.95 }, { scale: 1, duration: 0.2 });

    // 1. Show Reasons
    if (currentIndex < reasons.length) {
        createCard(reasons[currentIndex]);
        
        // Update Counter
        counter.textContent = `${currentIndex + 1} / ${reasons.length}`;
        btn.textContent = "What else? 🌸";
        
        currentIndex++;
    } 
    // 2. Show Teddy Ending
    else if (currentIndex === reasons.length) {
        // Fade out cards and title
        gsap.to([container, counter, title], { 
            opacity: 0, 
            height: 0,
            duration: 0.5, 
            onComplete: () => {
                container.style.display = 'none';
                counter.style.display = 'none';
                title.style.display = 'none';
            }
        });

        // Hide Button temporarily
        btn.style.display = 'none';

        // Reveal Teddy Section
        endingSection.style.display = 'block';
        gsap.fromTo(endingSection, 
            { opacity: 0, scale: 0.8, rotate: -5 },
            { opacity: 1, scale: 1, rotate: 0, duration: 1.5, ease: "elastic.out(1, 0.6)" }
        );

        // Bring button back for next page
        setTimeout(() => {
            btn.style.display = 'inline-block';
            btn.textContent = "I wrote a letter for you... 💌";
            btn.style.background = "linear-gradient(45deg, #d63384, #ff8fa3)"; // Darker pink for emphasis
            btn.style.color = "white";
            currentIndex++;
        }, 2000);
    } 
    // 3. Go to Letter Page
    else {
        gsap.to('body', {
            opacity: 0,
            duration: 1.2,
            onComplete: () => {
                window.location.href = 'letter.html'; // Go to Glass Letter
            }
        });
    }
});