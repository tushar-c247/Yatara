import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchData } from "../api/FetchData"
import Investigation from './Investigation'
import styles from "../styles/Incident.module.scss"
import IncidentContext from '../context/incidents/incidentContext'
// import Accident_Calculation from './accident/Accident_Calculation'
import Accident from './accident/Accident'

const Incident: React.FC = () => {
    const context = useContext(IncidentContext)
    const { investigationOutput, accidentOutput} = context

    const { isLoading, data, error } = useQuery({
        queryKey: ["incidents"],
        queryFn: () => fetchData()
    });
    if (isLoading) { return <h1>Loading</h1> }
    if (error) { throw Error }
    console.log("incidets", data)

    return (
        <div className={styles.incidentContainer}>
            <h3 id={styles.carrier_name}>{data.carrier.carrier_name}</h3>
            <button id={styles.incidentbtn}><h3>Incidents</h3></button>
            <Investigation data={data.data} />
            <Accident data={data.data} />
            {/* <Accident_Calculation data={data.data} /> */}

            <h3 id={styles.headingScore}>Scores By Type</h3>
            <div className={styles.scoreDisplay}>
                <p id={styles.investigationScore}>investigation93&emsp;&emsp;&emsp;&emsp;&emsp;:&emsp;{investigationOutput}</p>
                <p id={styles.accidentScore}>Accident File_93&emsp;&emsp;&emsp;&emsp;&nbsp;:&emsp;{accidentOutput}</p><hr />
                <h2 id={styles.totalScore}>Total Score&emsp;&emsp;&nbsp;&nbsp;:&emsp;</h2>
            </div>

        </div>
    )
}

export default Incident;
