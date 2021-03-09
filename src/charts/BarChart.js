import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const BarChart = ({data}) => {
  const  {body_mass_g} = data
  const barChart = useRef(null)

  const drawBarChart = (data) => {
    // set parameters
    var margin = {top: 80, right:120, bottom: 60, left: 60}
    const width = 600 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom
    const maxY = d3.max(Object.values(body_mass_g))
    const labelMargin = 40

    // Create svg
    const svg = d3.select(barChart.current)
      .append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr('class', 'canvas')
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")  

    // Add X axis
    const x = d3.scaleBand()
      .domain(Object.keys(body_mass_g))
      .range([ 0, width ])
      .padding(0.2)
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "xAxis")
      .call(d3.axisBottom(x).tickSize(0))
      .call(g => g.select(".domain").remove())
    
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
      .attr("fill", "#595959")
      .text("Body  Mass (g)")

    svg.selectAll(".tick text")
      .attr("fill","#595959")
    svg.select(".yAxis .tick text")
      .attr("fill","none")

    // Add colors
    const color = d3.scaleOrdinal()
      .domain(Object.keys(body_mass_g))
      .range(d3.schemeCategory10.slice(0,3))

    // Add bars
    const dataPoints = Object.entries(body_mass_g)
    svg.selectAll("rect")
      .data(dataPoints)
      .enter().append("rect")
        .attr("x", d =>  x(Object.values(d)[0]))
        .attr("width", x.bandwidth)
        .attr("y", d => y(Object.values(d)[1]))
        .attr("height", d => height - y(Object.values(d)[1]))
        .style("fill", d => color(y(Object.values(d)[1]))) 

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
      .text("Penguin Body Mass by Species")
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