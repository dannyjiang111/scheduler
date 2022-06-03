import React from 'react'
import 'components/InterviewerList.scss'
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types'

export default function InterviewerList (props) {
  const { value, onChange, interviewers } = props;

  const people = interviewers.map(x => {
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}; 