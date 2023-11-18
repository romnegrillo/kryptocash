import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_GIPHY_API;
const DEFAUL_GIF_URL =
  'https://media0.giphy.com/media/kjtYLgRn9DC4nenpBM/giphy.gif?cid=ecf05e473dsqbtut1z61aejvyzrxhz5jvc7zat4ywwbqoei9&ep=v1_gifs_search&rid=giphy.gif&ct=g';

const useFetch = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState('');

  const fetchGifs = async () => {
    try {
      const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword
        .split(' ')
        .join()}&limit=1`;

      const response = await fetch(endpoint);
      const { data } = await response.json();

      setGifUrl(data[0]?.images?.downsized_medium?.url);
    } catch (error) {
      setGifUrl(DEFAUL_GIF_URL);
    }
  };

  useEffect(() => {
    if (keyword) {
      fetchGifs(keyword);
    } else {
      setGifUrl(DEFAUL_GIF_URL);
    }
  }, []);

  return gifUrl;
};

export default useFetch;
