import { useState, useEffect, useRef } from 'react'
import useAuth from '../useAuth'
import jspreadsheet from 'jspreadsheet-ce'
import "../../node_modules/jspreadsheet-ce/dist/jspreadsheet.css"

const JExcelTable = ({api}) => {

  const jTable = useRef(null)
  const thisTable = jTable.current
  const [ loading, data, error ] = useAuth(api)

  const options = {
    data: data,
    minDimensions: [10, 10]
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
        <input type="button" onClick={addRow} value="Add new row" />
      </div>
    </>
  )
}

export default JExcelTable