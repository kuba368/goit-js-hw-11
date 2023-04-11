import { createPhotoCardMarkup } from './js/createPhotoCardMarkup';
import { fetchPhotos } from './js/fetchPhotos';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
const { searchQuery } = searchForm;

let lightbox = new SimpleLightbox('.gallery a');

let page = 1;
let input = '';
export const PHOTOS_PER_PAGE = 40;

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  page = 1;
  input = searchQuery.value;
  window.scroll(0, 0);
  const data = await fetchPhotos(input);
  gallery.innerHTML = '';
  if (data.hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  Notify.success(`Hooray! We found ${data.totalHits} images.`);
  data.hits.forEach(photo => {
    gallery.insertAdjacentHTML('beforeend', createPhotoCardMarkup(photo));
  });
  lightbox.refresh();
  if (data.totalHits > PHOTOS_PER_PAGE) {
    loadMoreButton.classList.remove('is-hidden');
  } else {
    loadMoreButton.classList.add('is-hidden');
  }
});

// //Load More Button
loadMoreButton.addEventListener('click', async () => {
  page += 1;
  const data = await fetchPhotos(searchQuery, page);
  data.hits.forEach(photo => {
    gallery.insertAdjacentHTML('beforeend', createPhotoCardMarkup(photo));
  });
  lightbox.refresh();
  if (data.hits.length === data.totalHits) {
    loadMoreButton.classList.add('is-hidden');
  }
});
