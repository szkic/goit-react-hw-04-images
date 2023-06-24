import { fetchPhotosWithQuery } from './services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { useEffect, useState } from 'react';

export const App = () => {
  const [photos, setPhotos] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState('');

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        setIsLoading(true);

        const photosSearch = await fetchPhotosWithQuery(searchValue, page);

        const searchedPhotos = photosSearch.map(photo => {
          return {
            id: photo.id,
            webformatURL: photo.webformatURL,
            largeImageURL: photo.largeImageURL,
            tags: photo.tags,
          };
        });

        searchValue !== '' && setPhotos(p => [...p, ...searchedPhotos]);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    asyncFunc();
  }, [searchValue, page]);

  const searchResult = e => {
    setPhotos([]);
    setPage(1);
    setSearchValue(e);
  };

  const handleModal = imageAddress => setModal(imageAddress);

  const handleButtonVisibility = () => {
    if (photos.length < 12) return 'none';
  };

  const loadMore = () => {
    setPage(p => p + 1);

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  };

  const modalHandle = e => {
    setModal(e);
  };

  return (
    <>
      <Searchbar onSubmit={searchResult} />
      <ImageGallery photos={photos} imageAddress={handleModal} />
      {isLoading && <Loader />}
      <div
        className="ButtonContainer"
        style={{ display: handleButtonVisibility() }}
      >
        {!isLoading && <Button onClick={loadMore} />}
      </div>
      {modal !== '' && <Modal imageAddress={modal} onClick={modalHandle} />}
    </>
  );
};
