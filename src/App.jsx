import { useState, useEffect } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import ChoiceBox from './components/ChoiceBox';
import VariablesList from './components/VariablesList';
import StoryPointText from './components/StoryPointText';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import story from './assets/dishonored_story.json';

// TODO: Write story JSON validator

function App() {
    // const [currStorypointName, setCurrStorypointName] = useState("start");
    const [currStorypoint, setCurrStorypoint] = useState(story.storypoints["START"]);
    const [key, setKey] = useState(0);
    const [openChoiceBox, setOpenChoiceBox] = useState(false);
    const [variables, setVariables] = useState(story.variables);

    const restart = (event) => {
        setCurrStorypoint(story.storypoints["START"]);
        setOpenChoiceBox(false);
        setKey(prevKey => prevKey + 1);
        setVariables(story.variables);
    };

    const showChoices = () => {
        setOpenChoiceBox(true);
    };

    const checkVarCondition = (condition) => {
        const regexp = /\[(.+)\]([<>=])\((.+)\)/;
        let match = condition.match(regexp);
        let varName = match[1], operator = match[2], value = match[3];
        switch(operator) {
            case '<':
                return variables[varName] < value;
            case '>':
                return variables[varName] > value;
            case '=':
                return variable[varName] == value;
        }
    };

    const validChoices = () => {
        const valid = currStorypoint.choices.filter(choice => {
            let allGood = true;
            if (choice.conditions) {
                choice.conditions.forEach(condition => {
                    if (!checkVarCondition(condition))
                        allGood = false;
                });
            }
            return allGood;
        });
        return valid;
    };

    const updateStorypoint = (choiceResult) => {
        let newStoryPoint = story.storypoints[choiceResult.nextStoryPoint];
        if (choiceResult.varChanges) {
            setVariables((prevVariables => {
                let newVariables = {...prevVariables}
                Object.keys(choiceResult.varChanges).forEach(varName => {
                    newVariables[varName] += choiceResult.varChanges[varName];
                });

                let activeTrigger = null;
                story.varTriggerEvents.forEach(trigger => {
                    if (newVariables[trigger.varName] == trigger.varValue) {
                        activeTrigger = trigger;
                    }
                });
                if (activeTrigger) {
                    newStoryPoint = story.storypoints[activeTrigger.nextStoryPoint];
                }

                return newVariables;
            }));
        }
        setCurrStorypoint(newStoryPoint);
    };

    const handleChoiceResult = (choiceResult) => {
        updateStorypoint(choiceResult);
    };

    useEffect(() => {
        setOpenChoiceBox(false);
    }, [currStorypoint])

    const renderChoicesOrEnd = () => {
        if (currStorypoint.prompt) {
            return (
                <Collapse in={openChoiceBox}>
                    <div>
                        {<ChoiceBox key={key} prompt={currStorypoint.prompt} choices={validChoices()} onChoiceResult={handleChoiceResult}/>}
                    </div>
                </Collapse>
            );
        } else {
            return (
                <Collapse in={openChoiceBox}>
                    <div className="end-div">
                        <p>THE END</p>
                    </div>
                </Collapse>
            );
        }
    }

    return (
        <>
            <h1>{story.title}</h1>
            <Button onClick={restart} type="primary">Restart</Button>
            <div className="panels-contain">
                <div className="left-panel">
                    <StoryPointText key={key} storypoint={currStorypoint} onFinished={showChoices}/>
                    {renderChoicesOrEnd()}
                </div>
                <VariablesList key={key} variables={variables}/>
            </div>
        </>
    )
}

export default App
