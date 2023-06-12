import { Fragment, useContext } from "react";
import {
  InstallmentType,
  CommissionType,
} from "../../../Reducers/AddPropertyReducer";
import { FormattedMessage } from "react-intl";
import { FieldNumber, RealtySelect } from "../../Shared/Realty";
import { FormikContext } from "./Shared";

const Money = () => {
  const formik = useContext(FormikContext);
  return (
    <Fragment>
      <FieldNumber
        id="Area"
        name="area"
        fixed={
          <FormattedMessage
            id="M"
            values={{ pow: "2", sup: (word) => <sup>{word}</sup> }}
          />
        }
        formik={formik}
      />
      <FieldNumber
        id="Price"
        name="price"
        fixed={<FormattedMessage id="LE" />}
        formik={formik}
      />
      {formik.values.offer === "For Rent" && (
        <FieldNumber
          id="Insurance"
          name="insurance"
          fixed={<FormattedMessage id="LE" />}
          formik={formik}
        />
      )}
      {formik.values.offer === "For Sale" &&
        formik.values.saleOption.includes("Installment") && (
          <>
            <FieldNumber
              id="DownPayment"
              name="downPayment"
              fixed={<FormattedMessage id="LE" />}
              formik={formik}
            />
            <RealtySelect
              id="InstallmentOption"
              name="installmentOption.type"
              options={InstallmentType}
            />
            <FieldNumber
              id={
                formik.values.installmentOption.type === "Yearly"
                  ? "InstallmentYearlyPeriod"
                  : "InstallmentMonthlyPeriod"
              }
              placeholder={
                formik.values.installmentOption.type === "Yearly"
                  ? "PlaceholderInstallmentYearlyPeriod"
                  : "PlaceholderInstallmentMonthlyPeriod"
              }
              name="installmentOption.period"
              formik={formik}
            />
            <FieldNumber
              id={
                formik.values.installmentOption.type === "Yearly"
                  ? "YearlyAmount"
                  : "MonthlyAmount"
              }
              name="installmentOption.amount"
              fixed={<FormattedMessage id="LE" />}
              formik={formik}
            />
          </>
        )}
      <RealtySelect
        id="CommissionType"
        name="commission_type"
        options={CommissionType}
      />
      {formik.values.commission_type !== "" && (
        <FieldNumber
          id="Commission"
          name="commission"
          fixed={
            formik.values.commission_type === "Fixed" ? (
              <FormattedMessage id="LE" />
            ) : (
              "%"
            )
          }
          formik={formik}
        />
      )}
    </Fragment>
  );
};

export default Money;
