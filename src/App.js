import "./App.css";
import { seedPersons } from "./data/Persons";
import { MainPage } from "./components/MainPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MainPage seedPersons={seedPersons} />
      </header>
    </div>
  );
}

export default App;
