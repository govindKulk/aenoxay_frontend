import { Router, useNavigate } from "react-router-dom";
import DemoComponent from "./DemoComponent";
import Logo from "./components/Logo";
import { useUserStore } from "./store/userStore";
import { useEffect } from "react";


function App() {
  const {isLoggedin} = useUserStore()
  const navigate = useNavigate();
  useEffect(() => {
    if(!isLoggedin){
      navigate('/login')
    }
  }, [])
  return (
    <div>

        <div> Welcome to Dribble</div>
    </div>
  );
}

export default App;
