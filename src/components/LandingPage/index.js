import { Link } from 'react-router-dom'
import { FaList } from "react-icons/fa";
import { LuGrid2X2Check } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft,FaAngleRight} from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from 'react';
import axios from 'axios';
import CandidateCard from '../CandidateCard';

import "./index.css"
import Pagination from '../Pagination';
const LandingPage = () => {  
    const [candidateData,setCandidatesData] = useState([])
    const [filter,setFilter] = useState(false)
    const [searchInput,setSearchInput] = useState('')
    const [startIndexInfo,setStartIndex] = useState()
    const [endIndexInfo,setEndIndex] = useState()
    const [minExpValue,setMinValue] = useState()
    const [maxExpValue,setMaxValue] = useState()
    const clickOnFiler = () => {
        setFilter(!filter)
    }
    // console.log("Mon,Sun:",minExpValue,maxExpValue)

    

    useEffect(() => {
        const getCandidateData = async() => {
            const response = await axios.get('https://truleeinnovative-backend.onrender.com/api/all_candidates')
            const responseData = await response;
            setCandidatesData(responseData.data)
        }
        getCandidateData()
    },[])
    // console.log("candidateData:",candidateData)
    const filterCandidateData = candidateData.filter(data => (
        data.name.toLowerCase().includes(searchInput.toLowerCase())||
        data.email.toLowerCase().includes(searchInput.toLowerCase())||
        data.experience.includes(searchInput)||
        (data.experience>=minExpValue && data.experience<=maxExpValue)
    ))

    const skillsFilter = candidateData.map(data => {
        const filterSkills = data.skills.filter(skill => skill.toLowerCase().includes(searchInput.toLowerCase()))
        if(filterSkills.length > 0){
            return {...data,skills:filterSkills};
        }
        return null;
    })
    .filter(Boolean); //remove Nulls

    console.log("skillsFilter:",skillsFilter)
    // console.log("FilterCandidateData:",filterCandidateData)
    const startNumber = (start) =>{
        setStartIndex(start)
    }
    const endNumber = end => {
        setEndIndex(end)
    }

    // console.log("minExpValue,maxExpValue:",minExpValue,maxExpValue)

    const slicedFilteredData = filterCandidateData.slice(startIndexInfo,endIndexInfo)
    // console.log("slicedFilteredData:",slicedFilteredData)
    const slicedFilteredDataLength = slicedFilteredData.length
    return (
    <div className='landing_page_main_container'>
        <div className='landing_page_add_candidate_container'>
            <h3>Candidates</h3>
            <Link to="/add_candidate">
                <button type='button' className='add_button'>Add</button>
            </Link>
            </div>
            <div className='main_filter_section_container'>
                <div>
                    <FaList className='list_item'/>
                    <LuGrid2X2Check/>
                </div>
                <div className='search_filter_container'>
                    <div className='search_icon_input_container'> 
                        <IoIosSearch className='search_icon'/>
                        <input type='search' className='search_input' placeholder='Search by Candidate,email,phone..' onChange={(e) => setSearchInput(e.target.value)}/>
                    </div>
                    <p>1/1</p>
                    <button type="button" className='arrow_buttons'><FaAngleLeft className='prev_next_pics'/></button>
                    <button type="button" className='arrow_buttons'><FaAngleRight className='prev_next_pics'/></button>
                    <button type='button' className='arrow_buttons' onClick={clickOnFiler}>
                        <FiFilter className='prev_next_pics'/>
                    </button>
                </div>
            </div>
    
    <div className='candidate_list_filter_container'>
    <div className='candidate_list_container'>
    <div className='candidate_header_titles_container'>
        <h5 className='candidate_name'>Candidate Name</h5>
        <h5 className='candidate_email'>Email</h5>
        <h5 className='candidate_phone'>Phone</h5>
        <h5 className='higher_qualification'>Higher Qualification</h5>
        <h5 className='experience'>Current Experience</h5>
        <h5 className='technology'>Skills/Technology</h5>
        <h5 className='action'>Action</h5>
    </div>
        {slicedFilteredDataLength >0 ?
        <ul className='candidate_list_items_container'>
            {slicedFilteredData.map(candidate => (
                <CandidateCard candidateDetails={candidate} key={candidate._id} />
            ))}
        </ul>
        : 
        <div>
            <h4 className='no_records_found'>No Records Found</h4>
        </div>}
    </div>
    {filter && 
    <div className='filter_container'>
    <h4 className='filter_title'>Filter</h4>
    <hr/>
        <div className='skill_arrow_tech_container'>
            <label className='higher_qualification_checkbox'>
                <input type='checkbox' id="qualification"/> Higher qualification</label>
            <IoIosArrowDown/>
            </div>
            <div className='experience_min_max_container'>
            <p className='experience_title'>Experience:</p>
            <div className='experience_filter_container'>
                <input type='number' placeholder='Min' className='experience_input' onChange={(e)=>setMinValue(e.target.value)}/>
                <p>to</p>
                <input type='number' placeholder='Max' className='experience_input max_exp' onChange={(e)=>setMaxValue(e.target.value)}/>
            </div>
            </div>
            <div className='skill_arrow_tech_container'>
            <label className='higher_qualification_checkbox'>
                <input type='checkbox' id="skills"/>Skill/Technology
            </label>
            <IoIosArrowDown/>
            </div>
       </div>}
    </div>
    <Pagination candidateData={filterCandidateData} startNumber={startNumber} endNumber={endNumber}/>
    </div>
  )
}

export default LandingPage