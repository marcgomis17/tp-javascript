var moviesWrapper = document.getElementById('movies');
var searchInput = document.getElementById('search-input');
var rating = document.getElementById('rating');
const loader = document.getElementById('loading');

const API_KEY = "468f88edca940e5186a818f559908ef0";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
var page = 1;
var url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" + API_KEY + "&page=";

function setColor(mark) {
    if (mark > 5.9) {
        return "#27a42e";
    } else if (mark < 5.0) {
        return "#FF1C04";
    } else {
        return "#f19c08";
    }
}

async function getMovies(url) {
    try {
        var response = await fetch(url);
        if (response.ok) {
            var data = await response.json();
            return data;
        } else {
            console.error('Error');
        }
    } catch (e) {
        console.error(e);
    }
}

function displayMovies(moviesArray) {
    moviesArray.forEach(movie => {
        var movieDisplay = document.createElement('div');
        var moviePoster = document.createElement('div');
        var movieImg = document.createElement('img');
        var posterFooter = document.createElement('div');
        var movieInfo = document.createElement('div');
        var movieName = document.createElement('p');
        var rating = document.createElement('p');
        var movieDescription = document.createElement('div');
        var overviewContainer = document.createElement('p');
        var overviewTitle = document.createElement('h3');
        var overviewText = document.createElement('span');
        var linebreak = document.createElement('br');

        movieDisplay.className = "movie-display";
        moviePoster.className = "movie-poster";
        posterFooter.className = "poster-footer";
        movieName.id = "movie-name";
        rating.id = "rating";
        movieInfo.className = "movie-info";
        movieDescription.className = "movie-description";
        overviewContainer.className = "overview-container";

        var poster = IMG_PATH + movie.poster_path;
        movieImg.src = poster;
        movieName.innerText = movie.original_title;
        rating.innerText = movie.vote_average;
        var average = movie.vote_average;
        average = parseFloat(average);
        rating.style.color = setColor(average);
        overviewTitle.innerText = "Overview: ";
        overviewText.innerText = movie.overview;

        overviewContainer.append(overviewTitle, linebreak, overviewText);
        movieDescription.append(overviewContainer);
        movieInfo.append(movieName, rating);
        moviePoster.append(movieImg);
        posterFooter.append(movieInfo, movieDescription);
        movieDisplay.append(moviePoster, posterFooter);

        moviesWrapper.append(movieDisplay);
    });
}

function render(url) {
    getMovies(url).then((data) => {
        var movies = data.results;
        setTimeout(moviesWrapper.classList.remove('hidden'), 8000);
        loader.classList.add('hidden');
        displayMovies(movies);
    }).catch((error) => {
        console.error("Erreur", error);
    });
}

render(url);

searchInput.oninput = () => {
    moviesWrapper.innerHTML = "";
    moviesWrapper.classList.add('hidden');
    loader.classList.remove('hidden');
    var query = searchInput.value;
    var queryUrl = "https://api.themoviedb.org/3/search/movie?&api_key=" + API_KEY + "&query=" + query;
    render(queryUrl);
    if (searchInput.value == "") {
        render(url);
    }
}

window.addEventListener('scroll', function () {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && searchInput.value == "") {
        page++;
        render(url + page);
    }
});