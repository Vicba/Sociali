import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

import PrivateRoute from './components/PrivateRoute';


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/' element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;