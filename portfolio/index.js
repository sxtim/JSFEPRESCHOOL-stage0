console.log(`\n PART#1`)
console.log(`
1. Вёрстка валидная + 10 \n
2. Семантика + 20 \n 
3. Верстка соответствует макету (погрешность до 10px) + 48 \n 
4. Требования к css - 12 \n 
5. Интерактивность, реализуемая через css + 20 \n
total: 100 / 100 \n`)

console.log(`\n PART#2`)

console.log(`
1. Вёрстка соответствует макету. Ширина экрана 768px +48 \n
2. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15 \n
3. На ширине экрана 768рх и меньше реализовано адаптивное меню +22 \n
- при ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка +2 \n   
- при нажатии на бургер-иконку справа плавно появляется адаптивное меню, бургер-иконка изменяется на крестик +4 \n
- высота адаптивного меню занимает всю высоту экрана. При ширине экрана 768-620рх вёрстка меню соответствует макету, когда экран становится уже, меню занимает всю ширину экрана +4 \n
- при нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку +4 \n
- бургер-иконка, которая при клике превращается в крестик, создана при помощи css-анимаций без использования изображений +2 \n
- ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям +2 \n
- при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, крестик превращается в бургер-иконку +4 \n
total: 75 / 75`)

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

