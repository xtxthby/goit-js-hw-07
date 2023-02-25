import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
galleryContainer.insertAdjacentHTML('beforeend', createGalleryItemsMarkup(galleryItems));
galleryContainer.addEventListener('click', onImgClick);
function createGalleryItemsMarkup(items) {
    return items.map(({ preview, original, description }) => {
        return `
            <div class="gallery__item">
                <a class="gallery__link" href="${original}">
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
                </a>
            </div>`;
    }).join('');
}

function onImgClick(e) {
    // забороняємо перезагрузку і загрузку зображення
    e.preventDefault();
    
    if (e.target.nodeName !== "IMG") return;
    const isItemImage = e.target.classList.contains('gallery__image');
    if (!isItemImage) return;
    const currentImgUrl = e.target.dataset.source;
    // підключаємо бібліотеку
    const instance = basicLightbox.create(
        `
		<img src="${currentImgUrl}" width="1280" height="auto"/>
        `,
        {
            onShow: (instance) => {
                window.addEventListener('keydown', onEscKeyPress);
            },
            onClose: (instance) => {
                window.removeEventListener('keydown', onEscKeyPress);
            },
        }
    );

    // підключаємо велике зображення
    instance.show()
    function onEscKeyPress(e) {
        const ESC_KEY_CODE = 'Escape';
        const isEscKey = e.code === ESC_KEY_CODE;
        if (!isEscKey) return;
        instance.close();
    }
}





// другий варіант
const instance = basicLightbox.create(
  `<img width="1280" height="auto" src="">`,
  {
    onShow: (instance) => {
      window.addEventListener('keydown', onEscKeyPress);
    },
    onClose: (instance) => {
      window.removeEventListener('keydown', onEscKeyPress);
    },
  }
);

function onImgClick(e) {
  e.preventDefault();

  const datasetSource = e.target.dataset.source;
  if (!datasetSource) return;
  instance.element().querySelector('img').src = datasetSource;
  instance.show();
}

function onEscKeyPress(e) {
  if (e.code !== 'Escape') return;
  instance.close();
}