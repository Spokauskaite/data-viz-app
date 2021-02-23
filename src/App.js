import './App.css'
import useAuth from './useAuth'
import BarChart from './charts/BarChart'
import ScatterPlot from './charts/ScatterPlot'

function App() {
  let [ loading, penguins, error ] = useAuth('/loadPenguinData')
  
  return (
    <>
      <div className='main-page'>
        { loading && <div>Loading...</div> }
        { error && <div className="error">ERROR OH NO</div> }
        {penguins && <ScatterPlot data={penguins}/>}
      </div>
    </>
  )
}

export default App;
