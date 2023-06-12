import { FormattedMessage } from "react-intl";
import { useRealty } from "../../Hooks/useRealty";
import { HLoading } from "../../Shared/Loading";

function InstallmentRealties({ startDate, endDate }) {
  const { state } = useRealty("realty-sale-option", {
    saleOption: ["Installment"],
    from: startDate.toISOString(),
    to: endDate.toISOString(),
  });
  if (state.loading) {
    return <HLoading />;
  }
  return (
    <div className="h-100 shadow p-4 border-radius-10 d-flex align-items-center justify-content-between">
      <div className="title">
        <h4>{state.installmentRealties}</h4>
        <h5 className="link-success text-dark">
          <FormattedMessage id="InstallmentRealties" />
        </h5>
      </div>
    </div>
  );
}

export default InstallmentRealties;
