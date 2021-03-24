import './App.css'
import BarChart from './charts/BarChart'
import ScatterPlot from './charts/ScatterPlot'

function App() {

  return (
    <>
      <div className='main-page'>
        <ScatterPlot api='/loadPenguinData' zoom={false}/>
        <ScatterPlot api='/loadPenguinData' zoom={true}/>
        <BarChart api='/loadBarChartData'/>
      </div>
    </>
  )
}

export default App;
