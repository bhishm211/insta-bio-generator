const bios = {
  all: [
    "💫 Dream. Believe. Achieve.",
    "🌈 Creating my own sunshine.",
    "🎯 Focused. Empowered. Blessed.",
    "🔥 Hustle in silence. Let success make the noise.",
    "🌍 Travel | Inspire | Repeat",
    "✨ Just vibes & good energy.",
    "💖 Be you. Do you. For you.",
    "🚀 Grinding today for a better tomorrow."
  ],
  funny: ["😂 Insert bio here.", "😜 Professional overthinker.", "🥱 Sleeping is my hobby."],
  sad: ["💔 Broken but breathing.", "🌧️ Cloudy with a chance of tears."],
  love: ["❤️ Love conquers all.", "💖 You + Me = Forever"],
  motivation: ["🔥 Make it happen.", "🚀 Stay focused, stay strong."],
  savage: ["👑 Not your toy.", "🚫 No fake vibes."]
};

let savedBios = JSON.parse(localStorage.getItem('savedBios')) || [];

function updateSavedBios() {
  const savedDiv = document.getElementById('savedBios');
  if (!savedBios.length) {
    savedDiv.innerHTML = 'No saved bios yet.';
    return;
  }
  savedDiv.innerHTML = '';
  savedBios.forEach(bio => {
    const div = document.createElement('div');
    div.className = 'bio-card';
    div.innerText = bio;
    div.onclick = () => copyBio(bio);
    savedDiv.appendChild(div);
  });
}

function generateBio() {
  const mood = document.getElementById('mood').value;
  const moodBios = mood === 'all' ? Object.values(bios).flat() : bios[mood];
  const random = Math.floor(Math.random() * moodBios.length);
  document.getElementById('bioOutput').innerText = moodBios[random];
}

function copyGeneratedBio() {
  const text = document.getElementById('bioOutput').innerText;
  navigator.clipboard.writeText(text);
  alert('Copied to clipboard!');
}

function copyBio(text) {
  navigator.clipboard.writeText(text);
  alert('Copied to clipboard!');
}

function saveBio() {
  const text = document.getElementById('bioOutput').innerText;
  if (text && !savedBios.includes(text)) {
    savedBios.push(text);
    localStorage.setItem('savedBios', JSON.stringify(savedBios));
    updateSavedBios();
    alert('Bio saved!');
  }
}

function downloadBio() {
  const text = document.getElementById('bioOutput').innerText;
  const canvas = document.createElement('canvas');
  canvas.width = 500;
  canvas.height = 250;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#333';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = '20px Poppins';
  ctx.fillStyle = 'white';
  ctx.fillText(text, 50, 130);
  const link = document.createElement('a');
  link.download = 'bio.png';
  link.href = canvas.toDataURL();
  link.click();
}

function share(platform) {
  const text = "Check out this awesome Instagram Bio Generator: [Your Website]";
  if (platform === 'whatsapp') {
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  } else if (platform === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
  } else if (platform === 'facebook') {
    window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(text)}`);
  }
}

function fakeLiveUsers() {
  document.getElementById('userCount').innerText = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
}
setInterval(fakeLiveUsers, 3000);
fakeLiveUsers();

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
});

const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.pageX + 'px';
  cursor.style.top = e.pageY + 'px';
});
updateSavedBios();
