import { FormattedMessage } from "react-intl";
import { useFind } from "../../Hooks/useUser";
import { HLoading } from "../../Shared/Loading";

function UsersBetweenTwoDates({ startDate, endDate }) {
  const { state } = useFind("user-between-two-dates", {
    from: startDate.toISOString(),
    to: endDate.toISOString(),
  });
  if (state.loading) {
    return <HLoading />;
  }
  return (
    <div className="h-100 shadow p-4 border-radius-10 d-flex align-items-center justify-content-between">
      <div className="title">
        <h4>{state.usersBetweenTwoDates}</h4>
        <h5 className="link-success text-dark">
          <FormattedMessage id="NumberOfUsers" />
        </h5>
      </div>
    </div>
  );
}

export default UsersBetweenTwoDates;
