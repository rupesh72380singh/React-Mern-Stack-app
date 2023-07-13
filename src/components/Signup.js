import React , {useState}from 'react'
// import { note } from '../../Backend/models/User'
import {useNavigate} from 'react-router-dom'

const Signup = (props) => {
    const [credential , setCredential] = useState({name:"", email:"" , password:"", cpassword:""})
    // let history = useHistory();
    let navigate = useNavigate();

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const {name ,email, password } = credential;

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST", 

            headers: {
              "Content-Type": "application/json",
            //   "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjg3NzYwNzYyfQ.3eqWq2iI6BNqWzyPgizfERaoJ1UNN4589oie2CUD82A"
            },
      
            // body: JSON.stringify({}),
            body: JSON.stringify({name , email, password}), 
 
          });
          const json = await response.json();
          console.log(json);
      
            localStorage.setItem('token', json.authtoken)
            // history.push('/')
            navigate("/createuser")
        
        }
    const onChange= (e)=>{
        setCredential({...credential ,[e.target.name]: e.target.value})
    }
  
  return (
    <div >
    <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="email" class="form-label">Name</label>
    <input type="name" class="form-control" onChange={onChange} id="name" name='name' aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
    <div className="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" onChange={onChange} id="email" name='email' aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label"  onChange={onChange}>Password</label>
    <input type="password" class="form-control" id="password" name='password' minLength={5} required/>
  </div>
 
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label"  onChange={onChange}>ComfirmPassword</label>
    <input type="cpassword" class="form-control" id="cpassword" name='cpassword' minLength={5} required/>
  </div>
 
  <button type="submit" class="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Signup
