import { Form } from "formik";
import { createContext, useContext } from "react";
import { ShowContext } from "../../../App";
import { ButtonLoading } from "../../Shared/Loading";
import { FormattedMessage } from "react-intl";
import { FieldNumber, Title } from "../../Shared/Realty";
import Services from "../../Shared/Services";
import Gallery from "./Gallery";
import Location from "../../Shared/Location";
import Extra from "../../Shared/Extra";
import Money from "./Money";
import Offer from "./Offer";
import Building from "./Building";

export const FormikContext = createContext();

const Shared = ({ formik, auth, fromUpdate }) => {
  const Context = useContext(ShowContext);
  return (
    <Form>
      <div className="row">
        <Title
          id="PropertyTitle"
          name="title"
          maxLength={70}
          placeholder="TitlePlaceholder"
        />
        <FormikContext.Provider value={formik}>
          <Offer {...{ fromUpdate }} />
          <Money />
          {formik.values.propType !== "Land" && (
            <>
              <FieldNumber
                id="NumOfRooms"
                placeholder="NumOfRooms"
                name="rooms"
                max="30"
                {...{ formik }}
              />
              <FieldNumber
                id="NumOfBathRooms"
                name="bathRooms"
                max="30"
                placeholder="NumOfBathRooms"
                {...{ formik }}
              />
            </>
          )}
          <Building {...{ fromUpdate }} />
          <Location {...{ fromUpdate, formik }} />
          <Gallery />
          <Services />
        </FormikContext.Provider>
        <Extra {...{ formik }} />
      </div>
      {!auth.user ? (
        <button
          type="button"
          className="w-100 outline-0 border-0 main-bg text-white p-2 border-radius-5 my-1"
          onClick={() => Context?.dispatch({ type: "modalLogin" })}
        >
          <FormattedMessage id="SignIn" />
        </button>
      ) : auth.user.phone === auth.user.googleId ||
        auth.user.phone === auth.user.faceId ||
        !auth.user.phone ? (
        <button
          type="button"
          className="w-100 outline-0 border-0 main-bg text-white p-2 border-radius-5 my-1"
          onClick={() => Context?.dispatch({ type: "modalUpdate" })}
        >
          <FormattedMessage id="EditProfile" />
        </button>
      ) : formik.isSubmitting ? (
        <ButtonLoading width="w-100" />
      ) : (
        <button
          type="submit"
          disabled={!formik.dirty}
          className="w-100 outline-0 border-0 main-bg text-white p-2 border-radius-5 my-1"
        >
          <FormattedMessage id={fromUpdate ? "SaveEdit" : "PublishNow"} />
        </button>
      )}
    </Form>
  );
};

export default Shared;
