import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import AgentDashboard from './components/AgentDashboard';
import Explore from './components/Explore';
import PrivateRoute from './utils/PrivateRoutes';
import AddPG from './components/AddPG';
import Chat from './components/Chat';
import Search from './components/Search';
import Home from './components/Home';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/AgentDashboard"
            element={
              <PrivateRoute allowedRoles={['agent']}>
                <AgentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/addPG"
            element={
              <PrivateRoute allowedRoles={['agent']}>
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
