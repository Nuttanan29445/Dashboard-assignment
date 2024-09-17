import ReactDOM from "react-dom";
import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-gray-300 opacity-80"
      ></div>
      <div className="relative p-10 bg-white rounded-lg max-w-4xl flex gap-8">
        <button
          onClick={onClose}
          className="absolute top-1 right-1 p-2 text-gray-500 hover:text-gray-700"
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>,
    document.querySelector(".modal-container") as Element
  );
};

export default Modal;
