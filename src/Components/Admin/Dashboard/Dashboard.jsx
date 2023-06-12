import { useState } from "react";
import { useRealty } from "../../Hooks/useRealty";
import { useFind } from "../../Hooks/useUser";
import { FormattedMessage, useIntl } from "react-intl";
import ReactDatePicker from "react-datepicker";
import OfferForSale from "./OfferForSale";
import OfferForRent from "./OfferForRent";
import CashedRealties from "./CashedRealties";
import InstallmentRealties from "./InstallmentRealties";
import RealFinanceRealties from "./RealFinanceRealties";
import CashInstallmentRealties from "./CashInstallmentRealties";
import CashRealEstateFinance from "./CashRealEstateFinance";
import DailyRentalPeriod from "./DailyRentalPeriod";
import WeeklyRentalPeriod from "./WeeklyRentalPeriod";
import MonthlyRentalPeriod from "./MonthlyRentalPeriod";
import UsersBetweenTwoDates from "./UsersBetweenTwoDates";
import NumberOfDeletedRealties from "./NumberOfDeletedRealties";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(new Date());
  const {
    handleOfferState,
    handleSaleOptions,
    handleRentalPeriod,
    handleFindAndCountStatus,
  } = useRealty();
  const { handleFindBetweenTwoDates } = useFind();
  const intl = useIntl();
  return (
    <div className="p-5 admin-dashboard">
      <div className="d-flex align-items-center justify-content-between">
        <h4 className="mb-1">
          <FormattedMessage id="Dashboard" />
        </h4>
        <button
          className="btn btn-primary px-4"
          onClick={() => {
            handleOfferState({
              offer: "For Sale",
              from: startDate.toISOString(),
              to: endDate.toISOString(),
            });
            handleOfferState({
              offer: "For Rent",
              from: startDate.toISOString(),
              to: endDate.toISOString(),
            });
            handleSaleOptions({
              saleOption: ["Cash"],
              from: startDate.toISOString(),
              to: endDate.toISOString(),
            });
            handleSaleOptions({
              saleOption: ["Installment"],
              from: startDate.toISOString(),
              to: endDate.toISOString(),
            });
            handleSaleOptions({
              saleOption: ["Real Estate Finance"],
              from: startDate.toISOString(),
              to: endDate.toISOString(),
            });
            handleSaleOptions({
              saleOption: ["Cash", "Installment"],
              from: startDate.toISOString(),
              to: endDate.toISOString(),
            });
            handleSaleOptions({
              saleOption: ["Cash", "Real Estate Finance"],
              from: startDate.toISOString(),
              to: endDate.toISOString(),
            });
            handleRentalPeriod({
              rentalPeriod: "Weekly",
              from: startDate.toISOString(),
              to: endDate.toISOString(),
            });
            handleRentalPeriod({
              rentalPeriod: "Monthly",
              from: startDate.toISOString(),
              to: endDate.toISOString(),
            });
            handleRentalPeriod({
              rentalPeriod: "Daily",
              from: startDate.toISOString(),
              to: endDate.toISOString(),
            });
            handleFindBetweenTwoDates({
              from: startDate.toISOString(),
              to: endDate.toISOString(),
            });
            handleFindAndCountStatus({
              status: "Deleted",
              from: startDate.toISOString(),
              to: endDate.toISOString(),
            });
          }}
        >
          <FormattedMessage id="Search" />
        </button>
      </div>
      <div className="grid-container">
        <div className="h-100 shadow p-4 border-radius-10 d-flex align-items-center justify-content-between">
          <div className="customDatePickerWidth">
            <h5>
              <FormattedMessage id="StartDate" />
            </h5>
            <ReactDatePicker
              placeholderText={intl.formatMessage({ id: "StartDate" })}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="outline-0 border border-radius-5 p-1"
            />
          </div>
        </div>
        <div className="h-100 shadow p-4 border-radius-10 d-flex align-items-center justify-content-between">
          <div className="customDatePickerWidth">
            <h5>
              <FormattedMessage id="EndDate" />
            </h5>
            <ReactDatePicker
              placeholderText={intl.formatMessage({ id: "EndDate" })}
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="outline-0 border border-radius-5 p-1"
            />
          </div>
        </div>
        <OfferForSale startDate={startDate} endDate={endDate} />
        <OfferForRent startDate={startDate} endDate={endDate} />
        <CashedRealties startDate={startDate} endDate={endDate} />
        <DailyRentalPeriod startDate={startDate} endDate={endDate} />
        <InstallmentRealties startDate={startDate} endDate={endDate} />
        <WeeklyRentalPeriod startDate={startDate} endDate={endDate} />
        <RealFinanceRealties startDate={startDate} endDate={endDate} />
        <MonthlyRentalPeriod startDate={startDate} endDate={endDate} />
        <CashInstallmentRealties startDate={startDate} endDate={endDate} />
        <UsersBetweenTwoDates startDate={startDate} endDate={endDate} />
        <CashRealEstateFinance startDate={startDate} endDate={endDate} />
        <NumberOfDeletedRealties startDate={startDate} endDate={endDate} />
      </div>
    </div>
  );
};

export default Dashboard;
