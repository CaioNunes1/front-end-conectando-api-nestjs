import './App.css'
import './index.css'
import AddData from './components/AddData'
import SignUp from './components/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {

  return (
    <>
    <Router>
      <div className='body'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<AddData/>}/>
            <Route path='SignUp' element={<SignUp/>}/>
        </Routes>
        </div>
        
      </div>
    </Router>
    </>
  )
}

export default App
