import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import SignupPAge from "./pages/SignupPAge.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import CallPAge from "./pages/CallPAge.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import toast,{Toaster} from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";


const App = () => {

 

  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signup" element={<SignupPAge />}></Route>
        <Route path="/chat" element={<ChatPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/call" element={<CallPAge />}></Route>
        <Route path="/notifications" element={<NotificationsPage />}></Route>
        <Route path="/onboarding" element={<OnboardingPage />}></Route>
 
      </Routes>
       <Toaster />
    </div>
  )
}
export default App;
