import React, { useEffect, useState } from "react"
import { clientWithAuth } from "../../utilities/api"
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  FormControlLabel,
  Typography,
  Switch,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import SubscribableLink from "../Dialogs/SubscribableLink"
import CalendarPrivacyUpdateAlert from "../Dialogs/CalendarPrivacyUpdateAlert"

const useStyles = makeStyles(theme => ({
  privacySettings: {
    display: "flex",
    flexDirection: "column",
  },

  getSubscribableLinkButton: {
    marginTop: theme.spacing(3),
    backgroundColor: "#F5945B",
  },
  buttonLabel: {
    textTransform: "none",
  },
  linkDisplay: {
    flexGrow: 4,
  },
  copyLinkButton: {
    marginTop: "16px",
    marginBottom: "8px",
    marginLeft: "16px",
    flexGrow: 1,
  },
}))
const Privacy = ({ userCalendar, editUserCalendarPrivacy }) => {
  const [subscribableLink, setSubscribableLink] = useState(null)
  const [subscribableLinkDialog, openSubscribableLinkDialog] = useState(false)
  const [calendarPrivacyAlert, openCalendarPrivacyAlert] = useState(false)
  const [subscribers, setSubscribers] = useState([])
  const classes = useStyles()

  useEffect(() => {
    const getSubscribers = async () => {
      const subscribers = await clientWithAuth(
        `/api/calendars/${userCalendar.uuid}/subscribers`,
      )
      setSubscribers(subscribers.data)
    }
    if (userCalendar.isPrivate === 0) {
      getSubscribers()
    }
  }, [userCalendar])

  const getSubcribableLink = async () => {
    const link = await clientWithAuth(
      `/api/calendars/${userCalendar.uuid}/?subscribableLink=true`,
    )

    setSubscribableLink(link.data)
    openSubscribableLinkDialog(true)
  }

  const handleCalendarPrivacy = async () => {
    if (userCalendar.isPrivate === 0) {
      const users = await clientWithAuth(
        `/api/calendars/${userCalendar.uuid}/subscribers`,
      )

      setSubscribers(users.data)
      if (subscribers.length > 0) {
        openCalendarPrivacyAlert(true)
      }
    } else {
      performEditUserCalendar()
    }
  }

  const performEditUserCalendar = () => {
    editUserCalendarPrivacy(userCalendar.uuid, {
      isPrivate: !userCalendar.isPrivate,
    })

    openCalendarPrivacyAlert(false)
  }

  return (
    <div>
      <Card>
        <CardHeader title="Privacy" titleTypographyProps={{ variant: "h6" }} />
        <CardContent>
          <FormControlLabel
            control={
              <Switch
                checked={!!+userCalendar.isPrivate}
                onChange={handleCalendarPrivacy}
              />
            }
            label={
              !!+userCalendar.isPrivate
                ? "The calendar is private"
                : "The calendar is public"
            }
          />
          <div>
            {!!+userCalendar.isPrivate ? (
              <Typography>
                Turn off private calendar to make it subscribable to other
                users.
              </Typography>
            ) : (
              <Button
                classes={{
                  root: classes.getSubscribableLinkButton,
                  label: classes.buttonLabel,
                }}
                onClick={getSubcribableLink}>
                Get subscribable link
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      <SubscribableLink
        open={subscribableLinkDialog}
        handleClose={() => openSubscribableLinkDialog(false)}
        link={subscribableLink}
      />
      <CalendarPrivacyUpdateAlert
        open={calendarPrivacyAlert}
        handleClose={() => openCalendarPrivacyAlert(false)}
        edit={performEditUserCalendar}
        numberOfSubscribers={subscribers.length}
      />
    </div>
  )
}

export default Privacy
