import React, { useContext } from "react"
import { Formik } from "formik"
import * as Yup from "yup"
import { CalendarContext } from "../../contexts/calendar/calendarState"
import {
  Button,
  CircularProgress,
  Card,
  CardActions,
  CardHeader,
  CardContent,
  TextField,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const EditCalendarSchema = Yup.object().shape({
  calendarName: Yup.string()
    .required("Calendar name is required.")
    .min(3, "Calendar name must be greater than 3 characters."),
})
const General = ({ calendar }) => {
  const { isLoading, editUserCalendar } = useContext(CalendarContext)
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          calendarName: calendar.calendarName,
          calendarDescription: calendar.calendarDescription,
        }}
        onSubmit={(values, actions) => {
          editUserCalendar(calendar.uuid, values)
        }}
        render={formikProps => (
          <EditCalendarForm isLoading={isLoading} {...formikProps} />
        )}
        validationSchema={EditCalendarSchema}
      />
    </>
  )
}

const useStyles = makeStyles(theme => ({
  inputLabel: {
    marginLeft: theme.spacing(1),
  },
  inputText: {
    marginLeft: theme.spacing(1),
  },
  changeButton: {
    backgroundColor: "#F5945B",
    padding: theme.spacing(1, 3),
    borderRadius: "5px",
    border: "2px solid #F5945B",
    marginLeft: "8px",
  },
  buttonLabel: {
    textTransform: "none",
  },
}))

const EditCalendarForm = ({
  isLoading,
  handleBlur,
  handleSubmit,
  handleChange,
  values,
  errors,
  touched,
}) => {
  const classes = useStyles()
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader
            title="General"
            titleTypographyProps={{ variant: "h6" }}
          />
          <CardContent>
            <TextField
              style={{
                background: "#F2D2BF",
                borderRadius: "5px",
              }}
              fullWidth
              id="calendar-name"
              label="Calendar Name"
              margin="normal"
              name="calendarName"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.calendarName}
              InputLabelProps={{ className: classes.inputLabel }}
              helperText={touched.calendarName ? errors.calendarName : ""}
              error={touched.calendarName && Boolean(errors.calendarName)}
            />
            <TextField
              style={{ background: "#F2D2BF", borderRadius: "5px" }}
              fullWidth
              id="calendar-description"
              label="Calendar Description"
              margin="normal"
              name="calendarDescription"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.calendarDescription}
              InputLabelProps={{ className: classes.inputLabel }}
            />
          </CardContent>
          <CardActions>
            <Button
              size="small"
              classes={{
                root: classes.changeButton,
                label: classes.buttonLabel,
              }}
              type="submit">
              {!isLoading ? (
                "Change"
              ) : (
                <CircularProgress className={classes.progress} size={30} />
              )}
            </Button>
          </CardActions>
        </Card>
      </form>
    </>
  )
}

export default General
