import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import NotFoundPage from './pages/NotFoundPage'
import { FavoritesProvider } from './components/FavoritesCntext'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/weather/:city' element={<DetailPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  )
}

export default App
