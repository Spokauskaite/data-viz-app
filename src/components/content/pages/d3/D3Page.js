import BarChart from './charts/BarChart'
import ScatterPlot from './charts/ScatterPlot'

const D3Page = () => {

  return (
    <>
      <h1>d3 PAGE</h1>
      <ScatterPlot api='/loadPenguinData' zoom={false}/>
      <ScatterPlot api='/loadPenguinData' zoom={true}/>
      <BarChart api='/loadBarChartData'/>
    </>
  )
}

export default D3Page
