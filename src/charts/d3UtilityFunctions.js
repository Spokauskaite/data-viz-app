import * as d3 from 'd3'

export const margin = {top: 80, right:120, bottom: 60, left: 60}
export const width = 600 - margin.left - margin.right
export const height = 400 - margin.top - margin.bottom

export const drawCanvas = (ref) =>{
  // Create svg
  const svg = d3.select(ref)
    .append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr('class', 'canvas')
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")") 
  return svg
}

export const addTooltips = (ref) =>{
  const tooltip =  d3.select(ref)
    .append("div")
    .attr("class", "tooltip")
  return tooltip
}

export const showTooltip = (ref,html,left,top) => {
  const tooltip = d3.select(ref).select("div.tooltip")
  tooltip
    .transition()
    .duration(200)
  tooltip
    .style("opacity", 1)
    .html(
      html
      )
    .style("left", `${left}px`)
    .style("top", `${top}px`)
}

export const hideTooltip = (ref) => {
  const tooltip = d3.select(ref).select("div.tooltip")
  tooltip
    .transition()
    .duration(200)
    .style("opacity", 0)
}

export const addXAxis = ( ref, x , labelMargin, label, maxX ) => {
  const xAxis = d3.select(ref).select('svg').select('g')
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "xAxis")
    .call(d3.axisBottom(x).tickSize(0))
    .call(g => g.select(".domain").remove())

  maxX &&
    xAxis
      .append("text")
      .attr("y", labelMargin)
      .attr("x", x(maxX)-labelMargin)
      .attr("fill", "#595959")
      .text(label)
  
  xAxis.selectAll(".tick text")
    .attr("fill","#595959")
}  

export const addYAxis = ( ref, y , labelMargin, label , maxY) => {
  const yAxis = d3.select(ref).select('svg').select('g')
    .append("g")
    .attr("class", "yAxis")
    .call(d3.axisLeft(y).tickSize(0))
    .call(g => g.select(".domain").remove())
    .append("text")
    .attr("y", -labelMargin)
    .attr("x", y(maxY)-labelMargin)
    .attr("transform", "rotate(-90)")
    .attr("fill", "#595959")
    .text(label)

  yAxis.selectAll(".tick text")
    .attr("fill","#595959")
  yAxis.select(".yAxis .tick text")
    .attr("fill","none")
}