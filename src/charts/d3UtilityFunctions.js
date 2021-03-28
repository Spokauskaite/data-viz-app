import * as d3 from 'd3'

export const margin = {top: 80, right:120, bottom: 60, left: 60}
export const width = 600 - margin.left - margin.right
export const height = 400 - margin.top - margin.bottom
const labelMargin = 40

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

export const addTitle = (ref) => {
  d3.select(ref).select('svg').select('g')
    .append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .attr("fill","#595959")
    .attr("class", "plot-title") 
    .text("Penguin Bill Size by Species")
}

export const addXAxis = ( ref, x , label, maxX ) => {
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

export const addYAxis = ( ref, y , label , maxY) => {
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

export const addGridToXAxis = (ref) => {
  d3.select(ref)
    .selectAll("g.xAxis g.tick line.gridline")
    .remove()
  d3.select(ref).selectAll("g.xAxis g.tick")
    .append("line")
    .attr("class", "gridline")
    .attr("x1", 0)
    .attr("y1", -height)
    .attr("x2", 0)
    .attr("y2", 0)
}

export const addGridToYAxis = (ref) => {
  d3.select(ref)
    .selectAll("g.yAxis g.tick line.gridline")
    .remove()
  d3.select(ref).selectAll("g.yAxis g.tick")
    .append("line")
    .attr("class", "gridline")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", width)
    .attr("y2", 0)
}

export const addDataPointsToScatterPlot = (
  ref, 
  data, 
  x, 
  y, 
  r,  
  color, 
  tooltipText
) => {
  const callShowTooltip = (event, d) => {
    showTooltip(ref, d, tooltipText, event.screenX ,event.screenY )
  }

  const callHideTooltip = () => {
    hideTooltip(ref)
  }

  d3.select(ref).select('svg').select('g')
  .append('g')
  .attr("class", "scatter")
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

export const addRectanglesToBarChart = (
  ref, 
  data, 
  x, 
  y,  
  color, 
  tooltipText
) => {

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

export const addZoomIn = (ref, data, x, y, maxX, maxY) => {
  let idleTimeout
  const idleDelay = 350
  const clip = d3.select(ref).select('svg')
    .append("defs").append("svg:clipPath")
      .attr("id", "clip")
      .append("svg:rect")
      .attr("width", width )
      .attr("height", height )
      .attr("x", 0) 
      .attr("y", 0)

  const scatter = d3.select(ref)
    .select('svg')
    .select('g')
    .select('g.scatter')
    .attr("id", "scatterplot")
    .attr("clip-path", "url(#clip)")

  const idled = () => {
    idleTimeout = null
  }

  const zoom = () => {
    d3.select(ref).select('g.xAxis')
      .transition()  
      .duration(750)
      .call(d3.axisBottom(x).tickSize(0))
      .call(g => g.select(".domain").remove())
    d3.select(ref).select('svg').select('g.yAxis')
      .transition()  
      .duration(750)
      .call(d3.axisLeft(y).tickSize(0))
      .call(g => g.select(".domain").remove())

    addGridToXAxis(ref)
    addGridToYAxis(ref)

    scatter.selectAll("circle")
      .transition()  
      .duration(750)
      .attr("cx", d => x(d[1].bill_length_mm))
      .attr("cy", d => y(d[1].bill_depth_mm))
      
  } 
  const brushended = (event) => {
    var s = event.selection
    if (!s) {
        if (!idleTimeout) return idleTimeout = setTimeout(idled, idleDelay)
        x.domain([0, maxX]).nice()
        y.domain([0, maxY]).nice()
    } else {
        x.domain([s[0][0], s[1][0]].map(x.invert, x))
        y.domain([s[1][1], s[0][1]].map(y.invert, y))
        scatter.select(".brush").call(brush.move, null)
    }
    zoom()
  }

  const brush = d3.brush()
    .extent([[0, 0], [width, height]])
    .on("end", brushended)

  scatter.append("g")
    .attr("class", "brush")
    .call(brush)

}

export const addScatterPlotLegend =  (ref, color) => {
  const svg = d3.select(ref).select('svg').select('g')
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
}
    
