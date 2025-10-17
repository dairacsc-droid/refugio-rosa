import {Routes, Route} from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Inicio from './pages/Inicio'
import Chat from './pages/Chat'
import Autocuidado from './pages/Autocuidado'
import Playlist from './pages/Playlist'
import Unete from './pages/Unete'
import Historias from './pages/Historias'

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Inicio/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/autocuidado' element={<Autocuidado/>}/>
      <Route path='/playlist' element={<Playlist/>}/>
      <Route path='/historias'element={<Historias/>}/>
      <Route path='/unete' element={<Unete/>}/>
    </Routes>
    </>
  );
}

export default App;
