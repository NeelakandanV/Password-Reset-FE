import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { Url } from '../App';
import { TextField } from '@mui/material';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


const UserSchemaValidation = yup.object({
  Name:yup.string().required("!Kindly Enter your Name"),
  Mobile:yup.number().required("!Mobile number required").min(1000000000,"!Indian Mobile Numbers only").max(9999999999,"!Indian Mobile Numbers only allowed").positive("!Number should be positive"),
  Email: yup.string().email("!Invalid Email format").required("!Email required"),
  Password: yup.string().min(8,"!Password should be atleast 8 characters").required("!Password required")
})


function Signup() {
    const navigate = useNavigate();

  // Clearing session storage
  useEffect(()=>{
      sessionStorage.clear()
  },[])

  // Form Validation
  const{values,handleChange,handleBlur,handleSubmit,errors,touched} = useFormik({
      initialValues:{
          Name:"",
          Mobile:"",
          Email : "",
          Password : ""
      },
      validationSchema : UserSchemaValidation,
      onSubmit:(data)=>{
          verifySignup(data)
          //console.log(data)
      }
  })

  // Creating New User credentilals
  const verifySignup = async(data)=>{
      try{
          const verifyData = await axios.post(`${Url}Signup`,data,{
              headers:{
                  "Content-Type":"application/json",
              }
          })
          //console.log(verifyData)
          toast.success(verifyData.data.message)
          navigate('/')
      }
      catch(err){
          //console.log(err)
          toast.error(err.response.data.message)
      }
  }

  return (
    <div className='MainParent'>
        <div className='LoginCont'>
            <div className='ImageCont'>
                <img src="https://hips.hearstapps.com/hmg-prod/images/gub-1608133278.jpg"></img>
            </div>
            <div className='FormCont'>
                <h3>Welcome Back!!</h3>
                <form onSubmit={handleSubmit}>

                    <TextField fullWidth margin="dense" 
                        id = "outlined-helperText"
                        label = "Name"
                        helperText = "Enter Your Name"
                        name = "Name"
                        value = {values.Name}
                        onChange = {handleChange}
                        onBlur = {handleBlur} /><br/>
                        {errors.Name && touched.Name ? <p style={{color:"crimson"}}>{errors.Name}</p>:""}
                        
                    <TextField fullWidth margin="dense" 
                        id = "outlined-helperText"
                        label = "Mobile Number"
                        helperText = "Enter Your Mobile Number"
                        name = "Mobile"
                        value = {values.Mobile}
                        onChange = {handleChange}
                        onBlur = {handleBlur} /><br/>
                        {errors.Mobile && touched.Mobile ? <p style={{color:"crimson"}}>{errors.Mobile}</p>:""}

                    <TextField fullWidth margin="dense" 
                        id = "outlined-helperText"
                        label = "Email Id"
                        helperText = "Enter Your Email"
                        name = "Email"
                        value = {values.Email}
                        onChange = {handleChange}
                        onBlur = {handleBlur} /><br/>
                        {errors.Email && touched.Email ? <p style={{color:"crimson"}}>{errors.Email}</p>:""}
    
                    <TextField fullWidth margin="dense" 
                        id = "outlined-helperText"
                        label = "Password"
                        helperText = "Enter Your Password"
                        name = "Password"
                        value = {values.Password}
                        onChange = {handleChange}
                        onBlur = {handleBlur} /><br/>
                        {errors.Password && touched.Password ? <p style={{color:"crimson"}}>{errors.Password}</p>:""}
                    <Button type="submit" size="sm">Register</Button>
                    <hr></hr>
                    <label>Forgot your Password? :{" "}</label>
                    <Link to="/ForgotPassword">Click here!!</Link><br/>
                    <label>Already have an account! :{" "}</label>
                    <Link to="/">Login!!</Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signup