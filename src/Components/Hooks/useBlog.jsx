import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  findAllBlogs,
  addBlog,
  deleteBlog,
  findSingleBlog,
  updateBlog,
  resetError,
} from "../../Api/Blog";

export const useBlogs = (key, values) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddBlog = (values) => dispatch(addBlog(values));
  const handleUpdateBlog = (values) => dispatch(updateBlog(values));
  const handleDeleteBlog = (values) => dispatch(deleteBlog(values));
  const state = useSelector((state) => state.blog);

  useEffect(() => {
    if (key === "all-blogs") {
      dispatch(findAllBlogs());
    } else if (key === "single-blog") {
      dispatch(findSingleBlog(values));
    } else {
      return;
    }
  }, [key]);

  // Check For Error
  useEffect(() => {
    if (state.error) {
      navigate("/Error-Blogs", { state: { statusCode: 500 } });
      dispatch(resetError());
    }
  }, [state]);

  return { state, handleAddBlog, handleUpdateBlog, handleDeleteBlog };
};
