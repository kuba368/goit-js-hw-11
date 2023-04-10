import axios from 'axios';
import { Notify } from 'notiflix';

const API_KEY = '35276142-2bb78ec39400a28f997862a5f';
const PHOTOS_PER_PAGE = 40;

const fetchPhotos = async (name, page = 1) => {
  const URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&q=${name}&page=${page}&per_page=${PHOTOS_PER_PAGE}`;
  try {
    const request = await axios.get(URL);
    return request.data;
  } catch (error) {
    Notify.failure('ERROR', error);
  }
};

export { fetchPhotos };
