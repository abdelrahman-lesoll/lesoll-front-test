import { FormattedMessage } from "react-intl";
import {
  CommissionType,
  InstallmentType,
} from "../../../../Reducers/AddPropertyReducer";
import { FieldNumber, RealtySelect } from "../../../Shared/Realty";

const Money = ({ formik }) => {
  return (
    <>
      <FieldNumber
        id="Area"
        name="area"
        fixed={
          <FormattedMessage
            id="M"
            values={{ pow: "2", sup: (word) => <sup>{word}</sup> }}
          />
        }
      />
      <FieldNumber
        id="Price"
        name="price"
        fixed={<FormattedMessage id="LE" />}
      />
      {formik.values.offer === "For Rent" && (
        <FieldNumber
          id="Insurance"
          name="insurance"
          fixed={<FormattedMessage id="LE" />}
        />
      )}
      {formik.values.offer === "For Sale" &&
        formik.values.saleOption?.includes("Installment") && (
          <>
            <FieldNumber
              id="DownPayment"
              name="downPayment"
              fixed={<FormattedMessage id="LE" />}
            />
            <RealtySelect
              id="InstallmentOption"
              name="installmentOption.type"
              options={InstallmentType}
            />
            <FieldNumber
              id="InstallmentPeriod"
              name="installmentOption.period"
            />
            <FieldNumber
              id="InstallmentAmount"
              name="installmentOption.amount"
              fixed={<FormattedMessage id="LE" />}
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
    </>
  );
};

export default Money;
