import React, { useContext } from 'react'
import styles from "../styles/Investigation.module.scss"
import { useState, ChangeEvent } from 'react';
import IncidentContext from '../context/incidents/incidentContext';

export interface Incident {
    id: number;
    question: string;
    max: number;
    weight: number;
}

export interface Data {
    "accident files_93": Incident[];
    investigation93: Incident[];
}

const Investigation: React.FC<{ data: Data }> = (props) => {
    const { data } = props
    const context =  useContext(IncidentContext)
    const {investigationOutpufunction} = context
    const [selectedValue, setSelectedValue] = useState<(number)[]>([]); 

    const handleChange = (e: ChangeEvent<HTMLSelectElement>, index: number) => {
        const updatedValue = [...selectedValue];
        updatedValue[index] = Number(e.target.value)
        setSelectedValue(updatedValue)
        console.log("updated value", updatedValue)
    }

    console.log("selectedvalue", selectedValue)

    const totalValue = selectedValue.reduce((acc: number, value: number) =>{
        if(value !== undefined){
            return acc + value
        }
        return acc
        },0);
    console.log("totalValue", totalValue)

    const totalWeight = selectedValue.reduce((acc, value, index) => {
        const weight = value;
        if (weight !== undefined){
            return acc + (data.investigation93[index]?.weight)
        }
        return acc
    }, 0);
    console.log("totalweight", totalWeight)

    const investigationOutput = totalValue != 0 && totalWeight !== 0 ? (totalValue / totalWeight * 100).toFixed(2) : 0.00;
    console.log("output", investigationOutput)

    investigationOutpufunction(investigationOutput)
    
    return (
        <div className={styles.investigationContainer}>
            <h2 id={styles.investigation93}>Investigation93</h2>
            <div className={styles.answercommentdiv}>
                <h3 id={styles.answer}>Answer?</h3>
                <h3 id={styles.comment}>Comments</h3>
            </div>
            <div>
                {data?.investigation93?.map((item: Incident, index: number) => (
                    <div key={item.id} className={styles.parentdivmap}>
                        <div className={styles.questions}>
                            <ul className={styles.questionUl} key={item.id}>
                                <li id={styles.qusli}>Q-{index + 1}.</li><li>{item.question}</li>
                            </ul>
                        </div>
                        <div className={styles.investigationDropdown}>
                            <form action="">
                                <select id={styles.dropdownselect} onChange={(e) => handleChange(e, index)}>
                                    <option value="" disabled selected hidden>Select Answer </option>
                                    <option value={`${item.weight}`}>Yes</option>
                                    <option value="0">No</option>
                                    <option value={`${item.weight / 2}`}>Partial</option>
                                    <option value="0">N/A</option>
                                </select>
                            </form>
                        </div>
                        <div className={styles.investigationComment}>
                            <form action="">
                                <textarea name="message"></textarea>
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Investigation