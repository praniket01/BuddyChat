import { Navigate, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import SignupPAge from "./pages/SignupPAge.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import CallPAge from "./pages/CallPAge.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import toast, { Toaster } from "react-hot-toast";
import PageLoader from "./components/PageLoader.jsx"
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {

  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;
  const {theme} = useThemeStore();


  if (isLoading) return <PageLoader />

  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <HomePage />
          </Layout>
        ) :
          (
            <Navigate to={!isAuthenticated ? ("/login") : ("/onboarding")} />
          )}  ></Route>
        <Route path="/signup" element={!isAuthenticated ? <SignupPAge /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />}></Route>
        <Route path="/chat/:id" element ={
          isAuthenticated && isOnboarded ? (
            <Layout>
              <ChatPage showSidebar={false} />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )
        } ></Route>
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={
          isOnboarded ? "/" : "/onboarding"
        } />}></Route>
        <Route path="/call" element={isAuthenticated ? <CallPAge /> : <Navigate to={"/login"} />}></Route>
        <Route path="/notifications" element={isAuthenticated ? <NotificationsPage /> : <Navigate to={"/login"} />}></Route>
        <Route path="/onboarding"
          element={isAuthenticated ? (!isOnboarded ? (<OnboardingPage />) : (
            <Navigate to="/" />
          )) :
            (<Navigate to="/login" />)}>

        </Route>

      </Routes>
      <Toaster />
    </div>
  )
}
export default App;
