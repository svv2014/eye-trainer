import {strings} from "../languages/localizationStrings";
import React from "react";
import {hot} from "react-hot-loader";
import "../css/SelfTest.css"

let eyeTestRows = [ {text: strings.eyeTestRow_1, size: 100},
    { text: strings.eyeTestRow_2, size: 80},
    { text: strings.eyeTestRow_3, size: 70},
    { text: strings.eyeTestRow_4, size: 60},
    { text: strings.eyeTestRow_5, size: 50},
    { text: strings.eyeTestRow_6, size: 40},
    { text: strings.eyeTestRow_7, size: 30},
    { text: strings.eyeTestRow_8, size: 20},
    { text: strings.eyeTestRow_9, size: 15},
    { text: strings.eyeTestRow_10, size: 10},
    { text: strings.eyeTestRow_11, size: 5},
]

const SelfTest = () => (
    <div className="SelfTest">
        <h1 className={"pageTitle"}>{strings.selfTestTitle}</h1>
        <h3 className={"textGray"}> Test based on material from <a href={"res/block_letter_eye_chart.pdf"}>Document</a></h3>
        {eyeTestRows.map((row,index) =>
            <div className={"selfTestRowContainer"}> <div style={{"font-size": 18, display: "inline-block"}}> {index + 1}.</div><div className={"testRows"} style={{"font-size": row.size}}> {row.text}</div> </div>
        )}
    </div>
);

export default hot(module)(SelfTest);
