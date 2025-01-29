import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import Header from './Header';
import Profile from './Profile';  // Import Profile component
import ProjectProposals from './ProjectProposals';
import CollaborationTools from './CollaborationTools';
import FundingAndGrants from './FundingAndGrants';
import EventsCalendar from './EventsCalendar';
import AddEventForm from './AddEventForm';
import HelpSupportPage from './HelpSupportPage';
import LoginPage from './Login';
import Register from './RegisterPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects" element={<ProjectProposals />} /> 
          <Route path="/collaboration" element={<CollaborationTools />} />
          <Route path="/funding" element={<FundingAndGrants />} />
          <Route path="/events" element={<EventsCalendar />} />
          <Route path="/addevent" element={<AddEventForm />} />
          <Route path='/help' element={<HelpSupportPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
