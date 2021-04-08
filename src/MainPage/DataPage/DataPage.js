import { useContext } from 'react'
import DataContext from '../DataContext'

const DataPage = () => {
  const {generatedData, setGeneratedData} =  useContext(DataContext)
  console.log(generatedData)

  return (
    <>
      <h1>DATA PAGE</h1>
      {
        generatedData && <div>{JSON.stringify(generatedData)}</div>
      }
    </>
  )
}

export default DataPage
