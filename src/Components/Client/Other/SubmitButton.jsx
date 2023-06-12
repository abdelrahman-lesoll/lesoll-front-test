import { FormattedMessage } from "react-intl";

const SubmitButton = ({ SubmitName, ...rest }) => {
  return (
    <button
      type="submit"
      className="w-100 outline-0 border-0 main-bg text-white p-2 border-radius-5 my-1"
      {...rest}
    >
      <FormattedMessage id={SubmitName} />
    </button>
  );
};

export default SubmitButton;
