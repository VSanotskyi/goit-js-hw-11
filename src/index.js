import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { getImagesBySearch } from './js/apiServices';
import { markupImages } from './js/markupImages';

const formEl = document.querySelector('.search-form');
const inputFormEl = formEl.querySelector('input');
const galleryEl = document.querySelector('.js-gallery');
const btnLoadMoreEl = document.querySelector('.js-btn-load-more');

let search = '';
let page = 1;
const perPage = 40;

const getAllImages = async (search, page, perPage) => {
  try {
    const { hits, totalHits } = await getImagesBySearch(search, page, perPage);

    Notify.success('Successfully');

    if (hits.length > 0) {
      galleryEl.insertAdjacentHTML('beforeend', markupImages(hits));
      const gallery = new SimpleLightbox('.gallery a', {}).refresh();
    } else {
      galleryEl.insertAdjacentHTML('beforeend', '<p>Not found</p>');
    }

    if (page * perPage < totalHits) {
      btnLoadMoreEl.style.display = 'block';
    } else {
      btnLoadMoreEl.style.display = 'none';
    }
  } catch (e) {
    Notify.failure(e.message);
  }
};

const handleSubmit = (e) => {
  e.preventDefault();

  galleryEl.innerHTML = '';

  if (search === '') {
    btnLoadMoreEl.style.display = 'none';
    galleryEl.insertAdjacentHTML('beforeend', '<p>Enter what you are looking</p>');
    return;
  }
  getAllImages(search, page, perPage);
};

const handleChange = (e) => {
  search = e.target.value;
};

const handleLoadMore = async () => {
  page += 1;

  if (search === '') {
    return;
  }

  getAllImages(search, page, perPage);
};

formEl.addEventListener('submit', handleSubmit);
inputFormEl.addEventListener('input', handleChange);
btnLoadMoreEl.addEventListener('click', handleLoadMore);
