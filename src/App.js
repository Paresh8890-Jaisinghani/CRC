import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Clinical Research Coordinator</h1>
        
        <Link to="/participants">
          <button className='btn'>Existing Participants</button>
        </Link>
      </header>
    </div>
  );
}

export default App;
