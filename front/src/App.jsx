import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Client } from './pages/client'
import { Home } from './pages/home'
import { Admin } from './pages/admin'
import { Gestionnaire } from './pages/gestionnaire'
import { Mail } from './pages/mail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div>
        {/* <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/about"}>About</NavLink> */}
      </div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/client' element={<Client/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/gestionnaire' element={<Gestionnaire/>}/>
        <Route path='/mail' element={<Mail/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
