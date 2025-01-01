


import {Route, Routes} from "react-router-dom"
import HomePage from "./pages/home/Home"
import AuthCallbackPage from "./pages/auth/AuthCallbackPage"

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/"  element={<HomePage/>} />
      <Route path="/auth-callback" element={<AuthCallbackPage/>} />
    </Routes>
    </>
  )
}

export default App