import React from 'react'
import { useState} from 'react'
import {useNavigation} from 'react-router-dom'


const Signup = () => {
  const [credentials, setCredentials] = useState({name:" ", Email: "", Password: "" ,cPasswordd:''})
  let Navigate = useNavigation();

  const handleSubmit = async (e) => {
      e.preventDefault();
      const { name, Email, Password} = credentials;
      //API call
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, Email,Password }),
      });
      const json = await response.json();
      console.log(json)
     //save the auth-token and redirect
        localStorage.setItem("token", json.authtoken);
        Navigate( "/")
      
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
}

  return (

    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="name" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp"/>
            
        </div>
        <div className="mb-3">
          <label htmlFor="Email1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="Email1" name="Email" onChange={onChange} aria-describedby="emailHelp"/>
            <div id="email" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="Password1" className="form-label">Password</label>
          <input type="password" className="form-control" name="Password" onChange={onChange} id="Password1" minLength={5} required/>
        </div> 
        <div className="mb-3">
          <label htmlFor="cPassword" className="form-label">Password</label>
          <input type="password" className="form-control" name="cPassword" onChange={onChange} id="cPassword" minLength={5} required/>
        </div>
       
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
