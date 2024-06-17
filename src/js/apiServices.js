import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';
const API_KEY = '36553389-14e37cfcb06dd9cf4a118403b';

const imagesApi = axios.create({ baseURL });

const getImagesBySearch = async (search, page = 1, perPage = 40) => {
  const { data } = await imagesApi(`?key=${ API_KEY }&q=${ search }&page=${ page }&per_page=${ perPage }&image_type=photo&orientation=horizontal&safesearch=true`);
  return data;
};

export {
  getImagesBySearch,
};