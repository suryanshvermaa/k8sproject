import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import VM from './pages/VM';
import { Layout } from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/signup' Component={Signup} />
          <Route path='/login' Component={Login} />
          <Route path='/' Component={Home} />
          <Route path='/vm' Component={VM} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App
