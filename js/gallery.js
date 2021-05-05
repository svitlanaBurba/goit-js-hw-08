import gallery from '../gallery-items.js';

let currentIndex = 0;

const lightboxImage = document.querySelector('.lightbox__image');
const refLightBox = document.querySelector('.lightbox');

const refCloseLightboxButton = document.querySelector(
  'button[data-action="close-lightbox"]',
);

const refLightBoxOverlay = document.querySelector('div.lightbox__overlay');

const galleryContainer = document.querySelector('.js-gallery');
const galleryMarkup = createGalleryItems(gallery);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryItems(gallery) {
  return gallery
    .map(({ preview, original, description }, i) => {
      return `<li class="gallery__item">
<a
  class="gallery__link"
  href="${original}"
>
  <img
    class="gallery__image"
    data-index=${i}
    src="${preview}"
    data-source="${original}"
    alt="${description}"
  />
</a>
</li>`;
    })
    .join('');
}

galleryContainer.addEventListener('click', onGalleryContainerClick);

refCloseLightboxButton.addEventListener('click', lightboxImageClose);

refLightBoxOverlay.addEventListener('click', lightboxImageClose);

function onGalleryContainerClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  refLightBox.classList.add('is-open');
  lightboxImage.src = evt.target.dataset.source;
  lightboxImage.alt = evt.target.alt;

  currentIndex = Number(evt.target.dataset.index);

  window.addEventListener('keydown', onKeyDown);
}

function lightboxImageClose() {
  refLightBox.classList.remove('is-open');
  lightboxImage.src = '';
  lightboxImage.alt = '';
  window.removeEventListener('keydown', onKeyDown);
}

function onKeyDown(evt) {
  if (evt.key === 'Escape') {
    lightboxImageClose(evt);
  }

  if (evt.key === 'ArrowRight') {
    showNextImage();
  }

  if (evt.key === 'ArrowLeft') {
    showPreviousImage();
  }
}

function showNextImage() {
  if (currentIndex === gallery.length - 1) {
    currentIndex = 0;
  }
  currentIndex += 1;

  lightboxImage.src = gallery[currentIndex].original;
  lightboxImage.alt = gallery[currentIndex].description;
}

function showPreviousImage() {
  if (currentIndex === 0) {
    currentIndex = gallery.length - 1;
  }
  currentIndex -= 1;
  lightboxImage.src = gallery[currentIndex].original;
  lightboxImage.alt = gallery[currentIndex].description;
}
