// 1. DATA
const reasons = [
    { text: "Your smile is the most beautiful thing I've ever seen. 💖", emoji: "💖", gif: "gif1.gif" },
    { text: "You make even my worst days feel bright and sunny. ☀️", emoji: "💓", gif: "gif2.gif" },
    { text: "Your kindness towards others inspires me daily. 🌸", emoji: "💗", gif: "gif1.gif" },
    { text: "You are my best friend and my soulmate wrapped in one. 💘", emoji: "💘", gif: "gif2.gif" },
    { text: "I love the way your eyes sparkle when you laugh. ✨", emoji: "💝", gif: "gif1.gif" },
    { text: "Life is just better when you are around. 🏠", emoji: "💞", gif: "gif2.gif" }
];

let currentIndex = 0;
const container = document.getElementById('reasons-container');
const btn = document.querySelector('.shuffle-button');
const endingSection = document.querySelector('.ending-section');
const progressFill = document.querySelector('.progress-fill');

// 2. SETUP BACKGROUND HEARTS
function createHearts() {
    const heartContainer = document.getElementById('heartContainer');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('bg-heart');
        heart.innerHTML = ['❤️', '💖', '🌸', '✨'][Math.floor(Math.random() * 4)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.animationDuration = Math.random() * 5 + 5 + 's';
        heartContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 10000);
    }, 800);
}
createHearts();

// 3. CREATE CARD FUNCTION
function showNextReason() {
    // A. Show Reasons
    if (currentIndex < reasons.length) {
        // Update Progress Bar
        let progress = ((currentIndex + 1) / reasons.length) * 100;
        progressFill.style.width = `${progress}%`;

        // Clear Old Card
        container.innerHTML = '';

        // Create New Card
        const reason = reasons[currentIndex];
        const card = document.createElement('div');
        card.className = 'reason-card';
        card.innerHTML = `
            <div class="reason-text">${reason.emoji} ${reason.text}</div>
            <div class="gif-overlay">
                <img src="${reason.gif}" onerror="this.src='d1.jpeg'" alt="Love Memory">
            </div>
        `;
        container.appendChild(card);

        // Animation
        gsap.fromTo(card, 
            { y: 50, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.5)" }
        );

        btn.textContent = "What else? 🌸";
        currentIndex++;
    } 
    // B. Show Teddy Ending
    else if (currentIndex === reasons.length) {
        progressFill.style.width = "100%"; // Full Love Meter
        
        // Hide Elements
        gsap.to([container, '.page-title'], { opacity: 0, duration: 0.5, display: 'none' });
        btn.style.display = 'none';

        // Show Teddy
        endingSection.style.display = 'block';
        gsap.fromTo(endingSection, 
            { scale: 0, rotate: -10 },
            { scale: 1, rotate: 0, duration: 1.5, ease: "elastic.out(1, 0.5)" }
        );

        // Update Button for Next Page
        setTimeout(() => {
            btn.style.display = 'inline-block';
            btn.textContent = "I have a letter for you... 💌";
            currentIndex++;
        }, 2000);
    } 
    // C. Redirect
    else {
        gsap.to('body', { opacity: 0, duration: 1.2, onComplete: () => { window.location.href = 'letter.html'; } });
    }
}

// 4. INIT
// Load first card immediately? No, wait for click to be interactive.
// But we animate the entrance of the container
gsap.from('.glass-panel', { y: 50, opacity: 0, duration: 1.5, ease: "power3.out" });

btn.addEventListener('click', () => {
    gsap.fromTo(btn, { scale: 0.9 }, { scale: 1, duration: 0.2 }); // Click effect
    showNextReason();
});