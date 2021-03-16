import * as d3 from 'd3'

var margin = {top: 80, right:120, bottom: 60, left: 60}
const width = 600 - margin.left - margin.right
const height = 400 - margin.top - margin.bottom

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
