import { useState } from 'react';
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
    const [currStorypoint, setCurrStorypoint] = useState(story.storypoints["start"]);
    const [key, setKey] = useState(0);
    const [openChoiceBox, setOpenChoiceBox] = useState(false);
    const [variables, setVariables] = useState(story.variables);

    const restart = (event) => {
        setCurrStorypoint(story.storypoints["start"]);
        setOpenChoiceBox(false);
        setKey(prevKey => prevKey + 1);
    };

    const showChoices = () => {
        setOpenChoiceBox(true);
    };

    const handleChoiceMade = (choice) => {
        console.log(`Will now go to storypoint ${choice.success.nextStoryPoint}`);
    };

    return (
        <>
            <h1>{story.title}</h1>
            <Button onClick={restart} type="primary">Restart</Button>
            <div className="panels-contain">
                <div className="left-panel">
                    <StoryPointText key={key} storypoint={currStorypoint} onFinished={showChoices}/>
                    <Collapse in={openChoiceBox}>
                        <div>
                            {openChoiceBox && <ChoiceBox prompt={currStorypoint.prompt} choices={currStorypoint.choices} onChoiceMade={handleChoiceMade}/>}
                        </div>
                    </Collapse>
                </div>
                <VariablesList variables={variables}/>
            </div>
        </>
    )
}

export default App
