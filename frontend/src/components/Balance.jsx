import React, { useEffect, useState } from "react";
import axios from "axios";

function Balance() {
  const [value, setValue] = useState(0);
  useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/account/balance" ,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(response=>{
      setValue(response.data.Balance)
    })
   },[])
  return (
    <div className="flex">
      <div className="font-bold text-lg">Your Balance</div>
      <div className="font-semibold ml-4 text-lg">₹ {value}</div>
    </div>
  );
}

export default Balance;
