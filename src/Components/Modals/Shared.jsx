import { TiSocialFacebookCircular } from "react-icons/ti";
import { GoogleLogin } from "react-google-login";
import { FormattedMessage } from "react-intl";
import { useContext } from "react";
import { LangContext } from "../../Languages/LanguageProvider";
import FacebookLogin from "react-facebook-login";
import DefaultInput from "../Client/Other/DefaultInput";

export const Shared = ({ GooogleLogin, FaceBookLogin }) => {
  const { locale } = useContext(LangContext);
  return (
    <div className="row justify-content-center text-center auth-shared-container">
      <div className="col-12 mb-2">
        <FacebookLogin
          appId={import.meta.env.VITE_FACE_ID}
          fields="name,email,picture"
          callback={(res) => FaceBookLogin(res)}
          onFailure={(res) => console.log(res)}
          cssClass="bg-transparent outline-0 border mx-4 px-2 text-primary font-15 face-auth"
          icon={<TiSocialFacebookCircular size="1.5rem" className="mx-2" />}
          textButton={<FormattedMessage id="SignInWithFace" />}
        />
      </div>
      <div className="col-12">
        <GoogleLogin
          clientId={import.meta.env.VITE_CLIENT_ID}
          buttonText={
            <span
              className={`fw-bold mx-2 ${
                locale === "ar-EG" && "px-1"
              } font-15 google-auth`}
            >
              <FormattedMessage id="SignInWithGoogle" />
            </span>
          }
          onSuccess={(res) => GooogleLogin(res.profileObj)}
          onFailure={(err) => console.log(err)}
          cookiePolicy="single_host_origin"
          className="text-center shadow-none border"
        />
      </div>
    </div>
  );
};

export const Or = ({ title }) => {
  return (
    <div className="my-4 border-bottom position-relative">
      <span className="position-absolute bg-white px-3 top-50 left-50 translate-middle text-truncate">
        {title}
      </span>
    </div>
  );
};

export const SharedReg = ({ title, type, name }) => {
  return (
    <div className="col-12">
      <div className="mb-2">
        <label className="mb-1 mx-1">
          <FormattedMessage id={title} />
        </label>
        <DefaultInput type={type} name={name} placeholder={title} />
      </div>
    </div>
  );
};
