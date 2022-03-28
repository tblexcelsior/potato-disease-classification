import React, { useEffect } from "react";
import './index.css'
export default function PredictTag(props){
    const files = props.files
    const image = files.map(file => (
        <div key={file.name} >
            <img   
                src={file.preview}
                className="predict-image"
            />
        </div>
    ))


    return(
        <div className="predict-tag">
            {image}
            
            <div className="predict-info">
                <p>Class: {props.data['class']}</p>
                <p>Confidence: {(parseFloat(props.data['confidence'])*100).toFixed(2)}%</p>
            </div>

        </div>
    )
}