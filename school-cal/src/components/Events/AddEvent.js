/* eslint-disable */

import React, { useContext, useState } from "react"
import moment from "moment"
import { Formik, Field } from "formik"
import * as Yup from "yup"
import { AuthContext } from "../../contexts/auth/authState"
import axios from "axios"

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
  const [data, setData] = useState([]);

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

const AddEventForm = (props,{
  values,
  handleChange,
  handleBlur,
  handleClose,
  open,
}) => {
  const  handleSubmit = async(e) => {
    e.preventDefault();
    const { value } = e.target.elements
    axios.post(`http://localhost:4000/api/calendars/${id}/events`, {event: value})
    .then(res => {
      console.log(res)
      setData(value)
    })
  }
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle style={{background:"#21242C", color:"white"}}>Add Event</DialogTitle>
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
                <TextField style={{background:"#F2D2BF", borderRadius:"5px"}}
                  fullWidth
                  id="event-name"
                  label="Event Title"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                />
              </Grid>
              <Grid item xs={12}>
                  <TextField style={{background:"#F2D2BF", borderRadius:"5px"}}
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
              <Grid item xs={12}>
                <TextField style={{background:"#F2D2BF", borderRadius:"5px"}}
                    fullWidth
                    id="event-description"
                    label="Description"
                    margin="normal"
                    name="description"
                    onChange={handleChange}
                    value={values.description}
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
