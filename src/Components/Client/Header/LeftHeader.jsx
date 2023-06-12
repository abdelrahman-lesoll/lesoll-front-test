import { useContext } from "react";
import { LangContext } from "../../../Languages/LanguageProvider";
import { HLink, LangSelect, Links } from "./Shared";

const LeftHeader = () => {
  const Language = useContext(LangContext);
  return (
    <div className="d-none d-xxl-block d-xl-block d-lg-block">
      <ul className="list-unstyled d-flex align-items-center">
        {Links.map((link) => (
          <HLink key={link} id={link} />
        ))}
        <li className="pt-4 px-3">
          <LangSelect Language={Language} />
        </li>
      </ul>
    </div>
  );
};

export default LeftHeader;
