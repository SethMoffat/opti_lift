import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ClientScreen from './screens/ClientScreen';
import AddClientScreen from './screens/AddClientScreen';
import NavigationBar from './components/NavigationBar';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/add_client" element={<AddClientScreen />} />
        <Route path="/client" element={<ClientScreen />} />
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}

export default App;