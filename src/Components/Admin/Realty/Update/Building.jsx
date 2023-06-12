import { FinishingOption } from "../../../../Reducers/AddPropertyReducer";
import {
  FieldNumber,
  RealtyBuildingYear,
  RealtySelect,
  RealtySwitch,
} from "../../../Shared/Realty";

const Building = ({ formik }) => {
  return (
    <>
      <FieldNumber id="Room" name="rooms" max="30" />
      <FieldNumber id="BathRoom" name="bathRooms" max="30" />
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
      <RealtyBuildingYear
        formik={formik}
        fromUpdate={true}
        name="buildingYear"
        id="BuildingYear"
      />
      <RealtyBuildingYear
        formik={formik}
        fromUpdate={true}
        name="deliveryDate"
        id="DeliveryDate"
      />
      <RealtySwitch id="Furnished" name="isFurnished" />
      <RealtySwitch id="Negotiable" name="negotiable" />
    </>
  );
};

export default Building;
