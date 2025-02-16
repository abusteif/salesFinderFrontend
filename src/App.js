import './App.css';
import TopPanel from './components/TopPanel';
import BottomPanel from './components/BottomPanel';

function App() {

  return (
    <div className="App">
      <div style = {{display: "flex", flexDirection:"column", width: "100%", height: "100%"}}>
        <TopPanel/>
        <BottomPanel/>
        </div>

    </div>
  );
}

export default App;
