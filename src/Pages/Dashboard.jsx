import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Url } from '../App';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';

function Dashboard(){
    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const [user,setUser] = useState([]);

    // Logout 
    const logout = ()=>{
        sessionStorage.clear()
        toast.error("!Logged Out")
        navigate("/")
    }

    // For Deleting User
    const DeleteUser = async(Email)=>{
        try{
            const popUser = await axios.delete(`${Url}delete/${Email}`)
            //console.log(popUser)
            toast.success(popUser.data.message)
         }
        catch(err){
            toast.error("!User not Deleted")
        }
    }

    //Getting Data
    const getData = async()=>{
      try{
          const response = await axios.get(`${Url}Dashboard`,{
              headers:{
                  "Authorization" : `Bearer ${token}`,
                  "Content-Type" : "application/json" 
              }
          })
          const Details = await response.data
          setUser(Details)
          //console.log(user,Details)
          toast.success("Data Fetched Successfully!")
      }
      catch(err){
          //console.log(err)
          toast.error("Unauthorized!")
          logout()
      }
    }

    //Finding Token
    useEffect(()=>{
        if(token){
          setTimeout(()=>alert("If you want, you can delete your data only!"),1000)
          getData()
        }
        else{
          logout()
        }
    },[])

  return (
    <div>
      <div className='LogoutCont' onClick={()=>{logout()}}><Button variant="danger">Logout</Button></div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {user.map((val,ind)=>(
              <tr key={ind}>
                <td>{ind+1}</td>
                <td>{val.Name}</td>
                <td>{val.Mobile}</td>
                <td>{val.Email}</td>
                <td>{val.Role}</td>
                <td><Button variant="danger" onClick={()=>DeleteUser(val.Email)}>Delete</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
    </div>
  )
}

export default Dashboard
