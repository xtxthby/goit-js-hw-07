import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');

galleryContainer.insertAdjacentHTML('beforeend', createGalleryItemsMarkup(galleryItems));

function createGalleryItemsMarkup(items) {
  return items.map(({ preview, original, description }) => {
    return `<li>
  <a class="gallery__item" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    />
  </a>
</li>`
  }).join('');
}


const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', captionPosition: 'bottom', captionDelay: 250
});


