import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import { IconButton, Button } from "@mui/material";
import { auth, provider } from '../firebase';

function Login() {

  const signIn=()=>{
    auth.signInWithPopup(provider).catch(alert)
  }
  return (
 <Container>
<Head>
    <title>Login</title>
</Head>
<LoginContainer>
    <Logo
    src='https://images.news18.com/ibnlive/uploads/2021/07/1626079387_featured-image-2021-07-12t141141.896.jpg?impolicy=website&width=510&height=356'/>
    <Button1 onClick={signIn}variant='outlined'>Sign in with Google</Button1>
</LoginContainer>
 </Container>
  )
}

export default Login

const Container = styled.div`
display:grid;
place-items:center;
height:100vh;
background-color: whitesmoke;
`
const LoginContainer = styled.div`
display:flex;
flex-direction:column;
align-items: center;
background-color:white;
border-radius:5px;
box-shadow:0px 4px 14px -3px rgba(0, 0, 0, 0.7);
padding:100px;
`

const Logo = styled.img`
height:200px;
width:250px;
margin-bottom: 50px;
`
const Button1=styled(Button)`
color:black`