var moviesWrapper = document.getElementById('movies');
var searchInput = document.getElementById('search-input');
var rating = document.getElementById('rating');

const API_KEY = "468f88edca940e5186a818f559908ef0";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
var page = 1;
var url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=" + API_KEY + "&page=" + page;

function setColor(mark) {
    if (mark > 5.9) {
        return "#27a42e";
    } else if (mark < 5.0) {
        return "#FF1C04";
    } else {
        return "#f19c08";
    }
}

var getMovies = (url) => {
    return new Promise((res, rej) => {
        fetch(url).then((data) => {
            res(data.json());
        }).catch((e) => {
            rej(console.error(e));
        });
    });
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
    getMovies(url).then((response) => {
        var movies = response.results;
        console.log(movies[0]);
        displayMovies(movies);
    }).catch((error) => {
        console.error("Erreur", error);
    });
}

render(url);

searchInput.oninput = async () => {
    moviesWrapper.innerHTML = "";
    var query = searchInput.value;
    var queryUrl = "https://api.themoviedb.org/3/search/movie?&api_key=" + API_KEY + "&query=" + query;
    render(queryUrl);
    if (searchInput.value == "") {
        render(url);
    }
}
/* (function () {
    var scrollY = function () {
        var supportPageOffset = window.pageXOffset !== undefined;
        var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

        return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    }

    var top = search.getBoundingClientRect().top + scrollY();
    window.addEventListener('scroll', function () {
        if (top < scrollY() && !search.classList.contains('fixed')) {
            search.classList.add('fixed');
        }
        if (top > scrollY() && search.classList.contains('fixed')) {
            search.classList.remove('fixed');
        }
    })
})(); */