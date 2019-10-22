import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ActorsSelectForm from "../ActorsSelectForm/ActorsSelectForm";

const ActorsPopup = props => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add Actors</ModalHeader>
        <ModalBody>
          <ActorsSelectForm />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Apply
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ActorsPopup;
