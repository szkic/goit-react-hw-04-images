import { useEffect, useState } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ imageAddress, onClick }) => {
  const [imageSource, setImageSource] = useState(imageAddress);

  const modalClose = e => {
    if (e.key === 'Escape' || e.type === 'click') {
      setImageSource('');
      onClick('');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', modalClose, false);

    return () => {
      document.removeEventListener('keydown', modalClose, false);
    };
  });

  return (
    <div className={css.Overlay} onClick={modalClose}>
      <div className={css.Modal}>
        <img src={imageSource} alt="modal" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageAddress: PropTypes.string,
  modalClose: PropTypes.func,
};
