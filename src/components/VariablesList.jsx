import "./common.css";
import "./VariablesList.css";

function VariablesList({ variables }) {
    return (
        <div className="default-box var-list">
            {Object.keys(variables).map((varName) => {
                return <p key={varName}>{varName}: {variables[varName]}</p>;
            })}
        </div>
    );
}

export default VariablesList;