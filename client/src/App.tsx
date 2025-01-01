


import {Route, Routes} from "react-router-dom"
import HomePage from "./pages/home/Home"
import AuthCallbackPage from "./pages/auth/AuthCallbackPage"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/"  element={<HomePage/>} />
      <Route path="/sso-callback"  element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"}/>} />
      <Route path="/auth-callback" element={<AuthCallbackPage/>} />
    </Routes>
    </>
  )
}

export default App