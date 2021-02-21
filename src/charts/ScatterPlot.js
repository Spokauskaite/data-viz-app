import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const ScatterPlot = ({data}) => {
  const scatterPlot = useRef(null)
  const drawScatterPlot = (data) => {
    // set parameters
    var margin = {top: 30, right: 30, bottom: 50, left: 50}
    const width = 600 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom
    const maxX = d3.max( data.map( d => d.bill_length_mm ))
    const maxY = d3.max( data.map( d => d.bill_depth_mm ))
    const labelMargin = 30

    // Create svg
    const svg = d3.select(scatterPlot.current)
      .append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .style('border', '1px solid #ddd')
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")  

    // Add X axis
    const x = d3.scaleLinear()
      .domain([0, maxX]).nice()
      .range([ 0, width ])
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "xAxis")
      .call(d3.axisBottom(x).tickSize(0))
      .call(g => g.select(".domain").remove())
      .append("text")
      .attr("y", labelMargin)
      .attr("x", x(maxX)-labelMargin)
      .attr("fill", "#000000")
      .text("Bill Length (mm)")
    
    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, maxY]).nice()
      .range([ height, 0])
    svg.append("g")
      .attr("class", "yAxis")
      .call(d3.axisLeft(y).tickSize(0))
      .call(g => g.select(".domain").remove())
      .append("text")
      .attr("y", -labelMargin)
      .attr("x", y(maxY)-labelMargin)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#000000")
      .text("Bill Depth (mm)")

    // Add colors
    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.species))
      .range(d3.schemeCategory10)
    // Add shape
    const shape = d3.scaleOrdinal()
      .domain(data.map(d => d.species))
      .range(d3.symbols.map(s => d3.symbol().type(s)()))
    
    // Add dots
    const dataPoints = Object.entries(data)
    svg.append('g')
      .selectAll("dot")
      .data(dataPoints)
      .enter()
      .append("circle")
      .attr("cx", d => x(d[1].bill_length_mm))
      .attr("cy", d => y(d[1].bill_depth_mm))
      .attr("r", 3)
      .style("fill", d => color(d[1].species)) 

    svg.selectAll("g.yAxis g.tick")
      .append("line")
      .attr("class", "gridline")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", width)
      .attr("y2", 0)
  
    svg.selectAll("g.xAxis g.tick")
      .append("line")
      .attr("class", "gridline")
      .attr("x1", 0)
      .attr("y1", -height)
      .attr("x2", 0)
      .attr("y2", 0)

    // Add legend
    const legend = svg.selectAll(".legend")
    .data(color.domain())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => "translate(" + i * 100  + ",0)" )

    // Add legend circles
    legend.append("circle")
      .attr("cx", 5)
      .attr("cy", -15)
      .attr("r", 5)
      .style("fill", color)

    // Add legend text
    legend.append("text")
      .attr("x", 20)
      .attr("y", -15)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text( d => d)
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