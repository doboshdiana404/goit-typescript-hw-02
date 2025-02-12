import { useEffect, useState } from 'react';
import './App.css';
import Loader from './Loader/Loader';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import SearchBar from './SearchBar/SearchBar';
import axios from 'axios';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import toast from 'react-hot-toast';
import Modal from 'react-modal';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageModal from './ImageModal/ImageModal';
interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
    full: string;
  };
  alt_description: string;
}
const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('a');
  const [hasMoreImages, setHasMoreImages] = useState<boolean>(true);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  useEffect(() => {
    Modal.setAppElement('#main');
    const getImagesData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const { data } = await axios.get<{ results: Image[] }>(
          `https://api.unsplash.com/search/photos/`,
          {
            params: {
              client_id: 'Obna1WBwp1SDj6lvGR0_Gd0rY0FsIK36ErvU71PqR1g',
              query: query,
              page: page,
              per_page: 12,
            },
          }
        );
        if (data.results.length === 0) {
          toast('No results found for this search term! Try again', {
            icon: '⚠️',
          });
        }
        if (data.results.length < 12) {
          setHasMoreImages(false);
        }
        if (page === 1) {
          setImages(data.results);
        } else {
          setImages(prev => [...prev, ...data.results]);
        }
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (hasMoreImages) {
      getImagesData();
    }
  }, [page, query, hasMoreImages]);
  const handleChangePage = () => {
    if (hasMoreImages) {
      setPage(prev => prev + 1);
    }
  };
  const handleChangeQuery = (newQuery: string) => {
    if (newQuery === query) {
      return;
    }

    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setHasMoreImages(true);
  };
  const openModal = (id: string) => {
    setSelectedImageId(id);
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    setSelectedImageId(null);
    document.body.style.overflow = 'auto';
  };
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImageId === null) return;

      const currentIndex = images.findIndex(img => img.id === selectedImageId);
      if (currentIndex === -1) {
        setSelectedImageId(null);
        return;
      }
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
        setSelectedImageId(images[currentIndex + 1]?.id || null);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setSelectedImageId(images[currentIndex - 1]?.id || null);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedImageId]);

  return (
    <div id="main">
      <SearchBar onSearch={handleChangeQuery} />
      <ImageGallery images={images} openModal={openModal} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {hasMoreImages && <LoadMoreBtn handleChangePage={handleChangePage} />}
      {selectedImageId && (
        <ImageModal
          images={images}
          closeModal={closeModal}
          selectedImageId={selectedImageId}
        />
      )}
    </div>
  );
};

export default App;
