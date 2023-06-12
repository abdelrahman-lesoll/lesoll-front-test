import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  findAllFaqs,
  findFaq,
  findFaqByRelated,
  addFaq,
  updateFaq,
  resetError,
} from "../../Api/FAQ";
import { useNavigate } from "react-router-dom";

export const useFindFaqs = (key, values) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddFaq = (values) => dispatch(addFaq(values));
  const handleFetchRelated = (values) => {
    if (values !== "All") {
      dispatch(findFaqByRelated(values));
    } else {
      dispatch(findAllFaqs());
    }
  };
  const handleUpdateFaq = (values) => dispatch(updateFaq(values));
  const state = useSelector((state) => state.faq);

  // Fetch Faqs
  useEffect(() => {
    if (key === "all-faqs") {
      dispatch(findAllFaqs());
    } else if (key === "single-faq") {
      dispatch(findFaq(values));
    } else {
      return;
    }
  }, [key]);

  // Check For Error
  useEffect(() => {
    if (state.error) {
      navigate("/Error-Find-Faqs", { state: { statusCode: 500 } });
      dispatch(resetError());
    }
  }, [state]);

  return { state, handleAddFaq, handleUpdateFaq, handleFetchRelated };
};
