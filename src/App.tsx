import './App.css'
import './index.css'
import './components/UserScreen/UserScreenCss.css'
import AddData from './components/AddData'
import SignUp from './components/SignUp';
//import UserScreen from './components/UserScreen';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserScreen from './components/UserScreen/UserScreen';
function App() {

  return (
    <>
    <Router>
          <Routes>
            <Route path='/' element={<AddData/>}/>
            <Route path='SignUp' element={<SignUp/>}/>
            <Route path='UserScreen' element={<UserScreen/>}/>
          
        </Routes>
    </Router>
    </>
  )
}

export default App
