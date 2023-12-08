import Choice from "./Choice";
import "./ChoiceBox.css";

function ChoiceBox({ prompt, choices, onChoiceMade }) {
    return (
        <div className="default-box choice-box">
            <p>{prompt}</p>
            {choices.map((choice) => {
                return <Choice key={choice.text} choice={choice} onChoiceMade={onChoiceMade}/>;
            })}
        </div>
    );
}

export default ChoiceBox;