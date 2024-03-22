import React from "react";
import { Incident } from "../Investigation";
import { Data } from "../Investigation";
import styles from "../../styles/Accident.module.scss";

const Accident: React.FC<{ data: Data, accidentHandleChange: any}> = (props) => {
    const { data, accidentHandleChange} = props;

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
                        <b style={{ margin: "0px 0px 0px 10px" }}>Yes</b>
                        <input className={styles.date_input_filed} type="date" />
                    </div>
                ))}
            </div>
            {data?.["accident files_93"].map((item: Incident, questionindex: number) => (
                <div key={questionindex} className={styles.parentdivmap}>
                    <div className={styles.question}>
                        <ul className={styles.questionUl} key={item.id}>
                            <li id={styles.qusli} >Q-{questionindex + 1}.</li><li id={styles.questionli}>{item.question}</li>
                        </ul>
                    </div>
                    {[...Array(item.max)].map((_, fieldindex) => (
                        <div key={fieldindex} className={styles.accidentDropdown}>
                            <form action="">
                                <select id={styles.dropdownselect} onChange={(e) => accidentHandleChange(e, questionindex, fieldindex)}>
                                    <option value="" disabled selected hidden>
                                        Select Answer{" "}
                                    </option>
                                    <option value={`${item.weight/5}`}>Yes</option>
                                    <option value={0}>No</option>
                                    <option value={0}>N/A</option>
                                </select>
                            </form>
                        </div>
                    ))}
                    <div className={styles.accidentComment}>
                        <form action="">
                            <textarea name="message"></textarea>
                        </form>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accident;
