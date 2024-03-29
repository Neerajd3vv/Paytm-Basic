import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import SendMoney from "./Pages/SendMoney";
import Dashboard from "./Pages/Dashboard";
import Me from "./Pages/Me";
import Success from "./Pages/Success";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Default route */}
          {/* <Route path="/"  element={<Navigate to='/me' />}/> */}
          <Route path="/" element={<Me />} />
          {/* Other routes */}
          <Route path="/success" element={<Success />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
