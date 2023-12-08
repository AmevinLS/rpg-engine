import "./common.css";
import "./Choice.css";

function Choice( {choice, onChoiceMade} ) {
    const handleChoiceMade = (event) => {
        onChoiceMade(choice);
    };

    return (
        <div className="choice clickable" onClick={handleChoiceMade}>
            <p>{choice.text}</p>
            <p>{choice.successRate*100}%</p>
        </div>
    );
}

export default Choice;