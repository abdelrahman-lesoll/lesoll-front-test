import { useFindContacts } from "../../Hooks/useContact";
import { useParams } from "react-router-dom";
import { HLoading } from "../../Shared/Loading";

const Review = () => {
  const { state } = useFindContacts("single-contact", useParams().id);
  return (
    <div className="p-5">
      <div className="shadow p-4 border-radius-5">
        <div className="border-bottom pb-2">
          <h4 className="mb-1">Contact Details</h4>
        </div>
        {state.loading || !state.contact ? (
          <HLoading />
        ) : (
          <div className="row my-3">
            <div className="col-lg-6 mb-2">
              <label>Full Name</label>
              <input
                type="text"
                className="w-100 p-2 border outline-0 border-radius-5"
                readOnly={true}
                defaultValue={state.contact.fullname}
              />
            </div>
            <div className="col-lg-6 mb-2">
              <label>Email</label>
              <input
                type="text"
                className="w-100 p-2 border outline-0 border-radius-5"
                readOnly={true}
                defaultValue={state.contact.email}
              />
            </div>
            <div className="col-lg-6 mb-2">
              <label>Subject</label>
              <input
                type="text"
                className="w-100 p-2 border outline-0 border-radius-5"
                readOnly={true}
                defaultValue={state.contact.subject}
              />
            </div>
            <div className="col-lg-6 mb-2">
              <label>Phone</label>
              <input
                type="text"
                className="w-100 p-2 border outline-0 border-radius-5"
                readOnly={true}
                defaultValue={state.contact.phone}
              />
            </div>
            <div className="col-12 mb-2">
              <label>Message</label>
              <textarea
                className="w-100 p-2 border outline-0 border-radius-5"
                rows="5"
                readOnly={true}
                defaultValue={state.contact.message}
              ></textarea>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
