import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const ScatterPlot = ({data}) => {
  const scatterPlot = useRef(null)
  const drawScatterPlot = (data) => {
    // set the dimensions and margins of the graph
    var margin = {top: 10, right: 30, bottom: 30, left: 30},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

    const svg = d3.select(scatterPlot.current)
    .append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style('border', '1px solid black')
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")")  

    // Add X axis
    const x = d3.scaleLinear()
    .domain([0, d3.max(data.map(val=>val.bill_length_mm))])
    .range([ 0, width ])
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([0, d3.max(data.map(val=>val.bill_depth_mm))])
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y))
    
    const dataPoints = Object.entries(data)
    // Add dots
    svg.append('g')
    .selectAll("dot")
    .data(dataPoints)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d[1].bill_length_mm) } )
    .attr("cy", function (d) { return y(d[1].bill_depth_mm) } )
      .attr("r", 3)
      .style("fill", "#69b3a2")
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