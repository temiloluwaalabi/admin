import React, { useEffect, useRef, useState } from 'react'
import useToggle from 'hooks/useToggle'
import "./login.css"
import useInput from 'hooks/useInput'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLoginMutation } from 'state/auth/authApiSlice'
import { setLogin } from 'state'
import { useDispatch } from 'react-redux'
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
  } from "@mui/material";
import logo from "../../assets/logo.png"

const LoginUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const errRef = useRef();    
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();



  const [userName, resetUser, userAtrribs] = useInput('user','');
  const [passWord, setPassWord] = useState("");
  const [errMsg, setErrMsg] = useState("");


  const [check,toggleCheck] = useToggle('persist', false);
  const [login, {isLoading, isError, error, isSuccess}] = useLoginMutation()
  const dispatch = useDispatch()


  useEffect(() => {
    setErrMsg('');
}, [userName, passWord])



const handleSubmit = async (e) => {
      e.preventDefault()

      try{
        const userData = await login({username:userName, password:passWord}).unwrap()
        dispatch(setLogin({...userData, userName}))
        resetUser();
        setPassWord ("");
        navigate(from, {replace:true})
      }catch(err){
        if(!err.originalStatus){
          setErrMsg('No Server Response');
        }else if (err.originalStatus === 400) {
          setErrMsg('Missing Username or Password');
      }else if (err.originalStatus === 401) {
          setErrMsg('Unauthorized');
      } else {
          setErrMsg('Login Failed');
      }
      errRef.current.focus()
      }
}

  return (
    <form onSubmit={handleSubmit}>
        <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <Typography sx={{width:"300px"}} ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</Typography>
            <TextField
                type="text" 
                placeholder='Enter your Username' 
                name="userName" 
                id="userName" 
                autoComplete='none'
                {...userAtrribs}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
                autoComplete='none'
                type="password" 
                id="password"
                value={passWord}
                onChange={(e) => setPassWord(e.target.value)} 
              label="Password"
              name="passWord"
              sx={{ gridColumn: "span 4" }}
            />      
          </Box>
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.alt,
                "&:hover": { color: theme.palette.primary.main },
              }}
            >
              LOGIN
            </Button>
            <Typography
              sx={{
                textDecoration: "underline",
                color: theme.palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: theme.palette.primary.light,
                },
              }}
            >
             Don't have an account? Sign Up here.
            </Typography>
          </Box>
    </form>
  )
}

export default LoginUser