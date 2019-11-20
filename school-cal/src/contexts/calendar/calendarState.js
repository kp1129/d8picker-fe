import React, { createContext, useEffect, useReducer } from "react"
import {
  IS_LOADING,
  GET_CALENDARS_SUCCESS,
  GET_CALENDARS_FAILURE,
  GET_CALENDAR_EVENTS_SUCCESS,
  GET_CALENDAR_EVENTS_FAILURE,
  CREATE_CALENDAR_EVENT_SUCCESS,
  EDIT_CALENDAR_EVENT_SUCCESS,
  DELETE_CALENDAR_EVENT_SUCCESS,
  CRUD_OPS_CALENDAR_EVENT_FAILURE,
  SET_USER_CALENDAR,
  SET_USER_CALENDAR_EVENT,
} from "./types"

import calendarReducer from "./calendarReducer"
import { clientWithAuth } from "../../utilities/api"
import { loadState, saveState } from "../../utilities/localStorage"
import moment from "moment"
export const CalendarContext = createContext()

export const CalendarState = props => {
  const initialState = {
    isLoading: false,
    userCalendars: [],
    userCalendarsError: null,
    userCalendar: null,
    userCalendarEvents: [],
    userCalendarEvent: {
      startTime: moment(),
      endTime: moment(),
      eventTitle: "",
      eventLocation: "",
      eventNote: "",
      isAllDayEvent: false,
      uuid: "",
    },
    userCalendarEventsError: null,
  }

  const localState = loadState("calendar")

  const [state, dispatch] = useReducer(
    calendarReducer,
    localState || initialState,
  )

  useEffect(() => {
    saveState("calendar", state)
  }, [state])

  const getUserCalendars = async () => {
    dispatch({ type: IS_LOADING, payload: true })

    try {
      const calendars = await clientWithAuth("/users/calendars")

      dispatch({
        type: GET_CALENDARS_SUCCESS,
        payload: calendars.data.calendars,
      })
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_CALENDARS_FAILURE, payload: error })
    }
  }

  const getUserCalendarEvents = async calendarUuid => {
    dispatch({ type: IS_LOADING, payload: true })

    try {
      const events = await clientWithAuth(
        `/api/calendars/${calendarUuid}/events`,
      )

      dispatch({ type: GET_CALENDAR_EVENTS_SUCCESS, payload: events.data })
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_CALENDAR_EVENTS_FAILURE, payload: error })
    }
  }

  const createUserCalendarEvent = async (calendarUuid, event) => {
    dispatch({ type: IS_LOADING, payload: true })

    try {
      const newEvent = await clientWithAuth.post(
        `/api/calendars/${calendarUuid}/events`,
        event,
      )
      dispatch({ type: CREATE_CALENDAR_EVENT_SUCCESS, payload: newEvent.data })
    } catch (error) {
      console.log(error)
      dispatch({ type: CRUD_OPS_CALENDAR_EVENT_FAILURE, payload: error })
    }
  }

  const editUserCalendarEvent = async (eventUuid, changes) => {
    dispatch({ type: IS_LOADING, payload: true })

    try {
      const updatedEvent = await clientWithAuth.put(
        `/api/calendars/events/${eventUuid}`,
        changes,
      )

      dispatch({
        type: EDIT_CALENDAR_EVENT_SUCCESS,
        payload: updatedEvent.data,
      })
    } catch (error) {
      console.log(error)
      dispatch({ type: CRUD_OPS_CALENDAR_EVENT_FAILURE, payload: error })
    }
  }

  const deleteUserCalendarEvent = async eventUuid => {
    dispatch({ type: IS_LOADING, payload: true })
    try {
      await clientWithAuth.delete(`/api/calendars/events/${eventUuid}`)

      dispatch({
        type: DELETE_CALENDAR_EVENT_SUCCESS,
        payload: eventUuid,
      })
    } catch (error) {
      console.log(error)
      dispatch({ type: CRUD_OPS_CALENDAR_EVENT_FAILURE, payload: error })
    }
  }

  const setUserCalendar = calendarUuid => {
    dispatch({ type: SET_USER_CALENDAR, payload: calendarUuid })
  }

  const setUserCalendarEvent = event => {
    dispatch({ type: SET_USER_CALENDAR_EVENT, payload: event })
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
        getUserCalendars,
        getUserCalendarEvents,
        createUserCalendarEvent,
        editUserCalendarEvent,
        deleteUserCalendarEvent,
        setUserCalendar,
        setUserCalendarEvent,
      }}>
      {props.children}
    </CalendarContext.Provider>
  )
}
