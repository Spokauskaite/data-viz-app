import JExcelTable from './tables/JExcelTable'
import JCSVTable from './tables/JCSVTable'

const JSpreadsheet = () => {

  return (
    <>
      <h1>JSpreadsheet PAGE</h1>
      <JExcelTable api='/loadPenguinData'/>
      <JCSVTable api='/loadLargeData'/>
    </>
  )
}

export default JSpreadsheet
