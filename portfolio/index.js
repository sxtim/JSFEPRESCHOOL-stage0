// console.log(`\n PART#1`)
// console.log(`
// 1. Вёрстка валидная + 10 \n
// 2. Семантика + 20 \n
// 3. Верстка соответствует макету (погрешность до 10px) + 48 \n
// 4. Требования к css - 12 \n
// 5. Интерактивность, реализуемая через css + 20 \n
// total: 100 / 100 \n`)
//
// console.log(`\n PART#2`)
//
// console.log(`
// 1. Вёрстка соответствует макету. Ширина экрана 768px +48 \n
// 2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15 \n
// 3. На ширине экрана 768рх и меньше реализовано адаптивное меню +22 \n
// - при ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка +2 \n
// - при нажатии на бургер-иконку справа плавно появляется адаптивное меню, бургер-иконка изменяется на крестик +4 \n
// - высота адаптивного меню занимает всю высоту экрана. При ширине экрана 768-620рх вёрстка меню соответствует макету, когда экран становится уже, меню занимает всю ширину экрана +4 \n
// - при нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку +4 \n
// - бургер-иконка, которая при клике превращается в крестик, создана при помощи css-анимаций без использования изображений +2 \n
// - ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +2 \n
// - при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, крестик превращается в бургер-иконку +4 \n
// total: 75 / 75`)

console.log(`
1) Смена изображений в секции portfolio (+25)
  - при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием (+20)
  - кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными (+5)
2)  Перевод страницы на два языка (+25)
  - при клике по надписи ru англоязычная страница переводится на русский язык (+10)
  - при клике по надписи en русскоязычная страница переводится на английский язык (+10)
  - надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем (+5)
3) Переключение светлой и тёмной темы (+25)
  - На страницу добавлен переключатель при клике по которому:
    - тёмная тема приложения сменяется светлой (+10)
    - светлая тема приложения сменяется тёмной (+10)
    - после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и остаются видимыми (+5)
4) Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы (+5)
- Дополнительный функционал: сложные эффекты для кнопок при наведении и/или клике (+5)

Score: 75
`);

/*BURGER MENU*/
const iconBurger = document.querySelector('.header__menu-burger');
const headerMenu = document.querySelector('.header__menu');
const stripBurger = document.querySelectorAll('.strip');

if (iconBurger) {

    iconBurger.addEventListener("click", () => {
        iconBurger.classList.toggle('_active');
        console.log(theme);
        if (theme === 'white-theme') stripBurger.forEach(e => e.classList.toggle('_open'));
        headerMenu.classList.toggle('_active');
    });

    headerMenu.addEventListener("click", () => {
        iconBurger.classList.remove('_active');
        headerMenu.classList.remove('_active');
    });
}

/*PORTFOLIO BUTTONS*/
const seasons = ['winter', 'spring', 'summer', 'autumn'];

function preloadImages() {
    seasons.forEach((img) => {
        for (let i = 1; i <= 6; i++) {
            const image = new Image();
            image.src = `./assets/img/${img}/${i}.jpg`;
        }
    })
}

preloadImages();

const portfolioButtons = document.querySelectorAll('.portfolio-btn');
const portfolioImages = document.querySelectorAll('.portfolio__photo');


portfolioButtons.forEach((button) =>
    button.addEventListener('click', (event) => {
        //если событие происходит на кнопке portfolio-btn
        if (event.target.classList.contains('portfolio-btn')) {
            //кладем в переменную значение dataset-season при нажатии
            const portfolioSeason = event.target.dataset.season;
            portfolioImages.forEach((img, index) => {
                img.classList.add('_active');
                setTimeout(() => {
                    img.classList.remove('_active');
                    img.src = `./assets/img/${portfolioSeason}/${index + 1}.jpg`;
                }, 300);
            });
        }
        //сначала очищаем все кнопки от стиля active, затем его добавляем нажатой кнопке
        portfolioButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

    },));

/*TRANSLATE*/
import i18Obj from './assets/js/translate.js';

const btnSwitcher = document.querySelectorAll('.btn-switcher');


const getTranslate = (lang) => {
    const forTranslate = document.querySelectorAll('[data-lng]');
    forTranslate.forEach(elem => {
        elem.textContent = i18Obj[lang][elem.dataset.lng];
    });
}

btnSwitcher.forEach((btn) => btn.addEventListener('click', (event) => {
    if (event.target.classList.contains('eng')) {
        lang = 'en';
        getTranslate(lang);
        btnSwitcher.forEach(btn => btn.classList.remove('_active'));
    }
    if (event.target.classList.contains('ru')) {
        lang = 'ru';
        getTranslate(lang);
        btnSwitcher.forEach(btn => btn.classList.remove('_active'));
    }
    btn.classList.add('_active');
}));

