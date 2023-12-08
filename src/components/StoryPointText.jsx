import { useState } from 'react';
import "./common.css";
import "./StoryPointText.css";

export default function StoryPointText({ storypoint, onFinished}) {
    const [textIndex, setTextIndex] = useState(0);
    const [isFinalText, setIsFinalText] = useState(false);

    const handleClick = (event) => {
        if (textIndex < storypoint.texts.length-1) {
            if(textIndex+1 == storypoint.texts.length-1) {
                setIsFinalText(true);
                onFinished();
            }
            setTextIndex(textIndex + 1);
        }
    };

    return (
        <div className={"default-box story-text-box" + ((isFinalText) ? "" : " clickable")} onClick={handleClick}>
            <p>{storypoint.texts[textIndex]}</p>
            {(!isFinalText) ? (<p className="weak-prompt">[Click to continue]</p>) : null}      
        </div>
    );
}