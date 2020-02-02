import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const ModalExample = props => {
  const { buttonLabel, className, pokemon } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div >
      <p
        style={{
          marginBottom: 10,
          position: "absolute",
          cursor: "pointer",
          top: 6,
          fontWeight: 500,
          fontSize: 20
        }}
        onClick={toggle}
      >
        💬
      </p>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader
          toggle={toggle}
        >{`${pokemon.name.toUpperCase()} - ABILITIES`}</ModalHeader>
        <ModalBody>
          <ul>
            {pokemon.abilities.map(e => {
              return <li>{e.ability.name.replace("-", " ").toUpperCase()}</li>;
            })}
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalExample;
