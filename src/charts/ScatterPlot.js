import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const ScatterPlot = ({data}) => {
  const scatterPlot = useRef(null)
  const drawScatterPlot = (data) => {
    const svgCanvas = d3.select(scatterPlot.current)
    .append('svg')
    .attr('width', 600)
    .attr('height', 400)
    .style('border', '1px solid #ddd')
  }

  useEffect(()=>{
    drawScatterPlot(data)
  },[data])

  return(
    <>
      <div ref={scatterPlot} ></div>
    </>
  )
}

export default ScatterPlot