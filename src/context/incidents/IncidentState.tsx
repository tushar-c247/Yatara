import React, { ReactNode, useState } from 'react'
import IncidentContext from './incidentContext'

interface IncidentStateProps {
  children: ReactNode;
}

const IncidentState: React.FC<IncidentStateProps> = (props) => {
  const [output, setOutput] = useState<number>(4)


  const investigationOutpufunction = (investOutput: number): void => {
    setOutput(investOutput)
  }

  return (
    <div>
      <IncidentContext.Provider value={{ output, investigationOutpufunction }} >
        {props.children}
      </IncidentContext.Provider>
    </div>
  )
}

export default IncidentState