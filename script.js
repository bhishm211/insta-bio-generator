// Premium Typewriter Effect
const typewriterText = "InstaBioMagic PRO - AI-Powered Instagram Bio Generator";
const typewriterElement = document.getElementById('typewriter');
let i = 0;

function typeWriter() {
    if (i < typewriterText.length) {
        typewriterElement.innerHTML += typewriterText.charAt(i);
        i++;
        setTimeout(typeWriter, Math.random() * 100 + 50);
    } else {
        // Add blinking cursor
        typewriterElement.innerHTML += '<span class="blinking-cursor">|</span>';
    }
}

// Start typewriter effect after 1 second
setTimeout(typeWriter, 1000);

// Premium Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    // Save preference to localStorage
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('darkTheme', isDark);
    
    // Update icon
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Check for saved theme preference
if (localStorage.getItem('darkTheme') === 'true') {
    body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Premium Bio Generator
const moods = {
    funny: [
        "Professional snack eater. Unlicensed therapist. Will pet your dog.",
        "I'm not lazy, I'm on energy-saving mode. 🔋",
        "I followed my dreams... now I'm lost. 🗺️",
        "My diet starts tomorrow... just like yesterday. 🍩"
    ],
    professional: [
        "Digital marketing expert helping brands grow | Speaker | Coffee enthusiast",
        "UX Designer creating intuitive experiences | Figma lover | Based in SF",
        "Full-stack developer | JavaScript enthusiast | Open source contributor"
    ],
    creative: [
        "Painting my dreams one canvas at a time 🎨 | Color enthusiast | NYC",
        "Writer of words | Dreamer of dreams | Collector of stories 📚",
        "Photographer capturing moments that matter 📸 | Travel addict 🌍"
    ]
};

const generatePremiumBtn = document.getElementById('generatePremiumBtn');
const premiumBioOutput = document.getElementById('premiumBioOutput');

generatePremiumBtn.addEventListener('click', () => {
    const style = document.getElementById('bioStyle').value;
    const tone = document.querySelector('.tone-btn.active').dataset.tone;
    const keywords = document.getElementById('keywords').value;
    
    // Simulate AI generation
    premiumBioOutput.innerHTML = generateAIBio(style, tone, keywords);
    
    // Update character count
    updateCharCount();
});

function generateAIBio(style, tone, keywords) {
    // In a real app, this would call an AI API
    // Here we simulate with predefined templates
    
    let baseBio = "";
    const keywordPhrase = keywords ? `| ${keywords.split(',').join(' | ')}` : "";
    
    switch(style) {
        case 'professional':
            baseBio = `Digital creator ${keywordPhrase}\nTurning ideas into reality\nCurrently working on new projects\n👇 Latest work`;
            break;
        case 'creative':
            baseBio = `Creating magic ${keywordPhrase}\nArtist • Dreamer • Visionary\nBased in [Location]\n✨ Available for collaborations`;
            break;
        case 'funny':
            baseBio = `Professional ${keywords || "human"} ${keywordPhrase}\nWill work for coffee ☕\nCertified snack enthusiast 🍕\nDM for dad jokes`;
            break;
        default:
            baseBio = `Living my best life ${keywordPhrase}\nCreating • Exploring • Growing\n📍 [Location]\n👇 Check out my latest`;
    }
    
    // Add tone variations
    if (tone === 'witty') {
        baseBio = baseBio.replace(/\./g, "...").replace(/\n/g, "\n💫 ");
    } else if (tone === 'inspirational') {
        baseBio = "✨ " + baseBio.replace(/\n/g, "\n🌟 ");
    }
    
    return baseBio;
}

// Character counter
function updateCharCount() {
    const content = premiumBioOutput.textContent;
    const charCount = content.length;
    const emojiCount = (content.match(/[\u{1F600}-\u{1F6FF}]/gu) || []).length;
    
    document.querySelector('.char-count').textContent = `${charCount}/150`;
    document.querySelector('.emoji-count').textContent = `${emojiCount} emojis`;
    
    if (charCount > 150) {
        document.querySelector('.char-count').classList.add('over-limit');
    } else {
        document.querySelector('.char-count').classList.remove('over-limit');
    }
}

premiumBioOutput.addEventListener('input', updateCharCount);

// Tone selector
document.querySelectorAll('.tone-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tone-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Emoji style selector
document.querySelectorAll('.emoji-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.emoji-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Font selector
document.querySelector('.font-choice').addEventListener('change', (e) => {
    premiumBioOutput.style.fontFamily = e.target.value;
});

// Color picker
document.querySelector('.color-picker input').addEventListener('input', (e) => {
    premiumBioOutput.style.color = e.target.value;
});

// Alignment buttons
document.querySelectorAll('.align-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.align-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        premiumBioOutput.style.textAlign = btn.classList.contains('left') ? 'left' :
                                         btn.classList.contains('center') ? 'center' : 'right';
    });
});

// Copy to clipboard
document.querySelector('.copy-btn').addEventListener('click', () => {
    const text = premiumBioOutput.textContent;
    navigator.clipboard.writeText(text).then(() => {
        showToast('Bio copied to clipboard!');
    });
});

// Toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'premium-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Fake live users counter
function updateLiveUsers() {
    const baseUsers = 1245;
    const randomChange = Math.floor(Math.random() * 20) - 10;
    const newCount = baseUsers + randomChange;
    document.getElementById('userCount').textContent = newCount.toLocaleString();
}

setInterval(updateLiveUsers, 3000);

// Initialize
updateLiveUsers();
