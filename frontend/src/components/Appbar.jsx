import React from "react";
import { useNavigate } from "react-router-dom";

function Appbar() {
  const navigate = useNavigate()
  const logout = ()=>{
    localStorage.removeItem("token")
    navigate("/signup")
  }
  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">PayTM App</div>
      <div className="flex items-center">
        <button
        onClick={logout}
          type="button"
          class="w-full text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Appbar;
