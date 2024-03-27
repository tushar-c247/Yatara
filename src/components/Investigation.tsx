import React, { useContext } from 'react';
import styles from "../styles/Investigation.module.scss";
import { useState, ChangeEvent } from 'react';
import IncidentContext from '../context/incidents/incidentContext';
import { CloseOutlined } from '@ant-design/icons';

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
    const { data } = props;
    const context = useContext(IncidentContext);
    const { investigationOutputFunction } = context;
    const [selectedValues, setSelectedValues] = useState<{ id: number; value: number | string | any }[]>([]);

    const handleChange = (e: ChangeEvent<HTMLSelectElement>, index: number, id: number) => {
        
        const updatedValues = [...selectedValues];
        if (e.target.value == "N/A") {
            updatedValues[index] = { id, value: e.target.value };
        }
        else {
            updatedValues[index] = { id, value: Number(e.target.value) };
        }
        setSelectedValues(updatedValues);
        console.log("updated values", updatedValues);
    };

    const handleCancel = (id: number, e: any) => {
        e.preventDefault()
        const updatedValues = selectedValues.filter(value => value.id !== id);
        setSelectedValues(updatedValues);
    };
    
    console.log("selected values", selectedValues);

    const totalValue = selectedValues.reduce((acc: number, currentValue) => {
        if (currentValue !== undefined && !isNaN(currentValue.value)) {
            return acc + currentValue.value
        }
        return acc
    }, 0);

    console.log("total value", totalValue);

    const totalWeight = selectedValues.reduce((acc, currentValue) => {
        if (currentValue !== undefined && !isNaN(currentValue.value)) {
            const { id } = currentValue
            const incident = data.investigation93.find(incident => incident.id === id);
            return acc + (incident?.weight || 0);
        }
        return acc;
    }, 0);
    console.log("total weight", totalWeight);

    const investigationOutput =
        totalValue !== 0 && totalWeight !== 0 ? ((totalValue / totalWeight) * 100).toFixed(2) : 0;
    console.log("output", investigationOutput);

    investigationOutputFunction(investigationOutput);

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
                                <li id={styles.qusli}>Q-{index + 1}.</li>
                                <li>{item.question}</li>
                            </ul>
                        </div>
                        <div className={styles.investigationDropdown}>
                            <form action="">
                                <select id={styles.dropdownselect} defaultValue="" onChange={(e) => handleChange(e, index, item.id)}>
                                    <option value="" disabled hidden>
                                        Select Answer
                                    </option>
                                    <option value={`${item.weight}`}>Yes</option>
                                    <option value={0}>No</option>
                                    <option value={`${item.weight / 2}`}>Partial</option>
                                    <option value="N/A">N/A</option>
                                </select>
                                {selectedValues.some(value => value.id === item.id)  &&( <button onClick={(e) => handleCancel(item.id, e)} id={styles.cancelbtn}><CloseOutlined /></button>)}
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
    );
};

export default Investigation;
