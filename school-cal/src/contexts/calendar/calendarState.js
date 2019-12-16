import React, { createContext, useEffect, useReducer } from "react"
import {
  IS_LOADING,
  SET_CALENDARS_SUCCESS,
  SET_USER_CALENDAR_FAILURE,
  CREATE_USER_CALENDAR_SUCCESS,
  EDIT_USER_CALENDAR_SUCCESS,
  DELETE_USER_CALENDAR_SUCCESS,
  SET_CALENDAR_SUBSCRIPTION_ID,
  SUBSCRIBE_TO_CALENDAR_SUCCESS,
  UNSUBSCRIBE_CALENDAR_SUCCESS,
  CALENDAR_SUBSCRIPTION_FAILURE,
  SET_MY_CALENDAR_EVENTS_SUCCESS,
  SET_MY_CALENDAR_EVENTS_FAILURE,
  CREATE_CALENDAR_EVENT_SUCCESS,
  EDIT_CALENDAR_EVENT_SUCCESS,
  DELETE_CALENDAR_EVENT_SUCCESS,
  CRUD_OPS_CALENDAR_EVENT_FAILURE,
  SET_USER_CALENDAR_SUCCESS,
  SET_USER_CALENDAR_EVENT,
  SET_SHOW_EVENTS,
  SET_CALENDAR_COLORS_SUCCESS,
  SET_CALENDAR_UTILITIES_FAILURE
} from "./types"

import calendarReducer from "./calendarReducer"
import { clientWithAuth } from "../../utilities/api"
import { loadState, saveState } from "../../utilities/localStorage"
export const CalendarContext = createContext()

