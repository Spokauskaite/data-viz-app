import './App.css'
import JExcelTable from './tables/JExcelTable'
import JCSVTable from './tables/JCSVTable'
import HandsonTable from './tables/HandsonTable'
import BarChart from './charts/BarChart'
import ScatterPlot from './charts/ScatterPlot'
import useDataGenerator from './useDataGenerator'

const App = () => {
  const [ generating, data ] = useDataGenerator()

  return (
    <>
      <div className='main-page'>
        <JExcelTable api='/loadPenguinData'/>
        <JCSVTable api='/loadLargeData'/>
        <HandsonTable api='/loadLargeData'/>
        <ScatterPlot api='/loadPenguinData' zoom={false}/>
        <ScatterPlot api='/loadPenguinData' zoom={true}/>
        <BarChart api='/loadBarChartData'/>
      </div>
    </>
  )
}

export default App
