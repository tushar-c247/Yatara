import React, { useState, ChangeEvent } from 'react'
import { Data } from "../Investigation";
import Accident from './Accident';

const Accident_Calculation: React.FC<{ data: Data }> = (props) => {
    const { data } = props;

    const [dropDownvalue, setDropDownvalue] = useState<number[][]>(Array(12).fill([]).map(()=> Array(5).fill(0)))

    const accidentHandleChange = (e: ChangeEvent<HTMLInputElement>, questionIndex: number, fieldIndex: number) => {
        const accidenUpdatedValue = [...dropDownvalue]
        accidenUpdatedValue[questionIndex][fieldIndex] = Number(e.target.value)
        setDropDownvalue(accidenUpdatedValue)
        console.log("index",questionIndex)
        alert(accidenUpdatedValue)
    }
    console.log("Dropdownvalue", dropDownvalue)

    let totalValueAccident: number = 0;
    dropDownvalue.forEach((item)=>{
        item.forEach((value)=>{
            totalValueAccident += value
        })
    })
    console.log("totalValueAccident", totalValueAccident)

    // let totalWeightAccident: number = 0;
    // dropDownvalue.forEach()
    
    
    return (
        <>
            <Accident data={data} accidentHandleChange={accidentHandleChange} />
        </>
    )
}

export default Accident_Calculation