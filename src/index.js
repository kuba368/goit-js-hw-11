import { createPhotoCardMarkup } from './js/createPhotoCardMarkup';
import { fetchPhotos } from './js/fetchPhotos';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
const { searchQuery } = searchForm;

const lightbox = new SimpleLightbox('.gallery a');

let page = 1;
let input = '';

searchForm.addEventListener('submit', async e => {
  e.preventDefault();
  input = searchQuery.value;
  page = 1;
  gallery.innerHTML = '';
  //   window.scroll(0, 0);
  const data = await fetchPhotos(input);
  if (data.hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  Notify.success(`Hooray! We found ${data.totalHits} images.`);
  data.hits.forEach(photo => {
    gallery.insertAdjacentHTML('afterend', createPhotoCardMarkup(photo));
  });
  lightbox.refresh();
});

//Load More Button
loadMoreButton.classList.add('is-hidden');

if (data.total > PHOTOS_PER_PAGE) {
  loadMoreButton.classList.remove('is-hidden');
}

loadMoreButton.addEventListener('click', async () => {
  page++;
  const data = await fetchPhotos(searchQuery.value, page);
  data.hits.forEach(photo => {
    gallery.insertAdjacentHTML('beforeend', createPhotoCardMarkup(photo));
  });
  lightbox.refresh();
  if (page * PHOTOS_PER_PAGE >= data.total) {
    loadMoreButton.classList.add('is-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
});
