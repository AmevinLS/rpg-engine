import { useState } from 'react';
import "./common.css";
import "./Choice.css";

function Choice( {choice, mode, onChoiceMade} ) {
    const [choiceResultName, setChoiceResultName] = useState(null)

    const handleChoiceMade = (event) => {
        const newChoiceResultName = (Math.random() < choice.successRate) ? "success" : "fail";
        const result = (newChoiceResultName == "success") ? choice.success : choice.fail;
        
        setChoiceResultName(newChoiceResultName);
        onChoiceMade(choice, result);
    };

    const getClassNames = () => {
        let classes = "choice";
        if (mode == "default") {
            classes += " clickable choice-default";
        } else if (mode == "perma-on") {
            classes += " choice-perma-on";
        } else if (mode == "perma-off") {
            classes += " choice-perma-off";
        }
        return classes;
    }

    const getResultClassNames = (resultName) => {
        let classes = `${resultName}`;
        if (mode == "perma-on") {
            if (choiceResultName == resultName) {
                classes += ` ${resultName}-on`;
            } else {
                classes += ` ${resultName}-off`;
            }
        } else if (mode == "perma-off") {
            classes += ` ${resultName}-off`;
        }
        return classes;
    };

    return (
        <div className="choice-container">
            <div className={getClassNames()} onClick={(mode=="default") ? handleChoiceMade : null}>
                <p>{choice.text}</p>
                <p>{choice.successRate*100}%</p>
            </div>
            <div className={getResultClassNames("success")}>
                Good
            </div>
            <div className={getResultClassNames("fail")}>
                Bad
            </div>
        </div>
    );
}

export default Choice;