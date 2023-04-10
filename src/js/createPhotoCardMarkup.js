const createPhotoCardMarkup = ({
  webFormatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  return `<div class="photo-card">
  <a href=${largeImageURL}><img src="${webFormatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <p>${likes}</p>
    </p>
    <p class="info-item">
      <b>Views</b>
      <p>${views}</p>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <p>${comments}</p>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <p>${downloads}</p>
    </p>
  </div>
</div>`;
};

export { createPhotoCardMarkup };
