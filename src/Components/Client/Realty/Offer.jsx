import { RentalPeriod, SaleOption } from "../../../Reducers/AddPropertyReducer";
import { OfferOption } from "../../../Reducers/AddPropertyReducer";
import { PropTypes, LandTypes } from "../../../Reducers/AddPropertyReducer";
import { RealtySelect } from "../../Shared/Realty";
import { useFindWithPropType } from "../../Hooks/useProperty";
import { Fragment, useContext } from "react";
import { FormikContext } from "./Shared";
import { LangContext } from "../../../Languages/LanguageProvider";

const Offer = ({ fromUpdate }) => {
  const formik = useContext(FormikContext);
  const { locale } = useContext(LangContext);
  const { state, defaultUnitType } = useFindWithPropType(formik, fromUpdate);
  return (
    <Fragment>
      <RealtySelect
        className="col-lg-4"
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
        <RealtySelect id="LandType" name="landType" options={LandTypes} />
      )}
      <RealtySelect
        className="col-lg-8"
        id={formik.values.offer === "For Sale" ? "SaleOption" : "RentalPeriod"}
        name={
          formik.values.offer === "For Sale" ? "saleOption" : "rentalPeriod"
        }
        placeholder={
          formik.values.offer === "For Sale" ? "SaleOptions" : "RentalPeriod"
        }
        options={formik.values.offer === "For Sale" ? SaleOption : RentalPeriod}
        isMulti={formik.values.offer === "For Sale"}
        closeMenuOnSelect={formik.values.offer === "For Rent"}
      />
    </Fragment>
  );
};

export default Offer;
