import { useState, useEffect } from 'react';
import "./common.css";
import "./StoryPointText.css";

export default function StoryPointText({ storypoint, onFinished}) {
    // const [storypoint, setStorypoint] = useState(storypoint);
    const [textIndex, setTextIndex] = useState(0);
    const [isFinalText, setIsFinalText] = useState(false);

    useEffect(() => {
        setTextIndex(0);
        setIsFinalText(false);
    }, [storypoint])

    const handleClick = (event) => {
        if (textIndex < storypoint.texts.length) {
            if(textIndex+1 == storypoint.texts.length) {
                setIsFinalText(true);
                onFinished();
            } else {
                setTextIndex(textIndex + 1);
            }
        }
    };

    return (
        <div className={"default-box story-text-box" + ((isFinalText) ? "" : " clickable")} onClick={handleClick}>
            <p>{storypoint.texts[textIndex]}</p>
            {(!isFinalText) ? (<p className="weak-prompt">[Click to continue]</p>) : null}      
        </div>
    );
}