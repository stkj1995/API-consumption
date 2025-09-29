const API_KEY = "0bea372fe8eac0d8890fc859457d2a6d";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

async function getMovies() {
  const urls = [
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  ];

  const responses = await Promise.all(urls.map(url => fetch(url)));
  const data = await Promise.all(responses.map(res => res.json()));

  return {
    nowPlaying: data[0].results,
    popular: data[1].results,
    topRated: data[2].results,
    upcoming: data[3].results
  };
}

function displayMovies(movies, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = movies.map(movie => `
    <article class="movie-card">
      <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.vote_average.toFixed(1)}</p>
    </article>
  `).join("");
}

async function init() {
  const movies = await getMovies();
  displayMovies(movies.nowPlaying, "now-playing");
  displayMovies(movies.popular, "popular");
  displayMovies(movies.topRated, "top-rated");
  displayMovies(movies.upcoming, "upcoming");
}

init();