/*WHITE THEME*/
const switcherTheme = document.querySelector('.theme__switcher');
const body = document.querySelector('body');
const sectionSkills = document.querySelector('.skills');
const sectionPrice = document.querySelector('.price');
const sectionTitle = document.querySelectorAll('.section-title');
const btnTransparent = document.querySelectorAll('.btn-transparent');
const menu = document.querySelector('.header__menu');
const elsSwitchTheme = [body, sectionSkills, sectionPrice, ...sectionTitle, ...btnTransparent, menu, switcherTheme];
let theme = 'dark';
switcherTheme.addEventListener('click', () => {
    switcherTheme.classList.toggle('white-theme');
    let themeTmp = (switcherTheme.classList.contains('white-theme')) ? 'white-theme' : 'dark';
    switchTheme(themeTmp);
});
const switchTheme = (themeTmp) => {
    if (themeTmp === 'white-theme') {
        elsSwitchTheme.forEach(e => e.classList.add('white-theme'));
        theme = 'white-theme';
    } else {
        elsSwitchTheme.forEach(e => e.classList.remove('white-theme'));
        theme = 'dark';
    }
};


/*LOCAL STORAGE*/
let lang = localStorage.getItem('lang');

function setLocalStorage() {
    localStorage.setItem('theme', theme);
    localStorage.setItem('lang', lang);
}

window.addEventListener('load', getLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('lang')) {
        const lg = localStorage.getItem('lang');
        getTranslate(lg);
    }
    if (localStorage.getItem('theme')) {
        const theme = localStorage.getItem('theme');
        switchTheme(theme);
    }
}

window.addEventListener('beforeunload', setLocalStorage);

/*VIDEO PLAYER*/
const video = document.querySelector('.player__video');
const playButton = document.querySelector('.video__player-button');
const playToggle = document.querySelector('.player__play-pause-icon');
const progressField = document.querySelector('.progress__filled');
const volumeToggle = document.querySelector('.player__volume-icon');
const volumeLevel = document.querySelector('.player__slider-volume');
const fullScreenButton = document.querySelector('.player__full-icon');
const currentVideoTime = document.querySelector('.player__time-elapsed');
const durationVideoTime = document.querySelector('.player__time-duration');

// play/pause
function togglePlayPause() {
    const toggle = video.paused ? 'play' : 'pause';
    video[toggle]();
}

playButton.addEventListener('click', togglePlayPause);
playToggle.addEventListener('click', togglePlayPause);

function changeIconPlay() {
    let iconSrc = video.paused ? './assets/svg/play.svg' : './assets/svg/pause.svg';
    playToggle.style.backgroundImage = `url(${iconSrc})`;
    playButton.classList.toggle('video__player-button');
}

video.addEventListener('play', changeIconPlay);
video.addEventListener('pause', changeIconPlay);

// video progress
function progressFieldUpdate() {
    const percent = (video.currentTime / video.duration) * 100;
    progressField.value = percent;
    progressField.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, transparent ${percent}%, transparent 100%)`;
}

video.addEventListener('timeupdate', progressFieldUpdate);

function scrub(e) {
    video.currentTime = (e.offsetX / progressField.offsetWidth) * video.duration;
}

progressField.addEventListener('click', scrub);

// volume progress level
let volumeCurrent =  volumeLevel.value
function volumeIconChange() {
    let iconSrc;
    if (video.volume === 0) {
        iconSrc = './assets/svg/volume.svg'
        volumeToggle.style.backgroundImage = `url(${iconSrc})`;
        video.volume = volumeCurrent;
        volumeLevel.value = volumeCurrent;
        const percent = volumeCurrent * 100;
        volumeLevel.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, transparent ${percent}%, transparent 100%)`;

    } else {
        iconSrc = './assets/svg/mute.svg'
        volumeToggle.style.backgroundImage = `url(${iconSrc})`;
        video.volume = 0;
        volumeLevel.value = 0;
        const percent = volumeCurrent;
        volumeLevel.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, transparent ${percent}%, transparent 100%)`;
    }
}

volumeToggle.addEventListener('click', volumeIconChange);

function volumeLevelUpdate() {
    const percent = volumeLevel.value * 100;
    volumeLevel.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${percent}%, transparent ${percent}%, transparent 100%)`;
     volumeCurrent = volumeLevel.value;
}

volumeLevel.addEventListener('input', volumeLevelUpdate)

function videoVolumeSet () {
    volumeLevelUpdate();
    let iconSrc;
    video.volume = volumeLevel.value;
    if (video.volume === 0) {
        iconSrc = './assets/svg/mute.svg';
        volumeToggle.style.backgroundImage = `url(${iconSrc})`;
    } else {
        iconSrc = './assets/svg/volume.svg';
        volumeToggle.style.backgroundImage = `url(${iconSrc})`;
    }
    volumeLevel.addEventListener('change', videoVolumeSet);
}

volumeLevel.addEventListener('input', videoVolumeSet);

fullScreenButton.addEventListener('click', () => {
    video.requestFullscreen();
});

// get time min:sec

function showTimeMinSec (time) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
    sec = sec > 9 ? sec : `0${sec}`;
    return `${min}:${sec}`;
}

// time for time counter

function getTimeProgressFieldUpdate () {
    currentVideoTime.textContent = `${showTimeMinSec(video.currentTime)} /`
    durationVideoTime.textContent = `${showTimeMinSec(video.duration)}`
}

video.addEventListener('timeupdate', getTimeProgressFieldUpdate);
// video.addEventListener('canplay', getTimeProgressFieldUpdate);












