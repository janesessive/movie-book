import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ActorsSelectForm from '../ActorsSelectForm/ActorsSelectForm';

const ActorsPopup = ({ buttonLabel, className, onActorSelected }) => {
  const [modal, setModal] = useState(false);

  const toggle = event => {
    event.preventDefault();
    setModal(!modal);
  };

  const onActorSelectedHandler = actor => {
    if (onActorSelected && typeof onActorSelected === 'function') {
      onActorSelected(actor);
    }
  };

  return (
    <>
      <button onClick={toggle}>{buttonLabel}</button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add Actors</ModalHeader>
        <ModalBody>
          <ActorsSelectForm onActorSelected={onActorSelectedHandler} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Apply
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ActorsPopup;
