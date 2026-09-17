const form = document.querySelector('#form');
const grid = document.querySelector('#grid');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = document.querySelector('#query').value.trim();
  if (!query) return;

  grid.textContent = 'Loading…';

  try {
    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=movie&limit=12`
    );

    if (!response.ok) throw new Error('Movie service is unavailable.');

    const data = await response.json();
    grid.replaceChildren();

    if (!data.results.length) {
      grid.textContent = 'No movies found.';
      return;
    }

    data.results.forEach((movie) => {
      const article = document.createElement('article');
      article.className = 'movie';

      const image = document.createElement('img');
      image.src = movie.artworkUrl100
        ? movie.artworkUrl100.replace('100x100', '300x450')
        : 'https://via.placeholder.com/300x450?text=No+Poster';
      image.alt = `${movie.trackName || 'Movie'} poster`;
      image.loading = 'lazy';

      const details = document.createElement('div');
      const title = document.createElement('strong');
      title.textContent = movie.trackName || 'Untitled';
      const year = document.createElement('span');
      year.textContent = movie.releaseDate
        ? ` ${new Date(movie.releaseDate).getFullYear()}`
        : '';

      details.append(title, document.createElement('br'), year);
      article.append(image, details);
      grid.appendChild(article);
    });
  } catch (error) {
    grid.textContent = error.message || 'Search failed.';
  }
});
