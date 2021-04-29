const searchIcon = document.querySelector('.icon');
const img_url = 'https://image.tmdb.org/t/p/w500';
const backdrop_url = 'https://image.tmdb.org/t/p/original';
const api_url = 'https://api.themoviedb.org/3/movie/popular?api_key=6a531f225230731e8d2ddba27a26e76b';
let movieList;
const genreApi = 'https://api.themoviedb.org/3/genre/movie/list?api_key=6a531f225230731e8d2ddba27a26e76b';
let premiersHeader = document.querySelectorAll('.premiers-display');
const premiersDiv = document.querySelector('.premiers');
const header = document.querySelector('header');
console.log(premiersHeader);

searchIcon.addEventListener('click', () => {
    document.querySelector('.search-input').classList.toggle('active');
});

if(!localStorage.getItem('movies')) {
    fetch(api_url)
        .then(response => response.json())
        .then(data => {
            movieList = data.results.map(entity => ({
                title: entity.title,
                release: entity.release_date.split('-')[0],
                description: entity.overview,
                image: img_url + entity.poster_path,
                rating: entity.vote_average,
                backdrop: backdrop_url + entity.backdrop_path
            }))
        
        localStorage.setItem('movies', JSON.stringify(movieList));
    })
} else {
    movieList = JSON.parse(localStorage.getItem('movies'));
    premiersBar(movieList);
}

// localStorage.clear();

const movieTitle = document.querySelector('.movie-title');
const movieRating = document.querySelector('.movie-rating');
const movieDescription = document.querySelector('.description');
const releaseDate = document.querySelector('.release-date');
const headerImg = document.querySelector('.header-img');

function premiersBar(movie) {

   const firstFiveMovies = movie.slice(0, 5);
        firstFiveMovies.forEach(element => {

        let posterImg = document.createElement('img');
        posterImg.className += 'premiere-img';
        posterImg.src = element.image;

        const premiersDisplay = document.createElement('div');
        premiersDisplay.className += 'premiers-display';
        
        const movieName = document.createElement('h3');
        movieName.textContent = element.title;

        const movieRelease = document.createElement('p');
        movieRelease.textContent = element.release;
        const premiersTextDiv = document.createElement('div');
        premiersTextDiv.className += 'image-text';
        
        premiersDisplay.appendChild(posterImg);
        premiersDisplay.appendChild(premiersTextDiv);
        premiersTextDiv.appendChild(movieName);
        premiersTextDiv.appendChild(movieRelease);
        premiersDiv.appendChild(premiersDisplay);

        premiersDisplay.addEventListener('click', ()=> {
            header.style.background = `url(${element.backdrop})`;
            header.style.backgroundSize = 'cover';
            header.style.backgroundPosition = 'center center';
            movieTitle.textContent = element.title;
            movieRating.textContent = element.rating;
            movieDescription.textContent = element.description;
            releaseDate.textContent = element.release;
            headerImg.src = element.image;
        });
    });
}

