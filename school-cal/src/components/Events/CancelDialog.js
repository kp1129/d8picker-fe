import React from "react"

import { Modal, Button } from "semantic-ui-react"

const CancelDialog = ({ modalOpen, createClose, handleClose }) => {
  const confirmButtonClick = () => {
    handleClose()
    createClose()
  }
  return (
    <div>
      <Modal open={modalOpen} size="small">
        <Modal.Header>Cancel</Modal.Header>
        <Modal.Content>
          <p>This will discard all changes</p>
          <p>Are you sure?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button inverted color="orange" onClick={confirmButtonClick}>
            Confirm
          </Button>
          <Button inverted color="orange" onClick={handleClose}>
            Back
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default CancelDialog
