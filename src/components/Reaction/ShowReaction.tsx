import React, { FC, useEffect, useState } from "react";
import { reactionImg } from "../../shared/reactionGif";

interface ShowReactionProps {
  reactions: any[];
}

const ShowReaction: FC<ShowReactionProps> = ({ reactions }) => {
  const [filter, setFilter] = useState<any[]>([]);

  useEffect(() => {
    const arrayTmp: any[] = [];
    reactions.forEach((item) => {
      if (!arrayTmp.includes(item.name)) {
        arrayTmp.push(item.name);
      }
    });

    setFilter(arrayTmp);
  }, [reactions]);

  const renderEmoji = (name: string) => {
    if (name === "like") {
      return reactionImg.like;
    } else if (name === "love") {
      return reactionImg.love;
    } else if (name === "angry") {
      return reactionImg.angry;
    } else if (name === "care") {
      return reactionImg.care;
    } else if (name === "haha") {
      return reactionImg.haha;
    } else if (name === "sad") {
      return reactionImg.sad;
    } else if (name === "wow") {
      return reactionImg.wow;
    }
  };

  return (
    <div className="absolute bottom-[-5px] right-0 bg-primary-300 rounded-full py-1 px-2 flex items-center">
      {filter.map((item) => (
        <div key={item} className="text-text-color flex items-center">
          <div className="w-4 h-4 mx-1">
            <img src={renderEmoji(item)} alt={item} />
          </div>
          <span className="ml-1 text-sm">{reactions.length}</span>
        </div>
      ))}
    </div>
  );
};

export default ShowReaction;
