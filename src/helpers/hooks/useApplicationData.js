import React, { useState } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

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

    updateSpots(id, false);
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
        setState({
          ...state,
          appointments: appointments,
        })
      })
  }

  const setDay = day => setState ({...state, day});

  const [state, setState] = useState({
    day: '',
    days: [],
    appointments: {},
    interviewers: []
  })

  function cancelInterview(id, interview) {
    return axios.delete(`/api/appointments/${id}`, {id : {interview}})
    .then(updateSpots(id, true))
  }

  function updateSpots(id, increase) {
    console.log('state', state)
    console.log('id', id)

    const dayIndex = state.days.findIndex(d => state.day === d.name);
    let spots = state.days[dayIndex].spots
    console.log('state.days[dayIndex]', state.days[dayIndex])

    if (increase) {
      spots++
    } else {
      spots--
    }

    const day = {
      ...state.days[dayIndex], 
      spots: spots
    }

    let days = state.days

    days[dayIndex]=day

    setState({...state, days})
  }

  return {state, setState, setDay, bookInterview, cancelInterview}
}; 
