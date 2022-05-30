import React from 'react'
import 'components/InterviewerList.scss'
import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList (props) {
  const { value, onChange, interviewers, state, day } = props;

  const people = interviewers(state, day).map(x => {
    return (
      <InterviewerListItem
        key={x.id}
        name={x.name}
        avatar={x.avatar}
        selected={x.id === value}
        setInterviewer={() => onChange(x.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {people}
      </ul>
    </section>
  );
} 