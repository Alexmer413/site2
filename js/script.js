"use strict"

const burger = document.querySelector('.burger');
const nav = document.querySelector('.header__nav');
if (burger) {
    burger.addEventListener("click", function (e) {
        burger.classList.toggle('_active');
        nav.classList.toggle('_active');
        document.body.classList.toggle('_lock');
    });
}

const navLinks = document.querySelectorAll('.nav__link[data-goto]');
console.log(navLinks);
if (navLinks.length > 0) {
    navLinks.forEach(navLink => {
        navLink.addEventListener("click", onMemuLinkClick);
    });
    function onMemuLinkClick(e) {
        
        const navLink = e.target; 
        if (navLink.dataset.goto && document.querySelector(navLink.dataset.goto)) {
            const gotoBlock = document.querySelector(navLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

            if (burger.classList.contains('_active')) {
                burger.classList.remove('_active');
                nav.classList.remove('_active');
                document.body.classList.remove('_lock');
                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "auto"
                });
            }

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            
            e.preventDefault();
        }
    }
}


/*----Fancybox----*/

Fancybox.bind('[data-fancybox="gallery"]', {
    hideScrollbar: false,
    //closeButton: true,
    //loop: false,

    Toolbar: {
        display: {
            left: [],
            middle: [],
            right: ['close'],
        },
    },

    Thumbs: false,
});

Fancybox.bind('[data-fancybox="single"]', {
    groupAttr: false,
    hideScrollbar: false,
});



/*========LOCK_PADDING========*/

const fancyLinks = document.querySelectorAll('.fancy-link');
const body = document.querySelector('body');

const lockPadding = document.querySelectorAll('.lock-padding');//добавляем этот класс общему объекту body и к фиксированным объектам, так как они к body не привязаны, и будут сдвигаться

let unlock = true;
const timeOut = 800;

if (fancyLinks.length > 0) {
    for (let index = 0; index < fancyLinks.length; index++) {
        const fancyLink = fancyLinks[index];
        fancyLink.addEventListener("click", function (e) {

            bodyLock();
            // e.preventDefault(); //запрещает ссылке перезагружать страницу
        });                     
    }
}


const fancyCloseIcon = document.querySelectorAll('.close__fancy');
if (fancyCloseIcon.length > 0) {

    for (let index = 0; index < fancyCloseIcon.length; index++) {
        const el = fancyCloseIcon[index];
        el.addEventListener('click', function (e) {

            bodyUnLock();
            // e.preventDefault();
        });
    }
}


function fancyClose(fancyActive, doUnlock = true) {
    if (unlock) {
        fancyActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeOut);
}

function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
   
    }, timeOut); 

    unlock = false; //блокируем возможность повторного открытия окна пока окно закрывается
    setTimeout(function () {
        unlock = true;
    }, timeOut);
}

