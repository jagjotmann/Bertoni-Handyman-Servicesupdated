import React from 'react';
import {renderToString} from 'react-dom/server';
import Modal from 'react-modal'
import QuotePreview from '../QuotePreview';
import {Quote} from '../../../../../Backend/src/models/quoteModel'

interface QuotePreviewModalProps {
  quote: Quote;
  isOpen: boolean;
  onRequestClose: () => void;
  children?: React.ReactNode;
}


const QuotePreviewModal: React.FC<QuotePreviewModalProps> = ({ quote, isOpen, onRequestClose, children }) => {
  let htmlContent: string = renderToString(<QuotePreview quote={quote}/>);
  console.log("QuotePreviewModal htmlContent:" + htmlContent)
  const [modalIsOpen, setModalIsOpen] = React.useState(isOpen);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div>
      <button onClick={openModal}>Preview Quote</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        <button onClick={closeModal}>close</button>
      </Modal>
      {children}
    </div>
  );
};
//<Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Quote Preview">
       //<div dangerouslySetInnerHTML={{ __html: htmlContent }} /> {/*Talk to Sean about XSS safety w/ this?*/}
        //<button onClick={onRequestClose}>Close</button>
      //</Modal>


export default QuotePreviewModal;
