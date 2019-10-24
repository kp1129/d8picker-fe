import React, { useContext, useState } from "react"
import moment from "moment"
import { Formik, Field } from "formik"
import * as Yup from "yup"
import { db } from "../../config/firebase"
import { AuthContext } from "../../contexts/auth/authState"

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core"
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import MomentUtils from "@date-io/moment"

const AddEvent = ({ calendar, open, handleClose }) => {
  const { currentUser } = useContext(AuthContext)
  return (
    <>
      <Formik
        initialValues={{
          starts: moment().format(),
          ends: moment().add(1, "hours"),
          name: "",
          description: "",
          location: "",
        }}
        onSubmit={async (values, actions) => {
          try {
            await db
              .collection("calendars")
              .doc(calendar.id)
              .collection("events")
              .add({
                uid: currentUser.uid,
                starts: moment(values.starts).format(),
                ends: moment(values.ends).format(),
                name: values.name,
                description: values.description,
                location: values.location,
              })
            actions.resetForm()
            handleClose()
          } catch (error) {
            console.log("Unable to add event.")
          }
        }}
        render={formikProps => (
          <AddEventForm
            open={open}
            {...formikProps}
            handleClose={handleClose}
          />
        )}
      />
    </>
  )
}

const AddEventForm = ({
  values,
  handleChange,
  handleSubmit,
  handleBlur,
  handleClose,
  open,
}) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add Event</DialogTitle>
          <DialogContent>
            <Grid>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Grid item xs={6}>
                      <Field
                        name="starts"
                        component={StartDateTimePickerField}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field name="ends" component={EndDateTimePickerField} />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="event-name"
                  label="Name"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="event-description"
                  label="Description"
                  margin="normal"
                  name="description"
                  onChange={handleChange}
                  value={values.description}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="event-location"
                  label="Location"
                  margin="normal"
                  name="location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} type="button">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}

const StartDateTimePickerField = ({ field, form }) => {
  return (
    <DateTimePicker
      label="Starts"
      clearable
      disablePast
      value={field.value}
      name={field.name}
      onChange={selectedDate =>
        form.setFieldValue(field.name, selectedDate, false)
      }
    />
  )
}
const EndDateTimePickerField = ({ field, form }) => {
  return (
    <DateTimePicker
      label="Ends"
      clearable
      disablePast
      value={field.value}
      name={field.name}
      onChange={selectedDate =>
        form.setFieldValue(field.name, selectedDate, false)
      }
    />
  )
}
export default AddEvent
