// Postcard.tsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, deletePost } from "../store/slices/textpostSlice";
import { toggleLike, toggleUnlike } from "../store/slices/postlikeSlice";
import { FcLike, FcDislike } from "react-icons/fc";

interface PostsItem {
  id: number;
  title: string;
  body: string;
}

const Postcard: React.FC<PostsItem> = ({ id, title, body }) => {
  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState<boolean | undefined>(undefined);

  const handleToggleLike = () => {
    console.log('Like button clicked for post:', id);
    dispatch(toggleLike(id));
    setIsLiked(prevIsLiked => !prevIsLiked);
  };

  const handleToggleDislike = () => {
    console.log('Dislike button clicked for post:', id);
    dispatch(toggleUnlike(id));
    setIsLiked(prevIsLiked => !prevIsLiked);
  };

  const handleSave = () => {
    dispatch(addPost({ id, title, body }));
  };

  const handleUnsave = () => {
    dispatch(deletePost(id));
  };

  const posts = useSelector((state: any) => state.texts);
  const isPostSaved = posts.some((post: any) => post.id === id);

  const isPostLiked = useSelector((state: any) => {
    if (state.postlikes) {
      return state.postlikes.some((like: any) => like.postId === id && like.liked);
    }
    return false;
  });

  useEffect(() => {
    setIsLiked(isPostLiked);
  }, [isPostLiked]);

  return (
    <>
      <div className="h-full bg-slate-400 border border-gray-900 rounded-lg overflow-hidden flex flex-col justify-between">
        <div className="p-4">
          <h1 className="leading-relaxed mb-2 font-bold">{title}</h1>
          <p className="leading-relaxed mb-3">{body}</p>
        </div>
        <div className="flex items-center justify-between flex-wrap px-3 pb-2">
          {isPostSaved ? (
            <button
              onClick={handleUnsave}
              className="unsavebtn bg-zinc-700 text-white px-5 py-2 rounded-full transition-colors duration-300 hover:bg-sky-700 hover:text-white"
            >
              Unsave
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="savebtn bg-zinc-700 text-white px-5 py-2 rounded-full transition-colors duration-300 hover:bg-sky-700 hover:text-white"
            >
              Save
            </button>
          )}
          {isLiked ? (
            <button
              onClick={handleToggleDislike}
              className="text-gray-400 inline-flex items-center leading-none text-4xl cursor-pointer"
            >
              <FcDislike />
            </button>
          ) : (
            <button
              onClick={handleToggleLike}
              className="text-gray-400 inline-flex items-center leading-none text-4xl cursor-pointer"
            >
              <FcLike />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Postcard;