import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Client from './components/client/Client';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Navigate to="/clients" />} />
          <Route  path='/clients' element={<Client/>}></Route>  
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
