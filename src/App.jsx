import { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';
import ChoiceBox from './components/ChoiceBox';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import story from './assets/dishonored_story.json';
import StoryPointText from './components/StoryPointText';

function App() {
    // const [currStorypointName, setCurrStorypointName] = useState("start");
    const [currStorypoint, setCurrStorypoint] = useState(story.storypoints["start"]);
    const [key, setKey] = useState(0);
    const [openChoiceBox, setOpenChoiceBox] = useState(false);
    
    const restart = (event) => {
        setCurrStorypoint(story.storypoints["start"]);
        setOpenChoiceBox(false);
        setKey(prevKey => prevKey + 1);
    };

    const showChoices = () => {
        setOpenChoiceBox(true);
    }

    return (
        <>
            <h1>{story.title}</h1>
            <Button onClick={restart} type="primary">Restart</Button>
            <StoryPointText key={key} storypoint={currStorypoint} onFinished={showChoices}/>
            <Collapse in={openChoiceBox}>
                <div>
                    {openChoiceBox && <ChoiceBox prompt={currStorypoint.prompt} choices={currStorypoint.choices} />}
                </div>
            </Collapse>
        </>
    )
}

export default App
