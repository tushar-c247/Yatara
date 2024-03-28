import React, { useContext, useState, ChangeEvent } from "react";
import { Incident } from "./Investigation";
import { Data } from "./Investigation";
import styles from "../styles/Accident.module.scss";
import IncidentContext from "../context/incidents/incidentContext";
import { CloseOutlined } from "@ant-design/icons";

const Accident: React.FC<{ data: Data }> = (props) => {
  const { data } = props;
  const context = useContext(IncidentContext);
  const { accidentOutputFun } = context;

  // const [dropDownvalue, setDropDownvalue] = useState<(number | undefined | any)[]>(Array(12).fill(undefined));
  const initialDropDownValues = Array(12)
    .fill(undefined)
    .map(() => Array(5).fill(undefined)); // Initialize state for each dropdown
  const [dropDownvalue, setDropDownvalue] = useState<
    (number | undefined | any)[][]
  >(initialDropDownValues);

  const accidentHandleChange = (
    e: ChangeEvent<HTMLSelectElement>,
    questionIndex: number,
    fieldIndex: number
  ) => {
    const updatedValue = [...dropDownvalue];
    if (!Array.isArray(updatedValue[questionIndex])) {
      updatedValue[questionIndex] = [];
    }
    if (e.target.value == "N/A") {
      updatedValue[questionIndex][fieldIndex] = e.target.value;
    } else {
      updatedValue[questionIndex][fieldIndex] = Number(e.target.value);
    }
    setDropDownvalue(updatedValue);
    console.log("updatedValue", updatedValue);
  };

  const handleCancel = (
    e: React.MouseEvent<HTMLButtonElement>,
    questionIndex: number,
    fieldIndex: number
  ) => {
    e.preventDefault();
    const updatedValue = [...dropDownvalue];
    console.log("handelchange", questionIndex, fieldIndex);
    updatedValue[questionIndex][fieldIndex] = undefined;
    setDropDownvalue(updatedValue);
  };

  console.log("Dropdownvalue", dropDownvalue);

  let totalValueAccident: number = 0;
  let totalWeightAccident: number = 0;
  dropDownvalue.forEach((item, index) => {
    if (item !== undefined) {
      item.forEach((value: number) => {
        if (!isNaN(value)) {
          totalWeightAccident += data?.["accident files_93"][index]?.weight / 5;
          totalValueAccident += value;
        }
      });
    }
  });

  console.log("totalValueAccident", totalValueAccident);
  console.log("totalWeightAccident", totalWeightAccident);

  const Result_Accidetal_File =
    totalValueAccident !== 0 || totalWeightAccident !== 0
      ? ((totalValueAccident / totalWeightAccident) * 100).toFixed(2)
      : 0;
  console.log("Result_Accidetal_File", Result_Accidetal_File);
  accidentOutputFun(Result_Accidetal_File);

  return (
    <div className={styles.AccidentContainer}>
      <h2 id={styles.AccidentFile93}>Accident File_93</h2>
      <div className={styles.answercommentdiv}>
        <h3 id={styles.answer}>Answer?</h3>
        <h3 id={styles.comment}>Comments</h3>
      </div>
      <div className={styles.dateFieldContainer}>
        {[...Array(5)].map((_, index) => (
          <div key={index} className={styles.dateField}>
            <b id={styles.yesIcon}>Yes</b>
            <input className={styles.date_input_filed} type="date" />
          </div>
        ))}
      </div>
      {data &&
        data?.["accident files_93"].map(
          (item: Incident, questionindex: number) => (
            <div key={questionindex} className={styles.parentdivmap}>
              <div className={styles.question}>
                <ul className={styles.questionUl} key={item.id}>
                  <li id={styles.qusli}>Q-{questionindex + 1}.</li>
                  <li id={styles.questionli}>{item.question}</li>
                </ul>
              </div>
              {[...Array(item.max)].map((_, fieldindex) => (
                <div key={fieldindex} className={styles.accidentDropdown}>
                  <form action="">
                    <select
                      id={styles.dropdownselect}
                      value={
                        dropDownvalue[questionindex] &&
                        dropDownvalue[questionindex][fieldindex] !== undefined
                          ? dropDownvalue[questionindex][fieldindex]
                          : ""
                      }
                      onChange={(e) =>
                        accidentHandleChange(e, questionindex, fieldindex)
                      }
                    >
                      <option value="" disabled selected hidden>
                        Select Answer
                      </option>
                      <option value={`${item.weight / 5}`}>Yes</option>
                      <option value={0}>No</option>
                      <option value="N/A">N/A</option>
                    </select>
                    {dropDownvalue[questionindex] &&
                      dropDownvalue[questionindex][fieldindex] !==
                        undefined && (
                        <button
                          onClick={(e) =>
                            handleCancel(e, questionindex, fieldindex)
                          }
                          id={styles.cancelbtn}
                        >
                          <CloseOutlined />
                        </button>
                      )}
                  </form>
                </div>
              ))}
              <div className={styles.accidentComment}>
                <form action="">
                  <textarea name="message"></textarea>
                </form>
              </div>
            </div>
          )
        )}
    </div>
  );
};

export default Accident;
