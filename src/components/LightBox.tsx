import React, { FC } from "react";

interface LightBoxProps {
  src: string;
  handleClose: () => void;
}

const LightBox: FC<LightBoxProps> = ({ src, handleClose }) => {
  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm opacity-100 z-[9999] transition flex items-center justify-center"
    >
      <div
        className="w-[400px] max-w-[calc(100%-32px)] aspect-auto rounded-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img className="object-cover" src={src} />
      </div>
    </div>
  );
};

export default LightBox;
