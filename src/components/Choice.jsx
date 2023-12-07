import "./common.css";
import "./Choice.css";

function Choice( {choice} ) {
    return (
        <div className="choice clickable">
            <p>{choice.text}</p>
            <p>{choice.successRate*100}%</p>
        </div>
    );
}

export default Choice;