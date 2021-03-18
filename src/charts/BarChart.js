import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import {
  margin,
  width,
  height,
  drawCanvas,
  addTooltips,
  addXAxis,
  addYAxis,
  addRectanglesToBarChart
} from "./d3UtilityFunctions"

const BarChart = ({data}) => {
  const  {body_mass_g} = data
  const barChart = useRef(null)

  const drawBarChart = () => {
    const thisChart = barChart.current
    const maxY = d3.max(Object.values(body_mass_g))
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

    const svg = drawCanvas(thisChart) 

    addXAxis( thisChart, x , labelMargin, "Bill Length (mm)" )
    addYAxis( thisChart, y , labelMargin, "Body  Mass (g)" , maxY)
    addTooltips(thisChart)

    const tooltipText = `\`<strong>Species:</strong> \${Object.values(d)[0]} </br> 
                      <strong>Body Mass:</strong> \${Object.values(d)[1]}g </br>\``

    const dataPoints = Object.entries(body_mass_g)
    addRectanglesToBarChart( 
      thisChart, 
      dataPoints, 
      x, 
      y,
      color,
      tooltipText
    )

    // Add grid y axis
    svg.selectAll("g.yAxis g.tick")
      .append("line")
      .attr("class", "gridline")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", width)
      .attr("y2", 0)
    
    // Add Title
    svg.append("text")
      .attr("x", (width / 2))             
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")  
      .attr("fill","#595959")
      .attr("class", "plot-title") 
      .text("Average Penguin Body Mass by Species")
  }

  useEffect(()=>{
    drawBarChart(data)
  },[data])

  return(
    <>
      <div ref={barChart} className='chart'></div>
    </>
  )
}

export default BarChart