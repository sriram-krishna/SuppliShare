import Button from './components/shared/Button/Button';
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>SuppliShare</h1>
      <div>
        <Button label="Login" onClick={() => alert('Button clicked!')} />
      </div>
    </div>
  );
}

export default App;
