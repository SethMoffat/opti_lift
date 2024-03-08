import { Link } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
  return (
    <div className="navigation-bar">
      <Link to="/client">Client Screen</Link>
      <Link to="/add_client">Add Client Screen</Link>
    </div>
  );
};

export default NavigationBar;