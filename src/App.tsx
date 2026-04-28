import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import NotFoundPage from './pages/NotFoundPage'
import Layout from './components/Layout'
import { FavoritesProvider } from './components/FavoritesCntext'

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/weather/:lat/:lon' element={<DetailPage />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </FavoritesProvider>
    </BrowserRouter>
  )
}

export default App
