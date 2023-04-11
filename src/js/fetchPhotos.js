import axios from 'axios';
import { Notify } from 'notiflix';
import { PHOTOS_PER_PAGE } from '../index';

const fetchPhotos = async (name, page = 1) => {
  const API_KEY = '35276142-2bb78ec39400a28f997862a5f';
  try {
    const request = await axios.get(
      `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&q=${name}&page=${page}&per_page=${PHOTOS_PER_PAGE}`
    );
    return request.data;
  } catch (error) {
    Notify.failure('ERROR', error);
  }
};

export { fetchPhotos };
