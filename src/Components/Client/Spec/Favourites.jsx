import { useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const Favourites = () => {
  const [added, setAdded] = useState(false);

  return (
    <div className="custom-favourite position-absolute left-1 bottom-2 cursor-pointer border-radius-5 px-1">
      {!added ? (
        <AiOutlineHeart
          size={"2rem"}
          onClick={() => setAdded(!added)}
          className="text-white fw-bold box-shadow"
        />
      ) : (
        <AiFillHeart
          size={"2rem"}
          onClick={() => setAdded(!added)}
          className="text-orange"
        />
      )}
      <AiOutlineShareAlt
        size={"2rem"}
        className="text-white fw-bold box-shadow"
      />
      <AiOutlineExclamationCircle
        size={"2rem"}
        className="text-white fw-bold box-shadow"
      />
    </div>
  );
};

export default Favourites;
