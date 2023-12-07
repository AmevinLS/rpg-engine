import { useState } from 'react';
import "./StoryPointText.css";

export default function StoryPointText({ storypoint }) {
    const [textIndex, setTextIndex] = useState(0);

    const handleClick = (event) => {
        setTextIndex(textIndex + 1);
    };

    return (
        <div className="story-text-box" onClick={handleClick}>
            <p>{storypoint.texts[textIndex]}</p>       
        </div>
    );
}