import Modal from 'react-modal';
import s from '../ImageGallery/ImageGallery.module.css';

interface Imagemodal {
  id: string;
  urls: {
    full: string;
  };
  alt_description?: string;
  user?: {
    name: string;
  };
}

interface ImageModalProps {
  closeModal: () => void;
  images: Imagemodal[];
  selectedImageId: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({
  images,
  closeModal,
  selectedImageId,
}) => {
  const selectedImage = images.find(item => item.id === selectedImageId);

  return (
    <>
      {selectedImage && (
        <Modal
          isOpen={Boolean(selectedImageId)}
          onRequestClose={closeModal}
          contentLabel="Image Modal"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              animation: 'fadeIn 0.3s ease-in-out',
            },
            content: {
              backgroundColor: 'white',
              inset: '0',
              position: 'relative',
              padding: '0',
              border: 'none',
              background: 'none',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <img
            src={selectedImage.urls.full}
            alt="Modal Content"
            width={1125}
            height={620}
            loading="lazy"
          />
          {selectedImage.alt_description && (
            <div className={s.descriptionModal}>
              <p className={s.modalDescription}>
                {selectedImage.alt_description}
              </p>
              {selectedImage.user?.name && <p>{selectedImage.user.name}</p>}{' '}
            </div>
          )}
        </Modal>
      )}
    </>
  );
};
export default ImageModal;
