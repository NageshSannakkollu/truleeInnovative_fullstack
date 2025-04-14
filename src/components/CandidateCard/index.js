import React from 'react'
import { BsThreeDots } from "react-icons/bs";

import "./index.css"
const CandidateCard = (props) => {
    const {candidateDetails}  =props 
    const {name,email,phone,experience,skills,imageUrl,qualification} = candidateDetails
  return (
    <>
    <li className='candidate_list_item'>
        <div className='image_name_container candidate_name'>
            <img src={imageUrl} alt={name} className='profile_pic'/>
            <p>{name}</p>
        </div>
        <p className='candidate_email email'>{email}</p>
        <p className='candidate_phone'>+91{phone}</p>
        <p className='higher_qualification'>{qualification}</p>
        <p className='experience'>{experience} Year(s)</p>
        <div className='technology_container'>
        {skills.map((eachSkill,index) => (
            <p key={index} className='each_skill'>{eachSkill},</p>
        ))}
        </div>
        <p className='action three_dots'><BsThreeDots/></p>
    </li>
    <hr className='hr_line'/>
    </>
  )
}

export default CandidateCard