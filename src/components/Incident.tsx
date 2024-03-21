import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchData } from "../api/FetchData"
import Investigation from './Investigation'
import Accident from './Accident'
import styles from "../styles/Incident.module.scss"

const Incident: React.FC = () => {
    const { isLoading, data, error } = useQuery({
        queryKey: ["incidents"],
        queryFn: () => fetchData()
    });
    if (isLoading) {return <h1>Loading</h1>}
    if (error) {throw Error}
    console.log("incidets", data)

    return (
        <div className={styles.incidentContainer}>
            <h3 id={styles.carrier_name}>{data.carrier.carrier_name}</h3>
            <button id={styles.incidentbtn}><h3>Incidents</h3></button>
            <Investigation data={data.data} />
            <Accident data={data.data}/>
            <div>
                <h3>Scores By Type</h3>
                <div>
                    <p>investigation93</p>
                    <p>Accident File_93</p>
                </div>
            </div>
        </div>
    )
}

export default Incident;
