import { Fragment, useContext } from "react";
import { FormikContext } from "./Shared";
import { FinishingOption } from "../../../Reducers/AddPropertyReducer";
import {
  FieldNumber,
  RealtyBuildingYear,
  RealtySelect,
  RealtySwitch,
} from "../../Shared/Realty";

const Building = ({ fromUpdate }) => {
  const formik = useContext(FormikContext);
  return (
    <Fragment>
      {formik.values.propType !== "Land" && (
        <>
          <RealtySelect
            id="FinishingOption"
            name="finishingType"
            options={FinishingOption}
          />
          <FieldNumber
            id="Level"
            name="level"
            max="30"
            {...{ formik }}
            placeholder="LevelPlaceholder"
          />
        </>
      )}
      {formik.values.propType !== "Land" && (
        <>
          <RealtyBuildingYear
            {...{
              formik,
              name: "buildingYear",
              id: "BuildingYear",
              fromUpdate,
            }}
          />
          {formik.values.offer === "For Sale" && (
            <RealtyBuildingYear
              {...{
                formik,
                name: "deliveryDate",
                id: "DeliveryDate",
                fromUpdate,
              }}
            />
          )}
          <RealtySwitch
            id="Furnished"
            name="isFurnished"
            placeholder={
              formik.values.isFurnished ? "Furnished" : "NotFurnished"
            }
          />
        </>
      )}
      <RealtySwitch
        id="Negotiable"
        name="negotiable"
        placeholder={formik.values.negotiable ? "Negotiable" : "NotNegotiable"}
      />
    </Fragment>
  );
};

export default Building;
