import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const BarChart = ({data}) => {
  const barPlot = useRef(null)
  const drawBarChart = (data) => {
    const svgCanvas = d3.select(barPlot.current)
    .append('svg')
    .attr('width', 600)
    .attr('height', 400)
    .style('border', '1px solid #ddd')
  }

  useEffect(()=>{
    drawBarChart(data)
  },[data])

  return(
    <>
      <div ref={barPlot} className='chart'></div>
    </>
  )
}

export default BarChart