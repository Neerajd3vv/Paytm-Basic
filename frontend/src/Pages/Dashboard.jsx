import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios";
function Dashboard() {

  const [value ,setValue] = useState(0)
  useEffect(()=>{
axios.get("http://localhost:3000/api/v1/account/balance",{

}).then(response => {
  setValue(response.data.Balance)
  console.log(response.data.Balance);
} )
  })
  return (
    <div>
      <Appbar />
      <div className="m-8">
        <Balance value={value} />
        <Users/>
      </div>
    </div>
  );
}

export default Dashboard;
