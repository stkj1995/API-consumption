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
  const template = document.getElementById("movie-template");
  const fragment = document.createDocumentFragment();

  movies.slice(0, 3).forEach(movie => {
    const clone = template.content.cloneNode(true);

    clone.querySelector(".movie-title").textContent = movie.title;
    clone.querySelector(".movie-poster").src = IMG_URL + movie.poster_path;
    clone.querySelector(".movie-poster").alt = movie.title;
    clone.querySelector(".movie-overview").textContent =
      movie.overview || "No description available.";
    clone.querySelector(".movie-original").textContent = movie.original_title;
    clone.querySelector(".movie-release").textContent = movie.release_date;

    fragment.appendChild(clone);
  });

  container.innerHTML = ""; 
  container.appendChild(fragment);
}

async function init() {
  const movies = await getMovies();
  displayMovies(movies.nowPlaying, "now-playing");
  displayMovies(movies.popular, "popular");
  displayMovies(movies.topRated, "top-rated");
  displayMovies(movies.upcoming, "upcoming");
}

init();
