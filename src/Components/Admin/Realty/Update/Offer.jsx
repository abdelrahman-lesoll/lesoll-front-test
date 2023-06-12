import {
  OfferOption,
  PropTypes,
  RentalPeriod,
  SaleOption,
  LandTypes,
} from "../../../../Reducers/AddPropertyReducer";
import { useContext } from "react";
import { LangContext } from "../../../../Languages/LanguageProvider";
import { useFindWithPropType } from "../../../Hooks/useProperty";
import { RealtySelect } from "../../../Shared/Realty";

const Offer = ({ formik, fromUpdate }) => {
  const { state, defaultUnitType } = useFindWithPropType(formik, fromUpdate);
  const { locale } = useContext(LangContext);
  return (
    <>
      <RealtySelect
        className="col-lg-4 "
        id="ListingOption"
        name="offer"
        options={OfferOption}
      />
      <RealtySelect
        className="col-lg-4 "
        id="PropertyType"
        name="propType"
        options={PropTypes}
      />
      {formik.values.propType !== "Land" ? (
        <RealtySelect
          className="col-lg-4"
          id="UnitType"
          name="unitType"
          options={state.propWithHeader.map((header) => {
            return {
              label: locale === "en-US" ? header.title.en : header.title.ar,
              options: header.property.map((property) => {
                return {
                  label:
                    locale === "en-US" ? property.title.en : property.title.ar,
                  value: property._id,
                };
              }),
            };
          })}
          {...(fromUpdate &&
          formik.values.oldPropType === formik.values.propType &&
          !!defaultUnitType
            ? {
                defaultValue: [
                  {
                    label:
                      locale === "en-US"
                        ? defaultUnitType?.title.en
                        : defaultUnitType?.title.ar,
                    value: defaultUnitType?._id,
                  },
                ],
              }
            : {})}
          loading={state.loading}
        />
      ) : (
        <RealtySelect
          className="col-lg-4"
          id="LandType"
          name="landType"
          options={LandTypes}
        />
      )}
      <RealtySelect
        className="col-lg-8"
        id={formik.values.offer === "For Sale" ? "SaleOption" : "RentalPeriod"}
        name={
          formik.values.offer === "For Sale" ? "saleOption" : "rentalPeriod"
        }
        options={formik.values.offer === "For Sale" ? SaleOption : RentalPeriod}
        isMulti={formik.values.offer === "For Sale"}
        closeMenuOnSelect={formik.values.offer === "For Rent"}
      />
    </>
  );
};

export default Offer;
