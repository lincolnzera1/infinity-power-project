import './App.css';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Login /> }/>
          <Route path='/home' element={ <Home /> }/>
          <Route path='/registro' element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
