import { doc, updateDoc } from "firebase/firestore";
import React, { FC } from "react";
import { db } from "../../config/firebase";
import { Comments } from "../../models/comment";
import reactionGif from "../../shared/reactionGif";
import useStore from "../../zustand";

interface ReactionEmojiProps {
  comment: Comments;
}

const ReactionEmoji: FC<ReactionEmojiProps> = ({ comment }) => {
  const { currentUser } = useStore();

  const handleReaction = (reaction: { name: string; image: string }) => {
    if (!currentUser) return;

    const exist = comment.reactions.find(
      (item) => item.userId === currentUser.uid
    );

    const ref = doc(db, `/comments/${comment.id}`);

    if (!exist) {
      const newReaction = [
        ...comment.reactions,
        { userId: currentUser.uid, name: reaction.name },
      ];
      updateDoc(ref, { reactions: newReaction });
    } else {
      if (exist.name === reaction.name) {
        const newReaction = comment.reactions.filter(
          (item) => item?.userId !== exist?.userId
        );
        updateDoc(ref, { reactions: newReaction });
      } else {
        const newReaction = comment.reactions.map((item) => {
          if (item?.userId === currentUser.uid) {
            return {
              userId: currentUser.uid,
              name: reaction.name,
            };
          }
          return item;
        });
        updateDoc(ref, { reactions: newReaction });
      }
    }
  };

  return (
    <div className="flex items-center justify-between p-2 rounded-full bg-primary-200">
      {reactionGif.map((item) => (
        <div
          onClick={() => handleReaction(item)}
          className="w-8 h-8 mx-1"
          key={item.name}
        >
          <img className="emoji" src={item.image} alt={item.name} />
        </div>
      ))}
    </div>
  );
};

export default ReactionEmoji;
