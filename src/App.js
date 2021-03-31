import './App.css'
import JExcelTable from './tables/JExcelTable'
import BarChart from './charts/BarChart'
import ScatterPlot from './charts/ScatterPlot'

function App() {

  return (
    <>
      <div className='main-page'>
        <JExcelTable api='/loadPenguinData' />
        <ScatterPlot api='/loadPenguinData' zoom={false}/>
        <ScatterPlot api='/loadPenguinData' zoom={true}/>
        <BarChart api='/loadBarChartData'/>
      </div>
    </>
  )
}

export default App;
