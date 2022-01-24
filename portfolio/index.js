console.log('1. Вёрстка валидная - 10\n' +
    '2. Семантика - 20\n' +
    '3. Верстка соответствует макету (погрешность до 10px) - 48\n' +
    '4. Требования к css - 12\n' +
    '5. Интерактивность, реализуемая через css - 20')

const iconBurger = document.querySelector('.header__menu-burger');
const headerMenu = document.querySelector('.header__menu');
const menu = document.querySelector('.nav__list');
if (iconBurger) {

    iconBurger.addEventListener("click", function (e) {
        iconBurger.classList.toggle('_active');
        headerMenu.classList.toggle('_active');
    });

    headerMenu.addEventListener("click", function (e) {
        iconBurger.classList.remove('_active');
        headerMenu.classList.remove('_active');
    });
}

