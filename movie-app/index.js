const apiKey = '60bdc579-3b42-4708-abea-0b67e0e91fa6';
const apiUrlPopular = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const apiSearch = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword='

// example api kinopoisk
//
// fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/301', {
//     method: 'GET',
//     headers: {
//         'X-API-KEY': '60bdc579-3b42-4708-abea-0b67e0e91fa6',
//         'Content-Type': 'application/json',
//     },
// })
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.log(err))


// авторизация с помощью header

getMovies(apiUrlPopular);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey,
        },
    });
    //получаем данные с фильмами в json
    const respData = await resp.json();
    // console.log(respData);
    showMovies(respData);
}

//получаем цвет рейтинга
function getColorClassByRate(rate) {
    if (rate >= 7) {
        return 'green';
    }
    if (rate > 5) {
        return 'orange';
    } else return 'red';
}

//если нет названия на англ, получаем на ру
function changeFilmName(nameEn, nameRu) {
    return !nameEn ? nameRu : nameEn;
}

// отрисовку карточек фильмов переносим в js
const showMovies = (data) => {
    const movies = document.querySelector('.movies__container');

    //очищаем страницу
    document.querySelector('.movies__container').innerHTML = '';

    // у блока movies__container создаем div для каждого фильма
    data.films.forEach((movie) => {
        //TODO
        let movieId = movie.filmId;


        //обработка null в рейтинге
        if (movie.rating === 'null') {
            movie.rating = 'n/a';
        }
        //обработка некорректно отображаемых рейтингов
        if (movie.rating.includes('%')) {
            movie.rating = movie.rating.slice(0, 2) / 10 ;
        }

        const movieItem = document.createElement('div');
        movieItem.classList.add('movies__item');
        movieItem.innerHTML =
            `<div class="movie__cover-container">
                <img src=${movie.posterUrlPreview}
                     alt=${movie.nameEn} class="movie__cover">
                <div class="movie__cover-darkened"></div>
            </div>
            <div class="movie__title">${changeFilmName(movie.nameEn, movie.nameRu)}</div>
            <div class="movie__category">${movie.genres.map((genre) => ` ${genre.genre}`)}</div>
            <div class="movie__average movie__average--${getColorClassByRate(movie.rating)}">${movie.rating}</div>
             <div class="overview"><h3>Overview</h3>
             ${movie.description}
             </div>`;

        movies.appendChild(movieItem);
    });
}
// search
const form = document.querySelector('form');
const search = document.querySelector('.search');

form.addEventListener('submit', (e) => {
    e.preventDefault(); //отменяем перезагрузку страницы при sabmit

    const searchUrl = `${apiSearch}${search.value}`

    if (search.value) {
        getMovies(searchUrl);

        // search.value = '';
    }
})

