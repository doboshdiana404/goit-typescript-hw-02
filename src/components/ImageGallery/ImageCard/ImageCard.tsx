import s from '../ImageGallery.module.css';
import { FaMagnifyingGlassPlus } from 'react-icons/fa6';
interface Image {
  id: string;
  urls: {
    small: string;
  };
  alt_description?: string;
}

interface ImageCardProps {
  item: Image;
  openModal: (id: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ item, openModal }) => {
  return (
    <div className={s['imageContainer']}>
      <img
        src={item.urls.small}
        alt={item.alt_description}
        width={360}
        height={240}
        onClick={() => openModal(item.id)}
        loading="lazy"
      />
      <div className={s['magnifying-glass']}>
        <FaMagnifyingGlassPlus />
      </div>
    </div>
  );
};
export default ImageCard;
