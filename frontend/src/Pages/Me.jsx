import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Me() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .post(
        "http://localhost:3000/api/v1/user/verify",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        if (response.data.user) {
          navigate("/dashboard");
        } else {
          navigate("/signup");
        }
      })
      .catch((error) => {
        console.error("Error with Token: ", error);
        navigate("/signup");
      });
  });
  return <></>;
}

export default Me;
