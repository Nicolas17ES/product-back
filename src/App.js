import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import DownloadConfirmation from './pages/DownloadConfirmation'
import Navigation from './components/Navigation'
import { UploadProvider } from './context/UploadContext'

/**
 * The main application component that sets up routing and context provider.
 *
 * - Provides global state management with `UploadProvider`.
 * - Includes navigation component for site-wide links.
 * - Sets up routes for Home and DownloadConfirmation pages.
 *
 * @returns {JSX.Element} The rendered application component.
 */


function App() {
  
  return (
    <UploadProvider>
      <Navigation/>
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/confirmation" element={<DownloadConfirmation/>} />
          </Routes>
        </main>
      </Router>
    </UploadProvider>
  );
}

export default App;
