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

export const addTooltips = (ref) =>{
  const tooltip =  d3.select(ref)
    .append("div")
    .attr("class", "tooltip")
  return tooltip
}

export const showTooltip = (ref, d, tooltipText, left, top) => {
  const tooltip = d3.select(ref).select("div.tooltip")
  tooltip
    .transition()
    .duration(200)
  tooltip
    .style("opacity", 1)
    .html(eval(tooltipText))
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

export const addDataPointsToScatterPlot = (ref, data, x, y, r,  color, tooltipText) => {

  const callShowTooltip = (event, d) => {
    showTooltip(ref, d, tooltipText, event.screenX ,event.screenY )
  }

  const callHideTooltip = () => {
    hideTooltip(ref)
  }

  d3.select(ref).select('svg').select('g')
  .append('g')
  .selectAll("dot")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", d => x(d[1].bill_length_mm))
  .attr("cy", d => y(d[1].bill_depth_mm))
  .attr("r", r)
  .attr("class", "circle")
  .style("fill", d => color(d[1].species)) 
  .on("mouseover", callShowTooltip)
  .on("mouseleave", callHideTooltip)
}

export const addRectanglesToBarChart = (ref, data, x, y,  color, tooltipText) => {

  const callShowTooltip = (event, d) => {
    showTooltip(ref, d, tooltipText, event.screenX ,event.screenY )
  }

  const callHideTooltip = () => {
    hideTooltip(ref)
  }

  d3.select(ref).select('svg').select('g')
    .append('g')
    .selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x", d =>  x(Object.values(d)[0]))
    .attr("width", x.bandwidth)
    .attr("y", d => y(Object.values(d)[1]))
    .attr("height", d => height - y(Object.values(d)[1]))
    .style("fill", d => color(x(Object.values(d)[0]))) 
    .on("mouseover", callShowTooltip)
    .on("mouseleave", callHideTooltip)
}