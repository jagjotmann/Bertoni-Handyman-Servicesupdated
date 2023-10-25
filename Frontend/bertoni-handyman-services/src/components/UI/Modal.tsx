// @ts-nocheck
import ReactDOM from "react-dom";

const Backdrop = (props: any) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-10 bg-black/50"
      onClick={props.onConfirm}
    ></div>
  );
};

const ModalOverlay = (props: any) => {
  return (
    <div className="p-2 md:p-8 bg-white text-black fixed left-1/2 -translate-x-1/2 top-[30vh] z-50 text-center items-center justify-center w-fit">
      {props.title && <h2 className="p-4 m-0 font-bold">{props.title}</h2>}
      <div className="p-4 text-md md:text-xl font">
        <p>{props.content}</p>
      </div>
      <div className="p-4 flex justify-center">
        <button
          className="px-5 py-1 font-medium border border-black bg-[#FEA33F] hover:bg-neutral duration-150"
          onClick={props.onConfirm}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const Modal = (props: any) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onConfirm={props.onConfirm}
          title={props.title}
          content={props.content}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default Modal;

interface ModalContentProps {
  title?: string;
  content?: string;
}
