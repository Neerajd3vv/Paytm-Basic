import React, { useState } from "react";
import InputBox from "../components/InputBox";
import BottomWarning from "../components/BottomWarning";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) => {
              setusername(e.target.value);
            }}
            placeholder="harkirat@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button
              onClick={() => {
                axios
                  .post("http://localhost:3000/api/v1/user/signin", {
                    username,
                    password,
                  })
                  
                  .then((response) => {
                    if (response.data.token) {
                      localStorage.setItem("token" , response.data.token)
                      navigate("/dashboard");
                    } else {
                      navigate("/signup");
                    }
                  })
                  
                  .catch((error) => {
                    console.error("Error signing in:", error);
                    // Handle any other errors here (e.g., network error)
                  });
              }}
              label={"Sign in"}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
