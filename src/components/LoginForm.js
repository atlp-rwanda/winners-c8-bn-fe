import React from "react";
import "../../public/styles/LoginForm/index.css"

const LoginForm = () => {
  return (
    <div class="container">
			<h1>Login</h1>
      <form action="#" method="POST">
        <input type="text" placeholder="email" class="field"></input>
        <input type="password" placeholder="password" class="field"></input>
        <input type="submit" value="login" class="btn"></input>
      </form>
      <div class="pass-link">
        <a href="#" >Lost your password?</a>
      </div>	
	  </div>
  );
}
 
export default LoginForm;