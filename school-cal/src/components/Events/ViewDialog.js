import React, { useEffect, useState } from "react"
import moment from "moment"

//sematic ui
import { Modal, Button, Icon } from "semantic-ui-react"

import EditEvent from "../Events/EditEvent"

const ViewDialog = ({ modalOpen, valueIntoModal, handleClose }) => {
  const [editEvent, openEditEvent] = useState(false)

  return (
    <div>
      <Modal open={modalOpen} size="small" closeOnEscape={true}>
        <Modal.Header style={{ background: "#21242C", color: "white" }}>
          {valueIntoModal.eventTitle}
        </Modal.Header>
        <Modal.Actions>
          <div
            className="icons"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}>
            <Icon name="ellipsis vertical" size="large" />
            <Icon name="cancel" size="large" onClick={handleClose} />
          </div>
        </Modal.Actions>
        <Modal.Content>
          <h3>Location</h3>
          <p>{valueIntoModal.eventLocation}</p>
          <h3>Date/Time</h3>
          <p>
            {valueIntoModal.startDate +
              " - " +
              valueIntoModal.endDate +
              " at " +
              valueIntoModal.startTime +
              " - " +
              valueIntoModal.endTime}
          </p>
          <h3>Notes</h3>
          <p>{valueIntoModal.eventNote}</p>
          <Modal.Actions>
            <div
              className="btn"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}>
              <Button inverted color="orange">
                Share
              </Button>
              <Button
                inverted
                color="orange"
                onClick={() => openEditEvent(true)}>
                Edit
              </Button>
            </div>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
      <EditEvent
        openEdit={editEvent} //passes true or false for trigger
        valueFromModal={valueIntoModal} //passes state
        handleClose={() => openEditEvent(false)} //trigger
      />
    </div>
  )
}

export default ViewDialog
