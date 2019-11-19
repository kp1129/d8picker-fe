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
const setIsLoading = (state, action) => {
  return {
    ...state,
    isLoading: action.payload,
  }
}

const setUserCalendarsSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    userCalendars: action.payload,
  }
}

const setUserCalendarsFailure = (state, action) => {
  return {
    ...state,
    isLoading: false,
    userCalendarsError: action.payload,
  }
}
const setUserCalendar = (state, action) => {
  return {
    ...state,
    userCalendar: action.payload,
  }
}
const setUserCalendarEventsSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    userCalendarEvents: action.payload,
  }
}

const setUserCalendarEventsFailure = (state, action) => {
  return {
    ...state,
    isLoading: false,
    userCalendarEventsError: action.payload,
  }
}

const setCreateUserCalendarEventSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    userCalendarEvents: [...state.userCalendarEvents, action.payload],
  }
}

const setEditUserCalendarEventSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    userCalendarEvents: state.userCalendarEvents.map(event =>
      event.uuid === action.payload.uuid ? action.payload : event,
    ),
  }
}

const setDeleteUserCalendarEventSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    userCalendarEvents: state.userCalendarEvents.filter(
      event => event.uuid !== action.payload,
    ),
  }
}

const setCrudOpsCalendarEventFailure = (state, action) => {
  return {
    ...state,
    isLoading: false,
    userCalendarEventsError: action.payload,
  }
}

const setUserCalendarEvent = (state, action) => {
  return {
    ...state,
    userCalendarEvent: action.payload,
  }
}

const calendarReducer = (state, action) => {
  switch (action.type) {
    case IS_LOADING:
      return setIsLoading(state, action)
    case GET_CALENDARS_SUCCESS:
      return setUserCalendarsSuccess(state, action)
    case GET_CALENDARS_FAILURE:
      return setUserCalendarsFailure(state, action)
    case GET_CALENDAR_EVENTS_SUCCESS:
      return setUserCalendarEventsSuccess(state, action)
    case GET_CALENDAR_EVENTS_FAILURE:
      return setUserCalendarEventsFailure(state, action)
    case SET_USER_CALENDAR:
      return setUserCalendar(state, action)
    case CREATE_CALENDAR_EVENT_SUCCESS:
      return setCreateUserCalendarEventSuccess(state, action)
    case EDIT_CALENDAR_EVENT_SUCCESS:
      return setEditUserCalendarEventSuccess(state, action)
    case DELETE_CALENDAR_EVENT_SUCCESS:
      return setDeleteUserCalendarEventSuccess(state, action)
    case CRUD_OPS_CALENDAR_EVENT_FAILURE:
      return setCrudOpsCalendarEventFailure(state, action)
    case SET_USER_CALENDAR_EVENT:
      return setUserCalendarEvent(state, action)
    default:
      return state
  }
}

export default calendarReducer
