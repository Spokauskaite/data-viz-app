import { useState, useEffect , useRef} from 'react'
import Handsontable from "handsontable"
import 'handsontable/dist/handsontable.full.css'
import useAuth from '../useAuth'

const HandsonTable = ({api}) => {
  const jTable = useRef(null)
  const thisTable = jTable.current
  const [ loading, data, error ] = useAuth(api)

  const range = (start, stop, step) => {
    return Array.from(
      { length: (stop - start) / step + 1},
      (_, i) => start + (i * step))
  }

  const options = {
    data: data,
    colWidths: 100,
    width: '100%',
    height: 320,
    rowHeights: 23,
    rowHeaders: true,
    colHeaders: true,
    overflow: 'scroll',
    licenseKey: 'non-commercial-and-evaluation'
    /*tableOverflow:true,
    tableWidth: "1000px",
    tableHeight: "400px",
    lazyLoading: true,
    lazyColumns: true,
    loadingSpin: true,
    defaultColWidth: 150,
    rowResize: true,
    search: true, 
    updateTable:function(
      instance, 
      cell, 
      col, 
      row, 
      val, 
      label, 
      cellName
    ) {
      if (row % 2) {
          cell.style.backgroundColor = '#edf3ff'
      }
      if (col == 1) {
        cell.style.backgroundColor = '#ff7f0e'
        cell.style.color = '#ffffff'
      }
    } /*
    onload: function(el, instance) {
      let indices = range(0,100,1)
      indices.map( idx => {
        const headerStyle = instance.thead.firstElementChild
        .children[idx].style
        headerStyle.backgroundColor = "#1f77b4"
        headerStyle.color = "#ffffff"
      }
      )
    }   */
  }

  useEffect(() => {
    data && Handsontable(thisTable, options)
  }, [options])

  return (
    <>
      <div>
        <div ref={jTable} />
      </div>
    </>
  )
}

export default HandsonTable



/*
const HandsonTable = (api) => {
  const [ loading, data, error ] = useAuth(api)
  const data1 = [
    ['', 'Tesla', 'Mercedes', 'Toyota', 'Volvo'],
    ['2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13]
  ]

  useEffect(() => {
    //data && drawScatterPlot(data)
  },[data])

  return(
    <>
      {
        //loading ? <div>Loading...</div> :
          //error ? <div className='error'>Error Fetching Data </div> :
            data1 && <HotTable data={data1} colHeaders={true} rowHeaders={true} width="600" height="300" />
      }
    </>
  )
}

export default HandsonTable


*/