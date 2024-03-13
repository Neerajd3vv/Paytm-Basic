import React, { useEffect } from "react";
import Tick from "../images/tick.png";
import { useNavigate, useSearchParams } from "react-router-dom";
function Success() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const amount = searchParams.get("amount");
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  });
  return (
    <div class="flex justify-center h-screen bg-gray-100 items-center">
      <div className="border h-96 text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg ">
        <div className="flex justify-center pt-4">
          <h2 className="text-3xl font-bold text-center">Sent Successfully</h2>
        </div>

        <div className="flex justify-center ">
          <img className="w-28 " src={Tick} alt="Green tick" />
        </div>
        <div className="font-semibold text-2xl flex justify-start">
          To: {name}
        </div>

        <div className="font-semibold text-2xl flex justify-start">
          Amount : ₹ {amount}
        </div>
      </div>
    </div>
  );
}

export default Success;
