import { Modal } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { MapSearch } from "../Hooks/useMap";

const ModalSearch = ({ state, mapRef, bounce, setBounce, Context }) => {
  return (
    <Modal
      fullscreen={true}
      show={Context?.state?.modalSearch || false}
      onHide={() => Context.dispatch({ type: "modalSearch" })}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <FormattedMessage id="Map" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="vh-100 p-0 m-0">
        <MapSearch {...{ state, mapRef, bounce, setBounce }} />
      </Modal.Body>
    </Modal>
  );
};

export default ModalSearch;
