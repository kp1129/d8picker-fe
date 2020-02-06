import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const DayPlanner = (props) => {
    const {
        buttonLabel,
        className
      } = props;
      return (
        <div>
          <Modal isOpen={props.modals} toggle={props.toggler} className={className}>
            <ModalHeader toggle={props.toggler}>{props.date}</ModalHeader>
            <ModalBody>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={props.toggler}>Do Something</Button>{' '}
              <Button color="secondary" onClick={props.toggler}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
}
export default DayPlanner;