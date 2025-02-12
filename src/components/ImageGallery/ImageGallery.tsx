import ImageCard from './ImageCard/ImageCard';
import s from './ImageGallery.module.css';
interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string;
}

interface ImageGalleryProps {
  images: Image[];
  openModal: (id: string) => void;
}
const ImageGallery: React.FC<ImageGalleryProps> = ({ images, openModal }) => {
  return (
    <ul className={s.list}>
      {images.map(item => (
        <li key={item.id}>
          <ImageCard item={item} openModal={openModal} />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;
