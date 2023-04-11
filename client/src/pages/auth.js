import { useState } from "react";
import axios from "axios";
import {cookie, useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

export const Auth = () => {
  return (
    <div className="auth">
      <Login/>
      <Register/>
    </div>
  )
}

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onSubmit = async(event) => {
    event.preventDefault() ;

    try {
      const response = await axios.post('http://localhost:5000/auth/login',{
        username,
        password,
      });

      console.log('this is response:\n', response);

      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.token);

      // navigate('/');

      alert('Login successfull.');

    } catch (err) {
      console.error(err);
    }
  }

  return <Form 
    username = {username}
    setUsername ={ setUsername}
    password = {password}
    setPassword ={ setPassword }
    label = "Login"
    onSubmit = {onSubmit}
  />
}

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async(event) => {
    event.preventDefault() ;

    try {
      const response = await axios.post('http://localhost:5000/auth/register',{
        username,
        password,
      });
      console.log(response);
      alert('Registration successfull.');

    } catch (err) {
      console.error(err);
    }
  }

  return <Form 
    username = {username}
    setUsername ={ setUsername}
    password = {password}
    setPassword ={ setPassword }
    label = "Register"
    onSubmit = {onSubmit}
  />
}

const Form = ({username, password, setPassword, setUsername, label, onSubmit}) => {
  return (

    <div className="auth-container">
      <form onSubmit={onSubmit}>
        <h2>{label}</h2>

        <div className="form-group">
          <label htmlFor="username"> Username: </label>
          <input type="text" 
          id="username" 
          value={username}
          onChange={(e)=> setUsername(e.target.value)}/>
        </div>

        <div className="form-group">
          <label htmlFor="password"> Password: </label>
          <input type="password" 
          id="password" 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div>
          <input type="submit" value={label} />
        </div>
      </form>
    </div>
  )
}