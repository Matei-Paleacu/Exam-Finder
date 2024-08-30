import React from 'react';

export default function Exam(props) {
    let url = ""
    if (props.examInfo.bldgRmRows !== "ON LINE"){
        url = props.examInfo.bldgRmRows.split(" ")[0];
    }
    
  return (
    <tr>
      <td>{props.examInfo.dept}</td>
      <td>{props.examInfo.subject} {props.examInfo.courseno} {props.examInfo.section}</td>
      <td>{props.examInfo.examStartDate}</td>
      <td>{props.examInfo.examStartTime}</td>
      <td>{props.examInfo.examDuration}</td>
      <td>{props.examInfo.examEndDate}</td>
      <td>{props.examInfo.examEndTime}</td>
      {url ? <td><a href={`https://carleton.ca/campus/map/#${url}`} target="_blank" rel="noopener noreferrer">{props.examInfo.bldgRmRows}</a></td>:<td>{props.examInfo.bldgRmRows}</td>}
      <td>{props.examInfo.examavailability}</td>
    </tr>
  );
}

  // dept \subject courseno section\ examStartDate\ examStartTime\ 180 \ examEndDate \ examEndTime \ bldgRmRows \ examavailability