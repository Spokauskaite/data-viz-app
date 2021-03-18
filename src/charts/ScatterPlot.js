import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import {
  width,
  height,
  drawCanvas,
  addTitle,
  addXAxis,
  addYAxis,
  addGridToXAxis,
  addGridToYAxis,
  addDataPointsToScatterPlot,
  addTooltips,
  addScatterPlotLegend
} from "./d3UtilityFunctions"

const ScatterPlot = ({data}) => {
  const scatterPlot = useRef(null)

  const drawScatterPlot = () => {
    const thisChart = scatterPlot.current
    const maxX = d3.max( data.map( d => d.bill_length_mm ))
    const maxY = d3.max( data.map( d => d.bill_depth_mm ))
    const dataPoints = Object.entries(data)
    const tooltipText = `\`<strong>Species:</strong> \${d[1].species} </br> 
                        <strong>Bill Length:</strong> \${d[1].bill_length_mm}mm </br>
                        <strong>Bill Depth:</strong> \${d[1].bill_depth_mm}mm </br>\``
    const labelMargin = 30
    const r = 3

    // scale
    const x = d3.scaleLinear()
      .domain([0, maxX]).nice()
      .range([ 0, width ])
    const y = d3.scaleLinear()
      .domain([0, maxY]).nice()
      .range([ height, 0])
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.species))
      .range(d3.schemeCategory10)
    const shape = d3.scaleOrdinal()
      .domain(data.map(d => d.species))
      .range(d3.symbols.map(s => d3.symbol().type(s)()))

    drawCanvas( thisChart ) 
    addTitle(thisChart, "Penguin Bill Size by Species")
    addXAxis( thisChart, x , labelMargin, "Bill Length (mm)", maxX )
    addYAxis( thisChart, y , labelMargin, "Bill Depth (mm)" , maxY)
    addGridToXAxis(thisChart)
    addGridToYAxis(thisChart)
    addDataPointsToScatterPlot( 
      thisChart, 
      dataPoints, 
      x, 
      y,
      r, 
      color,
      tooltipText
    )
    addTooltips(thisChart)
    addScatterPlotLegend(thisChart, color)  
  }

  useEffect(()=>{
    drawScatterPlot(data)
  },[data])

  return(
    <>
      <div ref={scatterPlot} className='chart' ></div>
    </>
  )
}

export default ScatterPlot