import React, { ReactNode, useState } from 'react'
import IncidentContext from './incidentContext'

interface IncidentStateProps {
  children: ReactNode;
}

const IncidentState: React.FC<IncidentStateProps> = (props) => {
  const [investigationOutput, setInvestigationOutput] = useState<number>(0.00)
  const [accidentOutput, setAccidentOutput] = useState<number>(0.00)

  const investigationOutputFunction = (investOutput: number): void => {
    setInvestigationOutput(investOutput)
  }

  const accidentOutputFun = (accidentOutput: number): void => {
    if (accidentOutput !== null) {
      setAccidentOutput(accidentOutput)
    }
  }

  return (
    <div>
      <IncidentContext.Provider value={{ accidentOutput, investigationOutput, investigationOutputFunction, accidentOutputFun }} >
        {props.children}
      </IncidentContext.Provider>
    </div>
  )
}

export default IncidentState