import React from 'react';


export default function Home(){
    let projectLink = <a href={"https://github.com/Matei-Paleacu/exam-finder"} target="_blank" rel="noopener noreferrer">GitHub</a>
    return (
      <div>
        <h1 className='home--title'>Welcome to Exam Finder</h1>
        <p className='home--text'> 
            Navigate to the "Find Exams" tab and search for your exams for the current semester.
            <br/> Currently Exam Finder is only updated with Summer 2024 classes, we will update the exam schedule as it is made available by the Univeristy.
            <br/><br/> This is a project build by Matei Paleacu 2024 without official affiliation to Carleton Univeristy.
            <br/> All the code can be found at this GitHub Repo: {projectLink}.
        </p>
      </div>
    )
  }