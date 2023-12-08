import { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import Choice from "./Choice";
import "./ChoiceBox.css";

function ChoiceBox({ prompt, choices, onChoiceResult }) {
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [choiceResult, setChoiceResult] = useState(null);

    const handleChoiceMade = (choice) => {
        setSelectedChoice(choice);
        const newChoiceResult = (Math.random() < choice.successRate) ? choice.success : choice.fail;
        setChoiceResult(newChoiceResult);
    };

    const handleContinueAfterResult = (event) => {
        onChoiceResult(choiceResult);
    };

    return (
        <div className="default-box choice-box">
            <p>{prompt}</p>
            {choices.map((choice) => {
                return <Choice key={choice.text} choice={choice} onChoiceMade={handleChoiceMade}/>;
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