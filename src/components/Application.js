import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios"
import { getAppointmentsForDay, getInterview } from "helpers/selectors";

export default function Application(props) {
  const setDay = day => setState ({...state, day});
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: []
  })
  const dailyAppointments = getAppointmentsForDay(state, state.day);
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

  function cancelInterview(id, interview) {
    return axios.delete(`/api/appointments/${id}`, {id : {interview}})
  }

  const arrOfAppt = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
    <Appointment
      key={appointment.id}
      {...appointment}
      state = {state}
      day = {state.day}
      interview = {interview}
      bookInterview = {bookInterview}
      cancelInterview ={cancelInterview}
    /> )
  }) 

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then ((all) => {
      setState(prev => ({ ...prev, days : all[0].data }));
      setState(prev => ({ ...prev, appointments : all[1].data }));
      setState(prev => ({ ...prev, interviewers : all[2].data }));
    })
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
      <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList 
          days={state.days} 
          value={state.day} 
          onChange={setDay} 
        />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {arrOfAppt}
      </section>
    </main>
  );
}
