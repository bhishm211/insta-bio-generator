// Theme Toggle
const toggle = document.getElementById('toggle-theme');
toggle.onclick = () => {
  document.body.classList.toggle('light');
};

// Fake Counter (Optional)
// Bios Data
const bios = {
  funny: ["😂 Just winging it.", "🤣 Insert funny bio here.", "😜 Professional procrastinator."],
  love: ["💖 You + Me = Forever.", "❤️ Love yourself first.", "💕 Living in love."],
  sad: ["💔 Broken but breathing.", "😢 Lost in my own thoughts.", "🌧️ Sometimes smiles hide pain."],
  motivation: ["🔥 Dream. Believe. Achieve.", "🚀 Grinding today, shining tomorrow.", "💪 Stay focused, stay strong."],
  savage: ["😎 Proof that I can do better.", "🖤 Born to express, not impress.", "🔥 Silent killer."],
  all: []
};
bios.all = [...bios.funny, ...bios.love, ...bios.sad, ...bios.motivation, ...bios.savage];

// Generate
document.getElementById('generate').onclick = () => {
  const mood = document.getElementById('mood').value;
  const bioArray = bios[mood];
  const random = Math.floor(Math.random() * bioArray.length);
  document.getElementById('output').innerText = bioArray[random];
};

// Copy
document.getElementById('copy').onclick = () => {
  navigator.clipboard.writeText(document.getElementById('output').innerText);
  alert('Copied to clipboard!');
};

// Save
document.getElementById('save').onclick = () => {
  const bio = document.getElementById('output').innerText;
  if (bio) {
    const saved = document.createElement('div');
    saved.innerText = bio;
    document.getElementById('saved-bios').appendChild(saved);
  }
};

// Download
document.getElementById('download').onclick = () => {
  const bio = document.getElementById('output').innerText;
  const a = document.createElement('a');
  const blob = new Blob([bio], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = 'insta-bio.txt';
  a.click();
  URL.revokeObjectURL(url);
};
