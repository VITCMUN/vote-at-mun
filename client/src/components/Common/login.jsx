import React from 'react';
import './EBDashboard.css';
import LoginForm from './form';  

function Login(){
  return (
    <div className="FlexContainer">

      <div className="LeftContainer">
        <img className="MunImage1" src= "mun.png" alt="VITCC MUN"/>
        <img className="CouncilImage" src= "mun1.png" alt="VITCC MUN"/>
      </div>

      <div className="RightContainer">
        <br></br>
        <img className="MunImage2" src= "mun.png" alt="VITCC MUN"/>
        <h4 className="DashboardHeading"><b>WELCOME</b></h4><br/>
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;