export const CalendarState = props => {
  const initialState = {
    isLoading: false,
    userCalendars: [],
    userCalendarsError: null,
    userCalendar: {
      calendarColor: "",
      calendarDescription: "",
      calendarName: "",
      events: [],
      isDefault: false,
      isOwner: false,
      isPrivare: true,
      showEvents: false,
      uuid: ""
    },
    userCalendarEvents: [],
    userCalendarEvent: {
      calendarUuid: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      eventTitle: "",
      eventLocation: "",
      eventNote: "",
      isAllDayEvent: false,
      uuid: "",
      rrule: ""
    },
    userCalendarEventsError: null,
    calendarSubscriptionErrors: null,
    calendarSubscriptionId: null,
    calendarColors: []
  }

  const localState = loadState("calendar")

  const [state, dispatch] = useReducer(
    calendarReducer,
    localState || initialState
  )

  useEffect(() => {
    saveState("calendar", state)
  }, [state])

  const getUserCalendars = async () => {
    dispatch({ type: IS_LOADING, payload: true })

    try {
      const calendars = await clientWithAuth("/users/calendars")

      dispatch({
        type: SET_CALENDARS_SUCCESS,
        payload: calendars.data.calendars
      })
    } catch (error) {
      console.log(error)
      dispatch({ type: SET_USER_CALENDAR_FAILURE, payload: error })
    }
  }
  const createUserCalendar = async calendar => {
    dispatch({ type: IS_LOADING, payload: true })
    try {
      const newCalendar = await clientWithAuth.post("/api/calendars", calendar)

      dispatch({
        type: CREATE_USER_CALENDAR_SUCCESS,
        payload: newCalendar.data
      })
    } catch (error) {
      console.log(error)
      dispatch({ type: SET_USER_CALENDAR_FAILURE, payload: error })
    }
  }
  const editUserCalendar = async (calendarUuid, changes) => {
    dispatch({ type: IS_LOADING, payload: true })

    try {
      const calendar = await clientWithAuth.put(
        `/api/calendars/${calendarUuid}`,
        changes
      )

      dispatch({ type: EDIT_USER_CALENDAR_SUCCESS, payload: calendar.data })
    } catch (error) {
      console.log(error)
      dispatch({ type: SET_USER_CALENDAR_FAILURE, payload: error })
    }
  }

  const editUserCalendarPrivacy = async (calendarUuid, isPrivate) => {
    //dispatch({ type: IS_LOADING, payload: true })
    try {
      const calendar = await clientWithAuth.put(
        `/api/calendars/${calendarUuid}/privacy`,
        isPrivate
      )

      dispatch({ type: EDIT_USER_CALENDAR_SUCCESS, payload: calendar.data })
    } catch (error) {
      console.log(error)
      dispatch({ type: SET_USER_CALENDAR_FAILURE, payload: error })
    }
  }
  const deleteUserCalendar = async calendarUuid => {
    dispatch({ type: IS_LOADING, payload: true })

    try {
      const calendar = await clientWithAuth.delete(
        `/api/calendars/${calendarUuid}`
      )

      if (calendar.data === 1) {
        dispatch({ type: DELETE_USER_CALENDAR_SUCCESS, payload: calendarUuid })
      }
    } catch (error) {
      console.log(error)
      dispatch({ type: SET_USER_CALENDAR_FAILURE, payload: error })
    }
  }

  const setCalendarSubscriptionId = calendarId => {
    dispatch({ type: SET_CALENDAR_SUBSCRIPTION_ID, payload: calendarId })
  }

  const subscribeToCalendar = async calendarId => {
    dispatch({ type: IS_LOADING, payload: true })

    try {
      const subscribedCalendar = await clientWithAuth.put(
        `/api/calendars/${calendarId}/subscriptions/?subscribe=true`
      )

      dispatch({
        type: SUBSCRIBE_TO_CALENDAR_SUCCESS,
        payload: subscribedCalendar.data
      })
    } catch (error) {
      console.log(error)
      dispatch({ type: CALENDAR_SUBSCRIPTION_FAILURE, payload: error })
    }
  }

  const unSubscribeCalendar = async calendarId => {
    dispatch({ type: IS_LOADING, payload: true })

    try {
      const unsubscribed = await clientWithAuth.put(
        `/api/calendars/${calendarId}/subscriptions/?subscribe=false`
      )

      if (unsubscribed.data === 1) {
        dispatch({ type: UNSUBSCRIBE_CALENDAR_SUCCESS, payload: calendarId })
      }
    } catch (error) {
      console.log(error)
      dispatch({ type: CALENDAR_SUBSCRIPTION_FAILURE, payload: error })
    }
  }

  const getMyCalendarEvents = async calendarUuid => {
    dispatch({ type: IS_LOADING, payload: true })

    try {
      const events = await clientWithAuth(
        `/api/calendars/${calendarUuid}/events`
      )

      dispatch({
        type: SET_MY_CALENDAR_EVENTS_SUCCESS,
        payload: events.data
      })
    } catch (error) {
      console.log(error)
      dispatch({ type: SET_MY_CALENDAR_EVENTS_FAILURE, payload: error })
    }
  }

  const createUserCalendarEvent = async (calendarUuid, event) => {
    dispatch({ type: IS_LOADING, payload: true })

    try {
      const newEvent = await clientWithAuth.post(
        `/api/calendars/${calendarUuid}/events`,
        event
      )
      dispatch({
        type: CREATE_CALENDAR_EVENT_SUCCESS,
        payload: { calendarUuid, event: newEvent.data }
      })
    } catch (error) {
      console.log(error)
      dispatch({ type: CRUD_OPS_CALENDAR_EVENT_FAILURE, payload: error })
    }
  }

  const editUserCalendarEvent = async (eventUuid, changes) => {
    dispatch({ type: IS_LOADING, payload: true })

    try {
      const updatedEvent = await clientWithAuth.put(
        `/api/events/${eventUuid}`,
        changes
      )

      dispatch({
        type: EDIT_CALENDAR_EVENT_SUCCESS,
        payload: updatedEvent.data
      })
    } catch (error) {
      console.log(error)
      dispatch({ type: CRUD_OPS_CALENDAR_EVENT_FAILURE, payload: error })
    }
  }

  const deleteUserCalendarEvent = async eventUuid => {
    dispatch({ type: IS_LOADING, payload: true })
    try {
      await clientWithAuth.delete(`/api/events/${eventUuid}`)

      dispatch({
        type: DELETE_CALENDAR_EVENT_SUCCESS,
        payload: eventUuid
      })
    } catch (error) {
      console.log(error)
      dispatch({ type: CRUD_OPS_CALENDAR_EVENT_FAILURE, payload: error })
    }
  }

  const setUserCalendar = async calendarUuid => {
    dispatch({ type: SET_USER_CALENDAR_SUCCESS, payload: calendarUuid })
  }

  const setUserCalendarEvent = event => {
    dispatch({ type: SET_USER_CALENDAR_EVENT, payload: event })
  }

  const setShowEvents = (calendarUuid, show) => {
    dispatch({ type: SET_SHOW_EVENTS, payload: { calendarUuid, show } })
  }

  const getCalendarColors = async () => {
    try {
      const colors = await clientWithAuth("/api/colors")
      dispatch({ type: SET_CALENDAR_COLORS_SUCCESS, payload: colors.data })
    } catch (error) {
      console.log(error)
      dispatch({ type: SET_CALENDAR_UTILITIES_FAILURE, payload: error })
    }
  }

  return (
    <CalendarContext.Provider
      value={{
        isLoading: state.isLoading,
        userCalendar: state.userCalendar,
        userCalendars: state.userCalendars,
        userCalendarsError: state.userCalendarsError,
        userCalendarEvents: state.userCalendarEvents,
        userCalendarEvent: state.userCalendarEvent,
        calendarSubscriptionId: state.calendarSubscriptionId,
        calendarSubscriptionErrors: state.calendarSubscriptionErrors,
        calendarColors: state.calendarColors,
        getUserCalendars,
        createUserCalendar,
        editUserCalendar,
        editUserCalendarPrivacy,
        deleteUserCalendar,
        setCalendarSubscriptionId,
        subscribeToCalendar,
        unSubscribeCalendar,
        getMyCalendarEvents,
        createUserCalendarEvent,
        editUserCalendarEvent,
        deleteUserCalendarEvent,
        setUserCalendar,
        setUserCalendarEvent,
        setShowEvents,
        getCalendarColors
      }}>
      {props.children}
    </CalendarContext.Provider>
  )
}
