import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ChoiceBox from './components/ChoiceBox';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import story from './assets/dishonored_story.json';
import StoryPointText from './components/StoryPointText';

function App() {
    return (
        <>
            <h1>Hello Habibis</h1>
            <StoryPointText storypoint={story.storypoints.start} />
            <ChoiceBox choices={story.storypoints.start} />
        </>
    )
}

export default App
