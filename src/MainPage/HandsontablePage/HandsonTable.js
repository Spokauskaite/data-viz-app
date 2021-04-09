import { useContext, useEffect , useRef} from 'react'
import Handsontable from "handsontable"
import 'handsontable/dist/handsontable.full.css'
import DataContext from '../DataContext'

const HandsonTable = () => {
  const tableRef = useRef(null)
  const {generatedData, setGeneratedData} =  useContext(DataContext)

  const range = (start, stop, step) => {
    return Array.from(
      { length: (stop - start) / step + 1},
      (_, i) => start + (i * step))
  }
 
  const dateColumns = range(30,37,1)
  const numericColumns = [13,14,59,60,62]
  const dropdownColumns = [5,6,22]
  let options
  if (generatedData) {
    options = {
      data: generatedData,
      colWidths: 100,
      width: '100%',
      height: 320,
      rowHeights: 23,
      rowHeaders: true,
      colHeaders: Object.keys(generatedData[0]),
      overflow: 'scroll',
      licenseKey: 'non-commercial-and-evaluation',
      cells: function(row, col) {
        var cellPrp = {};
        switch (true) {
          case dropdownColumns.includes(col):
            cellPrp.type = 'dropdown'
            break;
          case numericColumns.includes(col):
            cellPrp.type = 'numeric'
            break;
          case dateColumns.includes(col):
            cellPrp.type = 'date'
            cellPrp.dateFormat= 'MM/DD/YYYY'
            break;
          default:
            cellPrp.type = 'text'
        }
        return cellPrp
      }
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
  }

  useEffect(() => {
    generatedData && Handsontable(tableRef.current, options)
  }, [options])

  return (
    <>
      <div>
        <div ref={tableRef} />
      </div>
    </>
  )
}

export default HandsonTable

