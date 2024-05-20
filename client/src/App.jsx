import "./App.css";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import MessageContainer from './components/messages/MessageContainer';

function App() {

  return (
 <div className='p-4 h-screen flex items-center justify-center'>
  <Home />
 </div>
  );
}

export default App;
