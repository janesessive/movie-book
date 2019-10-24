import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ActorsSelectForm from '../ActorsSelectForm/ActorsSelectForm';

const ActorsPopup = ({ buttonLabel, className, onActorSelected }) => {
  const [modal, setModal] = useState(false);

  let [selectedActors, setSelectedActors] = useState([]);

  const toggle = event => {
    event.preventDefault();
    setModal(!modal);
  };

  const onApplyClick = (event
    ) => {
    if (onActorSelected && typeof onActorSelected === 'function') {
      onActorSelected(selectedActors);
    }
    toggle(event);

  }

  const onActorSelectedHandler = actor => {
    let selectedNewActors = [...selectedActors];
    selectedNewActors.push(actor);
    setSelectedActors(selectedNewActors);   
  };

  return (
    <>
      <button onClick={toggle}>{buttonLabel}</button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add Actors</ModalHeader>
        <ModalBody>
        <pre>{JSON.stringify(selectedActors, null, 2)}</pre>
          <ActorsSelectForm onActorSelected={onActorSelectedHandler} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onApplyClick}>
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
