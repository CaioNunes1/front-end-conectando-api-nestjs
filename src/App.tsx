import './App.css'
import './index.css'
import AddData from './components/AddData'
import SignUp from './components/SignUp';
//import UserScreen from './components/UserScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserScreen from './components/UserScreen';
function App() {

  return (
    <>
    <Router>
      <div className='body'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<AddData/>}/>
            <Route path='SignUp' element={<SignUp/>}/>
            <Route path='UserScreen' element={<UserScreen/>}/>
          
        </Routes>
        </div>
        
      </div>
    </Router>
    </>
  )
}

export default App
