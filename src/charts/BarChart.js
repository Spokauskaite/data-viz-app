import { useEffect, useRef } from 'react'
import useAuth from '../useAuth'
import * as d3 from 'd3'
import {
  width,
  height,
  drawCanvas,
  addTitle,
  addXAxis,
  addYAxis,
  addGridToYAxis,
  addRectanglesToBarChart,
  addTooltips
} from "./d3UtilityFunctions"

const BarChart = ({api}) => {
  const [ loading, data, error ] = useAuth(api)
  const barChart = useRef(null)

  const drawBarChart = () => {
    const  {body_mass_g} = data
    const thisChart = barChart.current
    const maxY = d3.max(Object.values(body_mass_g))
    const dataPoints = Object.entries(body_mass_g)
    const tooltipText = `\`<strong>Species:</strong> \${Object.values(d)[0]} </br> 
                        <strong>Body Mass:</strong> \${Object.values(d)[1]}g </br>\``
    const labelMargin = 40
    //scale
    const x = d3.scaleBand()
      .domain(Object.keys(body_mass_g))
      .range([ 0, width ])
      .padding(0.2)
    const y = d3.scaleLinear()
      .domain([0, maxY]).nice()
      .range([ height, 0])
    const color = d3.scaleOrdinal()
      .domain(Object.keys(body_mass_g))
      .range(d3.schemeCategory10.slice(0,3))
      
    drawCanvas(thisChart) 
    addTitle(thisChart, "Average Penguin Body Mass by Species")
    addXAxis( thisChart, x , labelMargin, "Bill Length (mm)" )
    addYAxis( thisChart, y , labelMargin, "Body  Mass (g)" , maxY)
    addGridToYAxis(thisChart)
    addRectanglesToBarChart( 
      thisChart, 
      dataPoints, 
      x, 
      y,
      color,
      tooltipText
    )
    addTooltips(thisChart)
  }

  useEffect(()=>{
    data && drawBarChart(data)
  },[data])

  return(
    <>
      {
        loading ? <div>Loading...</div> :
          error ? <div className='error'>Error Fetching Data </div> :
            data && <div ref={barChart} className='chart'></div>
      }
    </>
  )
}

export default BarChart