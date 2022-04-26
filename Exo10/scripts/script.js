const favMealDisplay = document.getElementById('fav-meal-display');
var searchInput = document.getElementById('search-input');
var mealsWrapper = document.querySelector('#meals');
const modal = document.querySelector('.modal');
const closeBtn = document.getElementById('close-btn');
var id;
const API_URL = "https://www.themealdb.com/api/json/v1/1/random.php";
const ID_URL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
var favIds = [];

async function getMeal(url) {
    try {
        var response = await fetch(url);
        if (response.ok) {
            var data = response.json();
            return data;
        } else {
            console.error("Error");
        }
    } catch (e) {
        console.error(e);
    }
}

function buildFav(meal) {
    const favMeal = document.createElement('div');
    favMeal.className = "fav-meal";
    favMeal.setAttribute('data-id', meal.idMeal);
    const mealImg = document.createElement('img');
    mealImg.src = meal.strMealThumb;
    const favName = document.createElement('p')
    favName.id = "fav-name";
    favName.innerText = meal.strMeal;

    favMealDisplay.append(favMeal);
}

function setModal(id) {
    const recipeName = document.getElementById('name');
    const modalImg = document.getElementById('modal-img');
    const instructionText = document.getElementById('instruction-text');
    const ingredients = document.getElementById('ingredient-list');
    getMeal(ID_URL + id).then((data) => {
        var meal = data.meals[0];
        var ingredientsArr = Object.values(meal).slice(9, 29);
        ingredientsArr.forEach(key => {
            if (key != "") {
                var ingredient = document.createElement('li');
                ingredient.innerText = key;
                ingredients.append(ingredient);
            }
        });
        modalImg.style.backgroundImage = "url('" + meal.strMealThumb + "')";
        recipeName.innerText = meal.strMeal;
        instructionText.innerText = meal.strInstructions;
    })
}

function buildCard(meal, url) {
    var card = document.createElement('div');
    card.className = "meal-display";
    var mealPoster = document.createElement('div');
    mealPoster.className = "meal-poster";
    var posterDisplay = document.createElement('div');
    posterDisplay.id = "poster-display";
    var generateBtn = document.createElement('button');
    generateBtn.type = "button";
    generateBtn.id = "generate-btn";
    generateBtn.innerText = "Generer une recette";
    if (url != API_URL) {
        generateBtn.classList.add('hidden');
    }

    var mealInfo = document.createElement('div');
    mealInfo.className = "meal-info";
    var mealName = document.createElement('p');
    mealName.id = "meal-name";
    var likeBtn = document.createElement('i');
    likeBtn.classList.add('fa-solid', 'fa-heart', 'fa-2x');
    likeBtn.id = "like-btn";
    likeBtn.setAttribute('data-id', meal.idMeal);

    posterDisplay.style.backgroundImage = "url('" + meal.strMealThumb + "')";
    mealName.innerText = meal.strMeal;

    generateBtn.onclick = () => {
        mealsWrapper.innerHTML = "";
        displayMeal(API_URL);
    }

    likeBtn.onclick = (e) => {
        var currentColor = window.getComputedStyle(e.target)['color'];
        var red = "rgb(255, 0, 0)";
        var grey = "rgb(211, 211, 211)"
        id = e.target.getAttribute('data-id');
        setModal(id);
        if (currentColor == red) {
            e.target.style.color = grey;
        }
        if (currentColor == grey) {
            modal.classList.add("show");
            e.target.style.color = red;
        }
    }

    mealPoster.append(posterDisplay, generateBtn);
    mealInfo.append(mealName, likeBtn);
    card.append(mealPoster, mealInfo);

    return card;
}

function displayMeal(url) {
    getMeal(url).then((data) => {
        if (url == API_URL) {
            var meal = data.meals[0];
            mealsWrapper.appendChild(buildCard(meal, url));
        } else {
            var meals = data.meals;
            meals.forEach(meal => {
                mealsWrapper.append(buildCard(meal, url));
            });
        }
    });
}

function displayFav(id) {
    getMeal(ID_URL + id).then((res) => {
        var meal = res.meals[0];
        buildFav(meal);
    });
}

displayFav(API_URL);
displayMeal(API_URL);

searchInput.oninput = () => {
    var query = searchInput.value;
    const QUERY_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + query;
    mealsWrapper.innerHTML = "";
    displayMeal(QUERY_URL);
}

closeBtn.onclick = () => {
    modal.classList.remove('show');
}