import React, { ReactNode, useState } from 'react'
import IncidentContext from './incidentContext'

interface IncidentStateProps {
  children: ReactNode;
}

const IncidentState: React.FC<IncidentStateProps> = (props) => {
  const [investigationOutput, setInvestigationOutput] = useState<number>(0.00)

  const investigationOutpufunction = (investOutput: number): void => {
    setInvestigationOutput(investOutput)
  }

  return (
    <div>
      <IncidentContext.Provider value={{ investigationOutput, investigationOutpufunction }} >
        {props.children}
      </IncidentContext.Provider>
    </div>
  )
}

export default IncidentState