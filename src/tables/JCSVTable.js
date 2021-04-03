import { useState, useEffect, useRef } from 'react'
import useAuth from '../useAuth'
import jspreadsheet from 'jspreadsheet-ce'
import "../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css"

const JCSVTable = ({api}) => {

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
    tableOverflow:true,
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
    },
    onload: function(el, instance) {
      let indices = range(0,100,1)
      indices.map( idx => {
        const headerStyle = instance.thead.firstElementChild
        .children[idx].style
        headerStyle.backgroundColor = "#1f77b4"
        headerStyle.color = "#ffffff"
      }
      )
    }  
  }

  useEffect(() => {
    data && jspreadsheet(thisTable, options)
  }, [options])

  const addRow = () => {
    thisTable.jexcel.insertRow()
  };

  return (
    <>
      <div>
        <div ref={jTable} />
        <br />
        <input
          type="button" 
          onClick={addRow} 
          value="Add new row" 
        />
      </div>
    </>
  )
}

export default JCSVTable