import "./Choice.css";

function Choice( {choice} ) {
    return (
        <div className="choice">
            <p>{choice.text}</p>
            <p>{choice.successRate*100}%</p>
        </div>
    );
}

export default Choice;