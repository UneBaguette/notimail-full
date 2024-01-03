import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AccueilAdmin } from './pages/accueilAdmin'
import { Mail } from './pages/mail'
import { AccueilUser } from './pages/accueilUser'
import { Connexion } from './pages/connexion'
import { Confirm } from './pages/confirm'
import { User } from './pages/user'
import { Edit } from './pages/edit'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div>
        {/* <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/about"}>About</NavLink> */}
      </div>
      <Routes>
        <Route path='/' element={<Connexion/>}/>
        <Route path='/accueilUsers' element={<AccueilUser/>}/>
        <Route path='/accueilAdmin' element={<AccueilAdmin/>}/>
        <Route path='/confirm' element={<Confirm/>}/>
        <Route path='/mail' element={<Mail/>}/>
        <Route path='/user' element={<User/>}/>
        <Route path='/edit' element={<Edit/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
