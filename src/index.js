import './sass/main.scss';


// 1 Создание и рендер разметки по массиву данных и предоставленному шаблону.
// 2 Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// 3 Открытие модального окна по клику на элементе галереи.
// 4 Подмена значения атрибута src элемента img.lightbox__image.
// 5 Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// 6 Очистка значения атрибута src элемента img.lightbox__image.
// Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
// import './gallery-items'



import galleryItems from "./gallery-items.js";



const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.lightbox')
const lightboxButton = document.querySelector('.lightbox__button');
const ligthboxImage = document.querySelector('.lightbox__image');


const createImg = elImg => {
    const imgItem = document.createElement('img');
    imgItem.classList.add('gallery__image');
    imgItem.src = elImg.preview;
    imgItem.alt = elImg.description;
    imgItem.setAttribute('data-source', elImg.original);


    
    return imgItem;
 
}

const createLink = elImg => {
    const linkItem = document.createElement('a');
    linkItem.classList.add('gallery__link');
    linkItem.href = elImg.original;
    linkItem.append(createImg(elImg));
    return linkItem;
}

const createList = elImg => {
    const listItem = document.createElement('li');
    listItem.classList.add('gallery__list');
    listItem.append(createLink(elImg));
    return listItem;
}

const listsEl = galleryItems.map(img => createList(img));
galleryRef.append(...listsEl);

galleryRef.addEventListener('click', onImgClick);
function onImgClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    const getLink = event.target.dataset.source;
    ligthboxImage.src = getLink;
    lightboxRef.classList.add('is-open');
}

lightboxButton.addEventListener('click', onBtnClick);
function onBtnClick(event) {
    event.preventDefault();
    if (!event.target.nodeName === 'BUTTON') {
        return;
    }
    ligthboxImage.src = '';
    lightboxRef.classList.remove('is-open');
}