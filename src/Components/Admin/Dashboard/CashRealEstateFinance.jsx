import { FormattedMessage } from "react-intl";
import { useRealty } from "../../Hooks/useRealty";
import { HLoading } from "../../Shared/Loading";

function CashRealEstateFinance({ startDate, endDate }) {
  const { state } = useRealty("realty-sale-option", {
    saleOption: ["Cash", "Real Estate Finance"],
    from: startDate.toISOString(),
    to: endDate.toISOString(),
  });
  if (state.loading) {
    return <HLoading />;
  }
  return (
    <div className="h-100 shadow p-4 border-radius-10 d-flex align-items-center justify-content-between">
      <div className="title">
        <h4>{state.cashRealFinanceRealties}</h4>
        <h5 className="link-success text-dark">
          <FormattedMessage id="CashAndRealEstateFinanceRealties" />
        </h5>
      </div>
    </div>
  );
}

export default CashRealEstateFinance;
