import React, { useState } from 'react'
import { defaultPagesValues } from '../../constants/Contstants';
import { GrFormPreviousLink,GrFormNextLink } from "react-icons/gr";

import "./index.css"
const Pagination = (props) => {
  const {candidateData,startNumber,endNumber} = props 
  const [defaultProductsValue,setDefaultProductsValue] = useState(defaultPagesValues[0].value)
  const [currentPage,setCurrentPage] = useState(0);
  const startIndex = currentPage*defaultProductsValue; //1*15=15; 2*15=30;
  const endIndex = parseInt(startIndex)+parseInt(defaultProductsValue); //15+15=30;30+15=45;
  console.log("startIndex,endIndex:",startIndex,endIndex)
  startNumber(startIndex);
  endNumber(endIndex);

  
  const clickOnPageNumber = n => {
    setCurrentPage(n)
  }

  const onChangeProductsValue = (e) => {
    setDefaultProductsValue(e.target.value)
  }
  // console.log("DefaultProductsValue:",defaultProductsValue)
  const numberOfDefaultPages = Math.ceil(candidateData.length/defaultProductsValue)
  // console.log("numberOfDefaultPages,CurrentPage:",numberOfDefaultPages,currentPage)

  //console.log("numberOfDefaultPages:",numberOfDefaultPages)
  const clickOnLeftArrow = () => {
    if(currentPage > 0){
      setCurrentPage(prev => prev-1)
    }
  }

    const clickOnRightArrow = () => {
    if(currentPage < numberOfDefaultPages-1){
      setCurrentPage(prev => prev+1)
    }
  }

  return (
      <div className='default_select_products_value_products'>
      <div className='pagination_list_container'>
        <button type='button' disabled={currentPage===0} className='arrow_buttons' onClick={clickOnLeftArrow}><GrFormPreviousLink/></button>
        {[...Array(numberOfDefaultPages).keys()].map(n => <button type='button' key={n} className={`page_buttons ${currentPage=== n ? "active_tab":""}`} onClick={() => clickOnPageNumber(n)}>{n+1}</button>)}
        <button type='button' disabled={currentPage===numberOfDefaultPages-1} onClick={clickOnRightArrow}><GrFormNextLink/></button>
      </div>
      <select onChange={onChangeProductsValue} className='page_limit_select_value'>
        {defaultPagesValues.map(page => (
          <option key={page.id}>{page.value}</option>
        ))}
        </select>
    </div>
  )
}

export default Pagination