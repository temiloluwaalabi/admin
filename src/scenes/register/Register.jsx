import React, { useEffect, useRef, useState } from 'react'
import axios from '../../../api/axios'
import Navbar from '../../../components/navbar/Navbar'
import { TiTimes } from 'react-icons/ti'
import "./Register.css"
import loginImg from '../../../assets/login.png'
import logo from '../../../assets/logo.png'
import { BsCheckAll } from 'react-icons/bs'
import { Link, useLocation, useNavigate } from 'react-router-dom'


const REGISTER_URL = '/auth/register'
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,10}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const errRef = useRef();    
    const from = location.state?.from?.pathname || "/";
    const initalState = {
        firstname: "",
        email: "",
        username: "",
        password: "",
        lastname: ""
    }
    const [formData, setFormData] = useState(initalState)
    const { firstname, lastname, username, email, password } = formData
    const [uCase, setUCase] = useState(false)
    const [num, setNum] = useState(false)
    const [sChar, setSChar] = useState(false)
    const [passLength, setPassLength] = useState(false)
    const [validUserName, setValidUserName] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    const timesIcon = <TiTimes color="red" size={15} />
    const checkIcon = <BsCheckAll color='green' size={15} />
    const switchIcon = (condition) => {
        if (condition) {
            return checkIcon
        }
        return timesIcon

    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    useEffect(() => {
        //check lower and uppercase
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)
        ) {
            setUCase(true)
        } else {
            setUCase(false)
        }
        if (password.match(/([0-9])/)
        ) {
            setNum(true)
        } else {
            setNum(false)
        }
        if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)
        ) {
            setSChar(true)
        } else {
            setSChar(false)
        }
        if (password.length > 5)
        {
            setPassLength(true)
        } else {
            setPassLength(false)
        }
    }, [password])

    useEffect(() => {
        const result = USER_REGEX.test(username);
        setValidUserName(result)
    }, [username])

    useEffect(() => {
        setErrMsg('');
    }, [username, email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);

        if(!v1 || !v2){
            setErrMsg("Invalid Entry");
            return;
        }

        try{
            const response = await axios.post(
                REGISTER_URL, JSON.stringify({
                    username: username, 
                    email:email,
                    password: password, 
                    firstname:firstname, 
                    lastname:lastname
                }),
            {
                headers: {"Content-Type": "application/json"},
            }    
            );
            navigate('/courses')
            setSuccess(true);
            setFormData(initalState);
            // setUserName("");
            // setPassWord  ("");
            // setEmail("");
            // setFirstName("");
            // setLastName("");

        }catch(err){
            if(!err?.response){
                setErrMsg("No server response")
            }else if (err.response?.status === 409) {
                setErrMsg("Email already exists")
            }else{
                setErrMsg("Registration Failed")
            }
            errRef.current.focus()
        }
        console.log(username, password, email, firstname, lastname);
    }
      

    return (
        <div className='register'>
            <div className='register__container'>
                {/* <nav>
              <img src={logo} alt="" />
              <a className='pass_btn' href='/'>Home</a>
              <button className='pass_btn'><a href='/login'>Sign In</a></button>
             
            </nav> */}
                <div className='register_form'>
                <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"}>{errMsg}</p>
                    <form action="" onSubmit={handleSubmit}>
                        <div className='registerForm'>
                            <div className='redirect'>
                                <h4 className='headText'>Become A Member!</h4>
                                <p className='forgotPass'>Already registered? <Link to="/login">Sign In</Link></p>
                            </div>
                            <p className={userFocus && !validUserName ? "instructions" : "offscreen"}>Username should be 10 characters</p>
                            <div className='form__group'>
                                <div className="form__container">
                                    <label htmlFor="">Firstname</label>
                                    <input
                                        type="text"
                                        placeholder='Enter your firstname'
                                        name="firstname"
                                        onChange={handleChange}
                                        value={firstname}
                                    />
                                </div>
                                <div className="form__container">
                                    <label htmlFor="">Lastname</label>
                                    <input
                                        type="text"
                                        placeholder='Enter your lastname'
                                        name="lastname"
                                        onChange={handleChange}
                                        value={lastname}
                                    />
                                </div>
                            </div>

                            <div className='form__group'>
                                <div className="form__container">
                                    <label htmlFor="">Username</label>
                                    <input
                                        type="text"
                                        placeholder='Enter your Username'
                                        name="username"
                                        onChange={handleChange}
                                        value={username}
                                        onFocus={() => setUserFocus(true)}
                                        onBlur={() => setUserFocus(false)}
                                    />
                                </div>
                                <div className="form__container">
                                    <label htmlFor="">Email</label>
                                    <input
                                        type="text"
                                        placeholder='Enter your email'
                                        name="email"
                                        onChange={handleChange}
                                        value={email} 
                                    />
                                </div>
                            </div>


                            <div className="form__container">
                                <label htmlFor="">Password</label>
                                <input
                                    type="password"
                                    placeholder='Enter your password'
                                    name="password"
                                    onChange={handleChange}
                                    value={password}
                                />
                            </div>
                            {/* password strength */}
                            <div className='pStrength'>
                                <ul>
                                    <li>
                                        <span className="indicator">
                                            {switchIcon(uCase)}&nbsp; Lowercase & Uppercase
                                        </span>
                                    </li>
                                    <li>
                                        <span className="indicator">
                                            {switchIcon(num)}&nbsp; Number[0-9]
                                        </span>
                                    </li>
                                    <li>
                                        <span className="indicator">
                                            {switchIcon(sChar)}&nbsp; Special Characters (!@#$%^&*)
                                        </span>
                                    </li>
                                    <li>
                                        <span className="indicator">
                                            {switchIcon(passLength)}&nbsp; Password should be at least 6 characters
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <button disabled={!validUserName || !sChar || !num || !passLength}>Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='login__image'>
                <img src={loginImg} alt="" />
            </div>
        </div>
    )
}

export default Login