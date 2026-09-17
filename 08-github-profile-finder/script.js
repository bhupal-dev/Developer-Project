const form = document.querySelector('#form');
const output = document.querySelector('#output');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.querySelector('#user').value.trim();
  if (!username) return;
  output.textContent = 'Loading…';
  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
    if (!response.ok) throw new Error('User not found');
    const profile = await response.json();

    const card = document.createElement('div');
    card.className = 'profile';
    const image = document.createElement('img');
    image.src = profile.avatar_url;
    image.alt = `${profile.login} avatar`;
    const name = document.createElement('h2');
    name.textContent = profile.name || profile.login;
    const bio = document.createElement('p');
    bio.textContent = profile.bio || 'No bio provided.';
    const stats = document.createElement('p');
    stats.textContent = `Repos: ${profile.public_repos} · Followers: ${profile.followers}`;
    const link = document.createElement('a');
    link.href = profile.html_url;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.textContent = 'GitHub profile';
    card.append(image, name, bio, stats, link);
    output.replaceChildren(card);
  } catch (error) {
    output.textContent = error.message || 'Request failed.';
  }
});
