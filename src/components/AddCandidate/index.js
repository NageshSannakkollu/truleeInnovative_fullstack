import React,{useState} from 'react'
import axios from 'axios'
import { defaultSkills, experienceList, genderList, higherQualification } from '../../constants/Contstants'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import "./index.css"
const AddCandidate = () => {
    const [data,setData] = useState({
      name:"",
      imageUrl:"https://res.cloudinary.com/dksgsqhdk/image/upload/v1744425759/cropped-Logo-TI-1.jpg_gsw2em.webp",
      phone:9807654321,
      email:'',
      gender:'Male',
      experience:"0",
      qualification:""
    })
    const [skillSet,setSkillSet] = useState([])
    const navigate =useNavigate()
    const addSkills = event => {
        const selectedValue = event.target.value 
        if(selectedValue && !skillSet.includes(selectedValue)){
            setSkillSet([...skillSet,selectedValue])
        }
    }

    const addCandidateHandler = async(event) => {
        event.preventDefault()
        const candidateDetails = {...data,skillSet}
        // console.log("candidateDetails:",candidateDetails)
        try {
            const response = await axios.post('http://localhost:3029/api/register',candidateDetails)
            console.log(response)
            if(response.data.success){  
              toast.success(response.data.message)
              navigate("/")
            }else{
              toast.error(response.data.message)
          }
        } catch (error) {
          console.log(`Error at:${error.message}`)
        }
    }   
    
  return (
    <div className='add_candidate_main_container'>
    <div className='add_candidate_popup_container'>
    <form className='add_candidate_form_container' onSubmit={addCandidateHandler}>
    <h3 className='add_candidate_title'>Add Candidate</h3>
    <div className='name_phone_container'>
        <div className='name_phone_inside_container'>
            <label>Candidate Name :</label>
            <input type='text' placeholder='Enter name...' className="add_candidate_input_form" onChange={(e) => setData({...data,name:e.target.value})} required/>
        </div>
        <div className='name_phone_inside_container'>
            <label>Image Url :</label>
            <input type='text' placeholder='Enter url...' className="add_candidate_input_form" onChange={(e) => setData({...data,imageUrl:e.target.value})}/>
        </div>
        </div>
        <div className='name_phone_container'>
          <div className='name_phone_inside_container'>
            <label>Phone Number :</label>
            <input type='number' placeholder='Enter phone...' className="add_candidate_input_form" onChange={(e) => setData({...data,phone:e.target.value})} required/>
          </div>    
        <div className='name_phone_inside_container'>   
            <label>Email :</label>
            <input type='email' placeholder='Enter email...' className="add_candidate_input_form" onChange={(e) => setData({...data,email:e.target.value})} required/>
        </div>
        </div>
        <div className='gender_container'>
            <div className='name_phone_inside_container'>
            <label>Gender :</label>
            <select className="add_candidate_input_form select_input_form" onChange={(e) => setData({...data,gender:e.target.value})} >
                {genderList.map(eachGender => (
                <option key={eachGender.id} value={eachGender.gender}>{eachGender.gender}</option>
                ))}
            </select>
            </div>
            <div className='name_phone_inside_container'>
            <label>Experience :</label>
            <select className="add_candidate_input_form select_input_form" onChange={(e) => setData({...data,experience:e.target.value})}>
                {experienceList.map(exp => (
                <option key={exp.id} value={exp.value}>{exp.experience}</option>
                ))}
            </select>
            </div>
        </div>
        <div className='gender_container'>
            <div className='name_phone_inside_container'>
            <label>Skills :</label>
            <select className="add_candidate_input_form select_input_form" onChange={addSkills}>
            {defaultSkills
            .filter((eachSkill) => !skillSet.includes(eachSkill))
            .map(eachSkill => (
                <option key={eachSkill.id} value={eachSkill.skill}>{eachSkill.skill}</option>
            ))}
        </select>
        </div>
         <div className='name_phone_inside_container'>
        <label>Higher Qualification :</label>
            <select className="add_candidate_input_form select_input_form" onChange={(e) => setData({...data,qualification:e.target.value})}>
            {higherQualification.map(branch => (
                <option key={branch.id}>{branch.qualification}</option>
            ))}
        </select>
        </div>
        </div>
        <br/>
        <button type="submit" className='add_candidate_button'>Add Candidate</button>
    </form>
</div>
</div>
  )
}

export default AddCandidate