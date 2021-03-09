import './App.css'
import useAuth from './useAuth'
import BarChart from './charts/BarChart'
import ScatterPlot from './charts/ScatterPlot'

function App() {
  const [ loading, penguins, error ] = useAuth('/loadPenguinData')
  const [ loadingBarchart, barChartData, errorBarChart ] = useAuth('/loadBarChartData')
  
  return (
    <>
      <div className='main-page'>
        { loading && <div>Loading...</div> }
        { error && <div className="error">ERROR OH NO</div> }
        {penguins && <ScatterPlot data={penguins}/>}
        { loadingBarchart && <div>Loading...</div> }
        { errorBarChart && <div className="error">ERROR OH NO</div> }
        {barChartData && <BarChart data={barChartData}/>}
      </div>
    </>
  )
}

export default App;
