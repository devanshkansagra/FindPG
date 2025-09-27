import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import AgentDashboard from "./components/AgentDashboard";
import Explore from "./components/Explore";
import { Navbar } from "./components/Navbar";
import PrivateRoute from "./utils/PrivateRoutes";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/AgentDashboard"
            element={
              <PrivateRoute role="agent">
                <AgentDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
