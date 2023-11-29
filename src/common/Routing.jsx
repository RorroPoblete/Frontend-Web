import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Principal from '../pages/PaginaPrincipal/Principal';
import Instructions from '../pages/Instructions/Instructions';
import Landing from '../pages/LandingPage/Landing';
import Chat from '../chat/Chat';
import Access from '../Account/Access';
import UsersList from '../pages/ListaUsuarios/UsersList';
import TeamsList from '../pages/ListaEquipos/TeamsList';
import UserCheck from '../protected/UserCheck';
import UserDashboard from '../pages/UserDashboard/UserDashboard';
import UserProfile from '../pages/UserProfile/UserProfile';
import NotLoggedLanding from '../pages/LandingPage/NotLoggedLanding';
import CreateTeam from '../pages/CreateTeam/CreateTeam';
import JoinTeam from '../pages/JoinTeam/JoinTeam';
import TeamProfile from '../pages/TeamProfile/TeamProfile';
import MatchFinder from '../pages/MatchFinder/MatchFinder';
import MatchView from '../pages/MatchView/MatchView';
import MatchDetails from '../pages/MatchDetails/MatchDetails';

function Routing() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Barra de navegación en todas las páginas */}
      <Routes>
        <Route path={'/principal'} element={<Principal />} />
        <Route path={'/instructions'} element={<Instructions />} />
        <Route path={'/not-landing'} element={<Landing />} />
        <Route path={'/'} element={<NotLoggedLanding />} />
        <Route path={'/access'} element={<Access />} />
        <Route path={'/users'} element={<UsersList />} />
        <Route path={'/teams'} element={<TeamsList />} />
        <Route path={'/scope-example/protectedUser'} element={<UserCheck />} />
        <Route path={'/user-dashboard'} element={<UserDashboard />} />
        <Route path={'/userProfile'} element={<UserProfile />} />
        <Route path={'/create-team'} element={<CreateTeam />} />
        <Route path={'/join-team'} element={<JoinTeam />} />
        <Route path="/teamProfile/:teamId" element={<TeamProfile />} />
        <Route path="/match-finder/:teamId" element={<MatchFinder />} />
        <Route path="/match-view/:teamId" element={<MatchView />} />
        <Route path="/match-details/:matchId" element={<MatchDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
