import { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import Choice from "./Choice";
import "./ChoiceBox.css";

function ChoiceBox({ prompt, choices, onChoiceResult }) {
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [choiceResult, setChoiceResult] = useState(null);

    const handleChoiceMade = (choice, result) => {
        setSelectedChoice(choice);
        setChoiceResult(result);
    };

    const handleContinueAfterResult = (event) => {
        onChoiceResult(choiceResult);
    };

    return (
        <div className="default-box choice-box">
            <p>{prompt}</p>
            {choices.map((choice) => {
                let mode = "default";
                if (selectedChoice) {
                    if (choice == selectedChoice) {
                        mode = "perma-on"
                    } else {
                        mode = "perma-off";
                    }
                }
                console.log(mode);
                return <Choice key={choice.text} choice={choice} mode={mode} onChoiceMade={handleChoiceMade}/>;
            })}
            <hr/>
            <div className={`result-div ${choiceResult ? 'show-result': ''}`}>
                {(choiceResult) ?
                    <>
                        <p>{choiceResult.text}</p>
                        <p className="weak-prompt clickable" onClick={handleContinueAfterResult}>[Click to continue]</p>
                    </>
                : null}
            </div>
        </div>
    );
}

export default ChoiceBox;