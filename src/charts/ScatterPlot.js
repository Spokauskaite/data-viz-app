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
  addDataPointsToScatterPlot
} from "./d3UtilityFunctions"

const ScatterPlot = ({data}) => {
  const scatterPlot = useRef(null)

  const drawScatterPlot = (data) => {
    const maxX = d3.max( data.map( d => d.bill_length_mm ))
    const maxY = d3.max( data.map( d => d.bill_depth_mm ))
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

    const svg = drawCanvas( scatterPlot.current ) 
  
    addXAxis( scatterPlot.current, x , labelMargin, "Bill Length (mm)", maxX )
    addYAxis( scatterPlot.current, y , labelMargin, "Bill Depth (mm)" , maxY)

    const tooltip =  addTooltips(scatterPlot.current)
    let tooltipText = `\`<strong>Species:</strong> \${d[1].species} </br> 
                      <strong>Bill Length:</strong> \${d[1].bill_length_mm}mm </br>
                      <strong>Bill Depth:</strong> \${d[1].bill_depth_mm}mm </br>\``

    const dataPoints = Object.entries(data)
    addDataPointsToScatterPlot( 
      scatterPlot.current, 
      dataPoints, 
      x, 
      y,
      r, 
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

    // Add grid x axis
    svg.selectAll("g.xAxis g.tick")
      .append("line")
      .attr("class", "gridline")
      .attr("x1", 0)
      .attr("y1", -height)
      .attr("x2", 0)
      .attr("y2", 0)

    // Add legend
    svg.append("text")
      .attr("x", (width+20))             
      .attr("y", 10)
      .attr("fill", "#595959")
      .attr("class", "legend-title") 
      .text("Species")

    const legend = svg.selectAll(".legend")
      .data(color.domain())
      .enter().append("g")
      .attr("class", "legend")
      .attr("fill","#595959")
      .attr("transform", (d, i) => "translate(0," + i * 20  + ")" )

    // Add legend circles
    legend.append("circle")
      .attr("cx", width+20)
      .attr("cy", 30)
      .attr("r", 5)
      .style("fill", color)

    // Add legend text
    legend.append("text")
      .attr("x", width+30)
      .attr("y",30)
      .attr("dy", ".35em")
      .attr("fill","#595959")
      .attr("class",'legend-text')
      .text( d => d)
    
    // Add Title
    svg.append("text")
      .attr("x", (width / 2))             
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")  
      .attr("fill","#595959")
      .attr("class", "plot-title") 
      .text("Penguin Bill Size by Species")
      
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