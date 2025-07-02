document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
            
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
    
    // Bio generator functionality
    const moodBtns = document.querySelectorAll('.mood-btn');
    const generateBtn = document.getElementById('generateBtn');
    const bioDisplay = document.getElementById('bioDisplay');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const saveBtn = document.getElementById('saveBtn');
    const toast = document.getElementById('toast');
    const aiForm = document.getElementById('aiForm');
    
    let currentMood = 'professional';
    
    // Professional bio database
    const bios = {
        professional: [
            "Digital Marketing Specialist | Helping brands grow their online presence | SEO & Content Strategy",
            "UX/UI Designer | Creating intuitive digital experiences | Adobe Creative Suite | Figma",
            "Financial Consultant | Wealth Management | Retirement Planning | Let's build your future",
            "Software Engineer | Full Stack Developer | JavaScript | Python | Building scalable solutions"
        ],
        creative: [
            "Visual Storyteller ✨ | Photography & Design | Capturing moments that matter",
            "Creative Director | Idea Generator | Turning concepts into visual masterpieces",
            "Writer & Content Creator | Words that inspire and engage | Currently working on my novel",
            "Art Director | Branding Specialist | Making ideas visually compelling"
        ],
        minimal: [
            "Design. Create. Inspire.",
            "Building digital experiences",
            "Photographer | NYC",
            "Writer | Thinker | Coffee enthusiast"
        ],
        fun: [
            "Professional coffee drinker ☕ | Occasional web designer",
            "I put the 'pro' in procrastination | Digital Marketer by day, Netflix critic by night",
            "Not a regular mom, a cool mom | Also a CEO",
            "Saving the world one spreadsheet at a time | Financial Analyst"
        ]
    };
    
    // AI-generated bios database
    const aiBios = {
        professional: [
            "{profession} | {specialty} | {achievement} | Let's connect!",
            "Helping businesses {value proposition} | {profession} | {credential}",
            "{profession} at {company} | Focused on {specialty} | {personal detail}",
            "Passionate about {interest} | {profession} | {unique selling point}"
        ],
        friendly: [
            "Hi there! I'm a {profession} who loves {interest}. Let's chat about {topic}!",
            "{profession} by day, {hobby} by night | Always up for coffee and conversation",
            "I help people {value} through {service} | {fun fact about you}",
            "{profession} | {personal motto} | Let's work together!"
        ],
        creative: [
            "✨ Creating magic through {medium} | {profession} | {artistic style}",
            "{creative role} | Turning ideas into {creative output} | {inspiration}",
            "I {creative action} for {audience} | {unique perspective} | {current project}",
            "{artistic identity} | {creative philosophy} | Available for {services}"
        ],
        authoritative: [
            "Award-winning {profession} | {credentials} | {industry} expert",
            "{title} at {company} | {years} years experience in {field} | {specialization}",
            "Leading {industry} professional | Published author | Keynote speaker",
            "{profession} | Trusted by {notable clients} | {unique methodology}"
        ]
    };
    
    // Generate random bio
    function generateBio() {
        bioDisplay.innerHTML = '<div>Generating your perfect bio...</div>';
        
        setTimeout(() => {
            const selectedBios = bios[currentMood];
            const randomIndex = Math.floor(Math.random() * selectedBios.length);
            bioDisplay.textContent = selectedBios[randomIndex];
            
            showToast('Bio generated successfully');
        }, 800);
    }
    
    // Generate AI bio
    function generateAIBio(profession, tone, style) {
        bioDisplay.innerHTML = '<div>AI is crafting your perfect bio...</div>';
        
        setTimeout(() => {
            const templates = aiBios[tone] || aiBios['professional'];
            const template = templates[Math.floor(Math.random() * templates.length)];
            
            // Replace placeholders
            let bio = template
                .replace('{profession}', profession || 'Professional')
                .replace('{specialty}', getRandomSpecialty(profession))
                .replace('{achievement}', getRandomAchievement())
                .replace('{value proposition}', getRandomValueProp(profession))
                .replace('{company}', getRandomCompany())
                .replace('{personal detail}', getRandomPersonalDetail())
                .replace('{interest}', getRandomInterest(profession))
                .replace('{hobby}', getRandomHobby())
                .replace('{topic}', getRandomTopic(profession));
            
            // Apply style
            bio = applyStyle(bio, style);
            
            bioDisplay.textContent = bio;
            showToast('AI bio generated successfully');
        }, 1500);
    }
    
    // Helper functions for AI generation
    function getRandomSpecialty(profession) {
        const specialties = {
            'designer': ['UI/UX', 'Brand Identity', 'Print Design', 'Web Design'],
            'developer': ['Frontend', 'Backend', 'Mobile Apps', 'Cloud Solutions'],
            'marketer': ['Social Media', 'Content Marketing', 'SEO', 'Email Marketing'],
            'writer': ['Technical Writing', 'Creative Writing', 'Copywriting', 'Editing']
        };
        
        for (const [key, values] of Object.entries(specialties)) {
            if (profession.toLowerCase().includes(key)) {
                return values[Math.floor(Math.random() * values.length)];
            }
        }
        
        return 'Specialist';
    }
    
    function getRandomAchievement() {
        const achievements = [
            'Featured in Forbes 30 Under 30',
            'Helped 100+ clients achieve their goals',
            '10+ years of industry experience',
            'Award-winning professional',
            'Certified expert in my field'
        ];
        return achievements[Math.floor(Math.random() * achievements.length)];
    }
    
    function getRandomValueProp(profession)
