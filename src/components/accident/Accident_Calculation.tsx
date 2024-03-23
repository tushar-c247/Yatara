// import React, { useState, ChangeEvent, useContext } from 'react';
// import { Data } from "../Investigation";
// import Accident from './Accident';
// import IncidentContext from '../../context/incidents/incidentContext';

// const Accident_Calculation: React.FC<{ data: Data }> = (props) => {
//     const { data } = props;
//     const context = useContext(IncidentContext)
//     const { accidentOutputFun } = context

//     const [dropDownvalue, setDropDownvalue] = useState<(number | undefined | any)[]>(Array(12).fill(undefined));

//     const accidentHandleChange = (e: ChangeEvent<HTMLInputElement>, questionIndex: number, fieldIndex: number) => {
//         const updatedValue = [...dropDownvalue];
//         if (!Array.isArray(updatedValue[questionIndex])) {
//             updatedValue[questionIndex] = [];
//           }
//         updatedValue[questionIndex][fieldIndex] = Number(e.target.value);

//         setDropDownvalue(updatedValue);

//         console.log("updatedValue", updatedValue);
//     }

//     console.log("Dropdownvalue", dropDownvalue);

//     let totalValueAccident: number = 0;
//     dropDownvalue.forEach((item) => {
//         if (item) {
//             item.forEach((value: number) => {
//                 totalValueAccident += value;
//             });
//         }
//     });
//     console.log("totalValueAccident", totalValueAccident);

//     let totalWeightAccident: number = 0;
//     dropDownvalue.forEach((item, index) => {
//         if (item !== undefined) {
//             totalWeightAccident += (data?.["accident files_93"][index]?.weight)
//         }
//     })
//     console.log("totalWeightAccident", totalWeightAccident)


//     const Result_Accidetal_File = totalValueAccident !== 0 || totalWeightAccident !== 0 ? (totalValueAccident / totalWeightAccident * 100).toFixed(2) : 0
//     console.log("Result_Accidetal_File", Result_Accidetal_File)
//     accidentOutputFun(Result_Accidetal_File)
//     return (
//         <>
//             <Accident data={data} accidentHandleChange={accidentHandleChange} />
//         </>
//     )
// }

// export default Accident_Calculation;



