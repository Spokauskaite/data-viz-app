import JExcelTable from './JExcelTable'
import JCSVTable from './JCSVTable'

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
