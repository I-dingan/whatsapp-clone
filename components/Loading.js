import styled from "styled-components";
import React from "react";
import DotLoader from 'react-spinners/DotLoader'
import { css } from "@emotion/react"
import PacmanLoader from "react-spinners/PacmanLoader"
import { display } from "@mui/system";


function Loading() {
  return (
    <center style={{display:'grid', placeItems:"center",height:'100vh'}} >
      <div >
        <img
          src="https://images.news18.com/ibnlive/uploads/2021/07/1626079387_featured-image-2021-07-12t141141.896.jpg?impolicy=website&width=510&height=356"
          alt=""
          height={200}
        />
        <div style={{marginTop:'10vh',marginLeft:'-30%'}}>
        <PacmanLoader color='#3CD321'size={20} />
        </div>
    
        </div>
    </center>
  );
}




export default Loading;




