import {
  IS_LOADING,
  SET_CALENDARS_SUCCESS,
  SET_USER_CALENDAR_SUCCESS,
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
  SET_USER_CALENDAR_EVENT,
  SET_SHOW_EVENTS,
  SET_CALENDAR_COLORS_SUCCESS,
  SET_CALENDAR_UTILITIES_FAILURE,
} from "./types"

const calendarFormat = calendar => {
  return {
    ...calendar,
    events: [],
    showEvents: calendar.isDefault === 1 ? true : false,
    isDefault: calendar.isDefault === 1 ? true : false,
    isOwner: calendar.isOwner === 1 ? true : false,
    isPrivate: calendar.isPrivate === 1 ? true : false,
  }
}

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
    userCalendars: action.payload.map(calendarFormat),
  }
}

const setUserCalendarsFailure = (state, action) => {
  return {
    ...state,
    isLoading: false,
    userCalendarsError: action.payload,
  }
}
const setUserCalendarSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    userCalendar: calendarFormat(action.payload),
    userCalendars: state.userCalendars.map(calendar =>
      calendar.uuid === action.payload.uuid
        ? calendarFormat(action.payload)
        : calendar,
    ),
  }
}
const setCreateUserCalendarSuccess = (state, action) => {
  const calendar = calendarFormat(action.payload)

  return {
    ...state,
    isLoading: false,
    userCalendars: [...state.userCalendars, calendar],
    userCalendar: calendar,
  }
}
const setEditUserCalendarSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    userCalendar: calendarFormat(action.payload),
    userCalendars: state.userCalendars.map(calendar =>
      calendar.uuid === action.payload.uuid
        ? calendarFormat(action.payload)
        : calendar,
    ),
  }
}

const setDeleteUserCalendarSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    userCalendars: state.userCalendars.filter(
      calendar => calendar.uuid !== action.payload,
    ),
    userCalendar: state.userCalendars.find(calendar => calendar.isDefault),
  }
}

const setCalendarSubscriptionId = (state, action) => {
  return {
    ...state,
    calendarSubscriptionId: action.payload,
  }
}
const setSubscribedCalendarsSuccess = (state, action) => {
  const calendar = calendarFormat(action.payload)
  return {
    ...state,
    isLoading: false,
    userCalendars: [...state.userCalendars, calendar],
  }
}
const setUnsubscribeCalendarSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    subscribedCalendars: state.subscribedCalendars.filter(
      calendar => calendar.uuid !== action.payload,
    ),
  }
}

const setCalendarSubscriptionFailure = (state, action) => {
  return {
    ...state,
    isLoading: false,
    calendarSubscriptionErrors: action.payload,
  }
}

const setMyCalendarEventsSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    userCalendars: [
      ...state.userCalendars.map(calendar => {
        if (calendar.uuid === action.payload.calendarUuid) {
          calendar.events = action.payload.events

          return calendar
        } else {
          return calendar
        }
      }),
    ],
  }
}

const setMyCalendarEventsFailure = (state, action) => {
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
    userCalendars: [
      ...state.userCalendars.map(calendar => {
        if (calendar.uuid === action.payload.calendarUuid) {
          calendar.events = [...calendar.events, action.payload.event]
        }
        return calendar
      }),
    ],
  }
}

const setEditUserCalendarEventSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    userCalendars: [
      ...state.userCalendars.map(calendar => {
        calendar.events = calendar.events.map(event =>
          event.uuid === action.payload.uuid ? action.payload : event,
        )

        return calendar
      }),
    ],
  }
}

const setDeleteUserCalendarEventSuccess = (state, action) => {
  return {
    ...state,
    isLoading: false,
    userCalendars: [
      ...state.userCalendars.map(calendar => {
        calendar.events = calendar.events.filter(
          event => event.uuid !== action.payload,
        )
        return calendar
      }),
    ],
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

const setShowEvents = (state, action) => {
  return {
    ...state,
    userCalendars: [
      ...state.userCalendars.map(calendar => {
        if (calendar.uuid === action.payload.calendarUuid) {
          calendar.showEvents = action.payload.show
          return calendar
        } else {
          return calendar
        }
      }),
    ],
  }
}

const setCalendarColorsSuccess = (state, action) => {
  return {
    ...state,
    calendarColors: action.payload,
  }
}

const calendarReducer = (state, action) => {
  switch (action.type) {
    case IS_LOADING:
      return setIsLoading(state, action)
    case SET_CALENDARS_SUCCESS:
      return setUserCalendarsSuccess(state, action)
    case SET_USER_CALENDAR_SUCCESS:
      return setUserCalendarSuccess(state, action)
    case SET_USER_CALENDAR_FAILURE:
      return setUserCalendarsFailure(state, action)
    case CREATE_USER_CALENDAR_SUCCESS:
      return setCreateUserCalendarSuccess(state, action)
    case EDIT_USER_CALENDAR_SUCCESS:
      return setEditUserCalendarSuccess(state, action)
    case DELETE_USER_CALENDAR_SUCCESS:
      return setDeleteUserCalendarSuccess(state, action)
    case SET_CALENDAR_SUBSCRIPTION_ID:
      return setCalendarSubscriptionId(state, action)
    case SUBSCRIBE_TO_CALENDAR_SUCCESS:
      return setSubscribedCalendarsSuccess(state, action)
    case UNSUBSCRIBE_CALENDAR_SUCCESS:
      return setUnsubscribeCalendarSuccess(state, action)
    case CALENDAR_SUBSCRIPTION_FAILURE:
      return setCalendarSubscriptionFailure(state, action)
    case SET_MY_CALENDAR_EVENTS_SUCCESS:
      return setMyCalendarEventsSuccess(state, action)
    case SET_MY_CALENDAR_EVENTS_FAILURE:
      return setMyCalendarEventsFailure(state, action)

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
    case SET_SHOW_EVENTS:
      return setShowEvents(state, action)
    case SET_CALENDAR_COLORS_SUCCESS:
      return setCalendarColorsSuccess(state, action)
    default:
      return state
  }
}

export default calendarReducer
