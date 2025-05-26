import HistoricalDates from './components/HistoricalDates';
import { historicalData } from './data/historicalData';
import './App.scss';

function App() {
  return (
    <div className="app">
      <HistoricalDates data={historicalData} />
    </div>
  );
}

export default App;