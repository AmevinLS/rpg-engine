import "./Choice.css";

export default function Choice( {choice} ) {
    return (
        <div className="choice">
            <p>{choice.text}</p>
            <p>{choice.successRate*100}%</p>
        </div>
    );
}