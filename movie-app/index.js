const apiKey = '60bdc579-3b42-4708-abea-0b67e0e91fa6';
const apiUrlPopular = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';

// example
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

// отрисовку карточек фильмов переносим в js


const showMovies = (data) => {
    const movies = document.querySelector('.movies__container');
    data.films.forEach((movie) => {
        //у блока movies__container создаем div для каждого фильма
        const movieItem = document.createElement('div');
        movieItem.classList.add('movies__item');
        movieItem.innerHTML =
            `<div class="movie__cover-container">
                <img src=${movie.posterUrlPreview}
                     alt=${movie.nameRu} class="movie__cover">
                <div class="movie__cover-darkened"></div>
            </div>
            <div class="movie__title">${movie.nameRu}</div>
            <div class="movie__category">${movie.genres.map((genre) => ` ${genre.genre}`)}</div>
            <div class="movie__average movie__average--green">${movie.rating}</div>
        </div>`;

        movies.appendChild(movieItem);
    });
}
