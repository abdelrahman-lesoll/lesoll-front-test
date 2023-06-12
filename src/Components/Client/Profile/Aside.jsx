import { UserLink, UserLinks } from "./Shared";
import { BsPower } from "react-icons/bs";
import { useAuth } from "../../../Utils/Auth";
import { FormattedMessage } from "react-intl";
import Image from "../../Shared/Image";

const Aside = () => {
  const auth = useAuth();
  return (
    <div className="col-lg-3 mb-3 d-none d-xxl-block d-xl-block d-lg-block">
      <div className="shadow-sm bg-white border border-radius-5">
        <div className="img-container p-4 d-flex align-items-center justify-content-center">
          <Image
            imageUrl={auth.user.image}
            className="mw-100 rounded-circle"
            height="120"
            width="120"
            alt=""
          />
        </div>
        <ul className="list-unstyled m-0 p-0">
          {UserLinks.slice(
            auth.user.role === "Admin" ? 0 : 1,
            UserLinks.length
          ).map(({ id, link, icon }) => (
            <UserLink key={id} {...{ id, link, icon, auth }} />
          ))}
          <li
            onClick={() => auth.logout()}
            className="border-radius-5 border-bottom p-2 custom-transition bg-light-grey-hover cursor-pointer d-flex align-items-center"
          >
            <BsPower size="1.2rem" />
            <span className="mx-2 font-16">
              <FormattedMessage id="Logout" />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Aside;
