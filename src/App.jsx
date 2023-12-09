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

    const updateStorypoint = (choiceResult) => {
        if (choiceResult.varChanges) {
            setVariables((prevVariables => {
                let newVariables = {...prevVariables}
                Object.keys(choiceResult.varChanges).forEach(varName => {
                    newVariables[varName] += choiceResult.varChanges[varName];
                });
                return newVariables;
            }));
        }
        setCurrStorypoint(story.storypoints[choiceResult.nextStoryPoint]);
    };

    const handleChoiceResult = (choiceResult) => {
        updateStorypoint(choiceResult);
    };

    useEffect(() => {
        setOpenChoiceBox(false);
    }, [currStorypoint])

    return (
        <>
            <h1>{story.title}</h1>
            <Button onClick={restart} type="primary">Restart</Button>
            <div className="panels-contain">
                <div className="left-panel">
                    <StoryPointText key={key} storypoint={currStorypoint} onFinished={showChoices}/>
                    <Collapse in={openChoiceBox}>
                        <div>
                            {<ChoiceBox key={key} prompt={currStorypoint.prompt} choices={currStorypoint.choices} onChoiceResult={handleChoiceResult}/>}
                        </div>
                    </Collapse>
                </div>
                <VariablesList key={key} variables={variables}/>
            </div>
        </>
    )
}

export default App
