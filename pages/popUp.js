import React, { Component } from "react";
import popUp from '../components/popUp.module.css';
import axios from "axios";


let url = "https://covid-server-app.herokuapp.com/";


export default function PopUp(props) {

  const [name,changeName] = React.useState("");
  const [phone,changePhone] = React.useState("");
  const [region,changeRegion] = React.useState("");

  const handleClick = () => {
   props.toggle();
  };

  const handleChange= (e)=>{
    console.log(e.target.value)
    if(e.target.id === "name")
    {
      changeName(e.target.value)
    }
    if(e.target.id === "number")
    {
      changePhone(e.target.value)
    }
    if(e.target.id === "region")
    {
      changeRegion(e.target.value)
    }
  }



  const handleSubmit = (e)=>{
    e.preventDefault();
    let userData;
    
    let phonePattern = new RegExp(/^\d{10}$/);
    let res = phonePattern.test(phone);

    if(res)
    {
      const formData1 = [name,phone,region];
      console.log(formData1);
  
      axios.post(url,{
        name:name,
        phone:phone,
        region:region
      },{"headers": {
  
        "content-type": "application/json",
        
        }})
      .then((response)=>{
        console.log(response)
        
        if(response.status===200 && response.data==="phone number duplicated.Please try again")
        {
          alert("phone number already in database.\nPlease try again");
          props.toggle();
        }
        else if(response.status===200)
        {
          alert("successfully inserted record!");
          props.toggle();
        }
      })
      .catch((err)=>{
        console.log(err)
        alert(err,"\nPlease try again later..")
        props.toggle();
      })
    }

    else {
      alert("entered phone number must be a number, and must be of 10 digits!")
    }
  };
    // console.log(props.regionData[0])
  return (

     <div className={popUp.modal_content}>
     <span className={popUp.close} onClick={()=>{handleClick()}} >&times; </span>
      <div className={popUp.content}>
        <p className={popUp.description}>
          Enter your Name, Mobile Number and Region to receive daily updates via SMS
          for your region
        </p>

        <form  onSubmit={(e)=>{handleSubmit(e)}} className={popUp.form}>
          <label for="name">Enter name :</label><br/>
          <input type="text" name="name" id="name" value={name} onChange ={(e)=>{handleChange(e)}} required className={popUp.input}/><br/>

          <label for="number">Enter Phone Number :</label><br/>
          <input type="text" name="number" id="number" value={phone} onChange ={(e)=>{handleChange(e)}}  required className={popUp.input}/><br/>

          <label for="region">Select Region: </label><br/>
          <select name="regions" id="region" onChange ={(e)=>{handleChange(e)}} required className={popUp.inputSelect}>
              {
                props.regionData.map((regions)=>{
                  return (
                    <option value={regions} className={popUp.option}>{regions}</option>
                  )
                })
              }
          </select><br/>

          <button type="submit" className={popUp.submit} >Submit</button>

        </form>
      </div>
   </div>
  );
 
}