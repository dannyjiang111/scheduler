import { useState } from "react";
import axios from "axios";

export default function useApplicationData () {

  //updates the db to add new appointment
  function bookInterview(id, interview) {
    const prevAppointment = {...state.appointments[id]}

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const updatedDays = updateSpots(id, false)

    return axios.put(`/api/appointments/${id}`, {interview})
    .then(() => {
       //checks to see if prev interview appt already exists (for the edit function to not update spots)
      if (!prevAppointment.interview) { 
        return setState({
          ...state,
          appointments: appointments,
          days: updatedDays
        }) 
       }
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

  //updates db to delete an appointment interview
  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then( () => {
      const updatedDays = updateSpots(id, true)
      setState({
         ...state,
         appointments: appointments,
         days: updatedDays
        })
    })
  }

  //returns an object with the updated spots
  function updateSpots(id, increase) {
    const dayIndex = state.days.find(d => state.day === d.name);
    let spots = dayIndex.spots

    if (increase) {
      spots++
    } else {
      spots--
    }

    const day = {
      ...dayIndex,  
      spots: spots
    }

    //returns the object for the specified day
    let days = state.days.map((e) => {
      if(e.name === day.name) {
        return day;
      } 
      return e;
    })
    
     return days;
  }

  return {state, setState, setDay, bookInterview, cancelInterview}
}; 
