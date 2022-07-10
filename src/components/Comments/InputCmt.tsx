import React, { FC, useEffect, useId, useState } from "react";
import useStore from "../../zustand";
import { AiOutlineSend } from "react-icons/ai";
import { BsImageFill } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import { uploadImg } from "../../shared/upload";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Comments } from "../../models/comment";
import { toast } from "react-toastify";

interface InputCmtProps {
  comment?: Comments;
  handleClose?: () => void;
  placehoder?: string;
}

const InputCmt: FC<InputCmtProps> = ({ comment, handleClose, placehoder }) => {
  const { currentUser } = useStore();
  const id = useId();

  const [file, setFile] = useState<any>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    return () => {
      file && URL.revokeObjectURL(file.preview);
    };
  }, [file]);

  const handleClearFile = () => {
    setFile(null);
  };

  const handleOnChangeFile = (e: any) => {
    const file = e.target.files[0];
    const type = ["image/png", "image/jpeg", "image/gif"];

    if (!file) return;

    if (!type.includes(file.type)) {
      return toast.error("Chỉ chấp nhận file hình ảnh!");
    }

    if (file.size / 1000000 > 10) {
      return toast.error("File của bạn không được vượt quá 10mb!");
    }

    file.preview = URL.createObjectURL(file);
    setFile(file);
  };

  const handlePostComment = async (e: any) => {
    e.preventDefault();
    const slug = `/${router.query?.slug}`;

    if (!currentUser) return;

    if (!text.trim()) {
      return;
    }

    let url = null;

    if (file) {
      setLoading(true);
      url = await uploadImg(file);
      setLoading(false);
    }

    const newComment = {
      href: slug,
      responseTo: comment?.id || null,
      content: text,
      image: url,
      displayName: currentUser.displayName,
      avatar: currentUser.photoURL,
      createdAt: Date.now(),
      reactions: [],
      uid: currentUser.uid,
    };

    addDoc(collection(db, "comments"), newComment);

    setFile(null);
    setText("");
    if (handleClose) {
      handleClose();
    }
  };

  return (
    <form onSubmit={handlePostComment} className="mt-4">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img src={currentUser.photoURL} alt={currentUser.displayName} />
        </div>
        <div className="flex-1 ml-3 relative flex items-center">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`${placehoder || "Viết bình luận công khai..."}`}
            className="bg-primary-300 py-1 pl-4 pr-[80px] w-full rounded-full text-text-color flex-1"
          />
          <button className="absolute right-[10px] top-[50%] translate-y-[-50%]">
            {loading ? (
              <div className="loader"></div>
            ) : (
              <AiOutlineSend className="w-6 h-6 text-text-color" />
            )}
          </button>
          <label
            htmlFor={id}
            className="absolute right-[50px] top-[50%] translate-y-[-50%] cursor-pointer"
          >
            <BsImageFill className="w-6 h-6 text-text-color" />
            <input
              onChange={(e) => handleOnChangeFile(e)}
              type="file"
              id={id}
              hidden
            />
          </label>
        </div>
      </div>

      {file?.preview && (
        <div className="flex items-center justify-between mt-4">
          <img
            src={file.preview}
            className="w-[100px] aspect-auto rounded-md"
          />
          <button
            onClick={handleClearFile}
            className="bg-primary-300 w-8 h-8 rounded-full overflow-hidden flex items-center justify-center"
          >
            <FaTimes className="w-6 h-6 text-text-color" />
          </button>
        </div>
      )}
    </form>
  );
};

export default InputCmt;
