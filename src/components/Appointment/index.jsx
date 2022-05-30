import React, { Fragment } from 'react'
import './styles.scss'
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'helpers/hooks/useVisualMode';
import Form from './Form'
import { getInterviewersForDay } from 'helpers/selectors';
import Status from './Status';
import Confirm from './Confirm';

export default function Appointment (props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)

    props.bookInterview(props.id, interview)
      .then(() => (transition(SHOW)));
  };

  function deleteInterview (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(DELETING);

    props.cancelInterview(props.id, interview)
      .then(() => (transition(EMPTY)));
  };

  return (
    <div className={'appointment'}>
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && 
        <Form 
          interviewers={getInterviewersForDay} 
          onCancel={back} 
          state={props.state} 
          day={props.day} 
          onSave={save} 
        />}
      {mode === SHOW && 
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          state={props.state}
          onDelete={deleteInterview}
        />
      }
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === CONFIRM && 
        <Confirm 
          message='Delete the appointment?' 
        />}
    </div>
  );
}; 