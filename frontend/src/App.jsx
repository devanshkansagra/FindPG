import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AgentDashboard from './components/AgentDashboard';
import Explore from './components/Explore';
import { Navbar } from './components/Navbar';
import PrivateRoute from './utils/PrivateRoutes';
import AddPG from './components/AddPG';
import Cookie from './helpers/Cookie';
import Chat from './components/Chat';
function App() {
  const role = Cookie.get("role");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route
            path="/AgentDashboard"
            element={
              <PrivateRoute allowedRoles={["agent"]}>
                <AgentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/addPG"
            element={
              <PrivateRoute allowedRoles={["agent"]}>
                <AddPG />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
