import gallery from '../gallery-items.js';

let currentIndex = 0;

const lightboxImage = document.querySelector('.lightbox__image');
const lightBoxRef = document.querySelector('.lightbox');

const closeLightboxButtonRef = document.querySelector(
  'button[data-action="close-lightbox"]',
);

const lightBoxOverlayRef = document.querySelector('div.lightbox__overlay');

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

closeLightboxButtonRef.addEventListener('click', lightboxImageClose);

lightBoxOverlayRef.addEventListener('click', lightboxImageClose);

function onGalleryContainerClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  lightBoxRef.classList.add('is-open');

  setLightboxImage(evt.target.dataset.source, evt.target.alt);
  // lightboxImage.src = evt.target.dataset.source;
  // lightboxImage.alt = evt.target.alt;

  currentIndex = Number(evt.target.dataset.index);

  window.addEventListener('keydown', onKeyDown);
}

function lightboxImageClose() {
  lightBoxRef.classList.remove('is-open');
  lightboxImage.src = '';
  lightboxImage.alt = '';
  window.removeEventListener('keydown', onKeyDown);
}

function onKeyDown(evt) {
  if (evt.key === 'Escape') {
    lightboxImageClose(evt);
    return;
  }

  if (evt.key === 'ArrowRight') {
    showNextImage();
    return;
  }

  if (evt.key === 'ArrowLeft') {
    showPreviousImage();
    return;
  }
}

function setLightboxImage(currentSource, currentAlt) {
  lightboxImage.src = currentSource;
  lightboxImage.alt = currentAlt;
}

function showNextImage() {
  if (currentIndex === gallery.length - 1) {
    currentIndex = 0;
  }
  currentIndex += 1;

  setLightboxImage(
    gallery[currentIndex].original,
    gallery[currentIndex].description,
  );
  // lightboxImage.src = gallery[currentIndex].original;
  // lightboxImage.alt = gallery[currentIndex].description;
}

function showPreviousImage() {
  if (currentIndex === 0) {
    currentIndex = gallery.length - 1;
  }
  currentIndex -= 1;

  setLightboxImage(
    gallery[currentIndex].original,
    gallery[currentIndex].description,
  );

  // lightboxImage.src = gallery[currentIndex].original;
  // lightboxImage.alt = gallery[currentIndex].description;
}
