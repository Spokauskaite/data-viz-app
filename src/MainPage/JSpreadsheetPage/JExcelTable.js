import { useState, useEffect, useRef } from 'react'
import useAuth from '../useAuth'
import jspreadsheet from 'jspreadsheet-ce'
import "../../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css"

const JExcelTable = ({api}) => {

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
    columns: [
      { 
        type: 'dropdown', 
        title:'Species', 
        width:120, 
        source:[ "Adelie", "Chinstrap", "Gentoo" ]  
      },
      { type: 'text', title:'Island', width:150 },
      { type: 'numeric', title:'Bill Length (mm)' },
      { type: 'numeric', title:'Bill Depth (mm)'  },
      { type: 'numeric', title:'Flipper Length (mm)' },
      { type: 'numeric', title:'Body Mass (g)'},
      { type: 'text', title:'Sex' },
      { type: 'calendar', title:'Date'}
    ],
    tableWidth: "100%",
    tableHeight: "70vh",
    tableOverflow:true,
    minDimensions: [8, 8],
    defaultColWidth: 150,
    rows:{ 3: { height:'50px' }},
    rowResize: true,
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
      let indices = range(0,8,1)
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

export default JExcelTable