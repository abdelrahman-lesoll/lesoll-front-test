import { useState, useContext, Fragment, useEffect, useReducer } from "react";
import { LangContext } from "../../../Languages/LanguageProvider";
import { initialState, reducer } from "../../../Reducers/AddPropertyReducer";
import {
  AiFillDelete,
  AiOutlineClose,
  AiOutlineDownload,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FormattedMessage } from "react-intl";
import { FormikContext } from "./Shared";
import { TextError } from "../../Shared/ErrorPage";
import { ErrorMessage } from "formik";
import { saveAs } from "file-saver";
import DefaultInput from "../Other/DefaultInput";
import Image from "../../Shared/Image";

const Gallery = () => {
  const formik = useContext(FormikContext);
  const [isChanged, setIsChanged] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { locale } = useContext(LangContext);

  useEffect(() => {
    if (!isChanged) {
      dispatch({ type: "oldImages", payload: formik.values.oldImgs });
      setIsChanged(true);
    }
  }, [state.oldImages, isChanged]);

  useEffect(() => {
    formik.setFieldValue("delImgs", state.delImages);
  }, [state.delImages]);

  useEffect(() => {
    formik.setFieldValue("imgs", state.originalImage);
  }, [state.originalImage]);

  const handleImages = (e) => {
    Array.from(e.target.files).map((file) => {
      if (file.type !== "video/mp4") {
        // video are Not Allowed
        dispatch({ type: "originalImage", payload: file });
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          dispatch({ type: "previewSource", payload: reader.result });
        };
        formik.setFieldError("imgs", "");
      }
    });
  };

  const filterImgs = (index, oldImgs) => {
    if (oldImgs) {
      dispatch({ type: "delImages", payload: state.oldImages[index] });
      dispatch({ type: "delOldImages", payload: state.oldImages[index] });
    } else {
      dispatch({ type: "filterPreviewSource", payload: index });
      formik.values.imgs.splice(index, 1);
    }
    formik.setFieldError("imgs", "");
  };

  const deleteAllImgs = () => {
    dispatch({ type: "delAll" });
    formik.values.imgs = [];
    formik.values.oldImgs = [];
  };

  const downloadAll = () => {
    state.oldImages.map((img, index) => {
      saveAs(
        `${import.meta.env.VITE_SERVER_PORT}/api/${img.image}`,
        `image-${index}.webp`
      );
    });
  };

  return (
    <Fragment>
      <div className="col-12 mb-2">
        <div className="border-bottom d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center">
            <h2>
              <FormattedMessage id="Gallery" />
            </h2>
            <OverlayTrigger
              trigger={["click", "hover"]}
              placement="top"
              overlay={
                <Popover id="popover-basic">
                  <Popover.Body>
                    <FormattedMessage id="GalleryInfo" />
                  </Popover.Body>
                </Popover>
              }
            >
              <span className="mx-3">
                <AiOutlineExclamationCircle size="1.4rem" />
              </span>
            </OverlayTrigger>
          </div>
          <div className="cursor-pointer gallery-multi-option">
            <BsThreeDotsVertical size="1.2rem" />
            <ul
              className={`list-unstyled shadow border-radius-5 border ${
                locale === "en-US" ? "right-0" : "left-0"
              }`}
            >
              <li className="p-1" onClick={deleteAllImgs}>
                <AiFillDelete /> <FormattedMessage id="DeleteAllImgs" />
              </li>
              {location.pathname !== "/Submit-Property" && (
                <li className="p-1" onClick={downloadAll}>
                  <AiOutlineDownload size="1.2rem" />{" "}
                  <FormattedMessage id="DownloadAllImgs" />
                </li>
              )}
            </ul>
          </div>
        </div>
        <label
          htmlFor="albums"
          id="gallery"
          className="cursor-pointer border p-4 mb-2 d-flex flex-column align-items-center justify-content-center text-muted"
        >
          <IoMdAddCircleOutline size="2rem" />
          <span className="font-18">
            <FormattedMessage id="UploadImages" />
          </span>
        </label>
        <input
          type="file"
          className="d-none"
          multiple
          id="albums"
          onChange={handleImages}
        />
        <div className="row">
          {state.oldImages.map((img, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-1" key={img._id}>
              <div className="img-container position-relative">
                <Image
                  imageUrl={img.image}
                  className="mw-100 w-100"
                  height={300}
                />
                <div
                  onClick={() => filterImgs(index, true)}
                  className="text-white main-bg p-1 position-absolute top-0 right-0 cursor-pointer"
                >
                  <AiOutlineClose className="fw-bold" size={"1.2rem"} />
                </div>
              </div>
            </div>
          ))}
          {state.previewSource.map((img, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-1" key={index}>
              <div className="img-container position-relative">
                <img src={img} className="mw-100 w-100" height={300} />
                <div
                  onClick={() => filterImgs(index)}
                  className="text-white main-bg p-1 position-absolute top-0 right-0 cursor-pointer"
                >
                  <AiOutlineClose className="fw-bold" size={"1.2rem"} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <ErrorMessage name="imgs" component={TextError} />
        <div className="border-bottom my-2">
          <h2>
            <FormattedMessage id="Description" />
          </h2>
        </div>
        <DefaultInput
          type="text"
          placeholder="Description"
          isTextArea={true}
          name="description"
          rows="4"
        />
      </div>
    </Fragment>
  );
};

export default Gallery;
