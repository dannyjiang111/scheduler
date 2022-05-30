import React from 'react'

export function getAppointmentsForDay(state, day) {
  if (!day) return []

  const filteredDay = state.days.filter(date => date.name === day)[0];  
  const apptForDay = [];

  if (filteredDay) {
    for (const id of filteredDay.appointments) {
      if (state.appointments[id]) {
        apptForDay.push(state.appointments[id])
      }
    }
  }

  return apptForDay;
}

export function getInterviewersForDay(state, day) {
  if (!day) return []

  const filteredInterviewers = state.days.filter(date => date.name === day)[0];  
  const interviewersForDay = [];

  if (filteredInterviewers) {
    for (const id of filteredInterviewers.interviewers) {
      if (state.interviewers[id]) {
        interviewersForDay.push(state.interviewers[id])
      }
    }
  }

  return interviewersForDay;
}

export function getInterview(state, interview) {
  if(!interview) return null;

  let interviewInfo = {
      student : interview.student,
      interviewer: state.interviewers[interview.interviewer]
  };

  return interviewInfo;
} 