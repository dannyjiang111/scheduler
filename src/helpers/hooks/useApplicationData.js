import React, { useState } from "react";
import axios from "axios";

export default function useApplicationData () {
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, {interview})
      .then(() => {
        setState({
          ...state,
          appointments: appointments
        })
      })
  }

  const setDay = day => setState ({...state, day});

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: []
  })

  function cancelInterview(id, interview) {
    return axios.delete(`/api/appointments/${id}`, {id : {interview}})
  }

  return {state, setState, setDay, bookInterview, cancelInterview}
}; 
