import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { MobileNavigation } from './components/ui/MobileNavigation';
import { VehicleDetailPage } from './pages/VehicleDetailPage';
import { VehicleListPage } from './pages/VehicleListPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow p-0">
          <Routes>
            <Route path="/" element={<VehicleListPage />} />
            <Route path="/vehicles" element={<VehicleListPage />} />
            <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
            <Route path="/map" element={<VehicleListPage />} />
            <Route
              path="/analytics"
              element={
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold text-gray-900">Analytics Coming Soon</h1>
                </div>
              }
            />
            <Route
              path="/settings"
              element={
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold text-gray-900">Settings Coming Soon</h1>
                </div>
              }
            />
          </Routes>
        </main>
        <MobileNavigation />
      </div>
    </Router>
  );
}

export default App;
