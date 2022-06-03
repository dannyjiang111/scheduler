import React from 'react'
import './styles.scss'
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'helpers/hooks/useVisualMode';
import Form from './Form'
import { getInterviewersForDay } from 'helpers/selectors';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment (props) {
  const EMPTY = 'EMPTY';
  const SHOW = 'SHOW';
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';
  const ERROR_SAVE= 'ERROR_SAVE';
  const ERROR_DELETE= 'ERROR_DELETE';
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
      .then(() => (transition(SHOW)))
      .catch((err) => (transition(ERROR_SAVE, true)))
  };

  function deleteInterview (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(DELETING, true);

    props.cancelInterview(props.id, interview)
      .then(() => (transition(EMPTY)))
      .catch((err) => (transition(ERROR_DELETE, true)));
  };

  return (
    <div className={'appointment'}>
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && 
        <Form 
          interviewers={getInterviewersForDay(props.state, props.day)}  
          onCancel={back} 
          onSave={save} 
          />}
        {mode === EDIT && 
          <Form
          interviewers={getInterviewersForDay(props.state, props.day)}  
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={back} 
          onSave={save} 
        />}
      {(mode === SHOW && props.interview.interviewer) &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      }
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === CONFIRM && 
        <Confirm 
          message='Delete the appointment?' 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onConfirm={deleteInterview}
          onCancel={back}
        />}
      {mode === ERROR_DELETE && <Error message="Could not delete the appointment." onClose={back}/>}
      {mode === ERROR_SAVE && <Error message="Could not save the appointment." onClose={back}/>}
    </div>
  );
}; 