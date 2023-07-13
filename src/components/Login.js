import React, {useState}from 'react'
// import useHistory from 'react-router-dom'

const Login = (props) => {
    // let history = useHistory();

    const [credential , setCredential] = useState({email:"" , password:""})
    // const [password , setPassword] = useState("")
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST", 

            headers: {
              "Content-Type": "application/json",
            //   "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7fSwiaWF0IjoxNjg3NzYwNzYyfQ.3eqWq2iI6BNqWzyPgizfERaoJ1UNN4589oie2CUD82A"
            },
      
            // body: JSON.stringify({}),
            body: JSON.stringify({email:credential.email , password:credential.password}), 
 
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
            localStorage.setItem('token', json.authtoken)
            // history.push('/')
          }
          else{
            alert("invalid token")
          }
        
    }
    const onChange= (e)=>{
        setCredential({...credential ,[e.target.name]: e.target.value})
    }
  
  return (
    <div>
        <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" value={credential.email} onChange={onChange} id="email" name='email' aria-describedby="emailHelp"/>
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label" value={credential.password} onChange={onChange}>Password</label>
    <input type="password" class="form-control" id="password" name='password'/>
  </div>
 
  <button type="submit" class="btn btn-primary" >Submit</button>
</form>
      
    </div>
  )
}

export default Login
