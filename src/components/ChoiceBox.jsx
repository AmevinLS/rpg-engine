import Choice from "./Choice";
import "./ChoiceBox.css";

function ChoiceBox({ prompt, choices }) {
    return (
        <div className="choice-box">
            <p>{prompt}</p>
            {choices.map((choice) => {
                return <Choice key={choice.text} choice={choice}/>;
            })}
        </div>
    );
}

export default ChoiceBox;