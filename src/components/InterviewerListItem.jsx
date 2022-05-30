import React from 'react'
import classNames from 'classnames';
import 'components/InterviewerListItem.scss'

export default function InterviewerListItem (props) {
  const { name, avatar, selected, setInterviewer } = props
  const InterviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': selected,
    'interviewers__item-image': selected
  })

  return (
    <li onClick={setInterviewer} className={InterviewerClass}>
      <img
        className={"interviewers__item-image"}
        src={avatar}
        alt={name}
      />
      {selected && name}

    </li>
  );
}; 