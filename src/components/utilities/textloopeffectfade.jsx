import React from 'react';

function TextEffectLoop({text, speed, speedFadeOut,fadeOutDelay}) {

  const [state, setState] = React.useState('fadeIn');
  const [visibleText, setVisibleText] = React.useState('');

  React.useEffect(() => {
    
    if(state === 'fadeIn') {

      const interval = setInterval(() => {
        setVisibleText(text.slice(0, visibleText.length + 1));
        
        if(visibleText === text) {
        setTimeout(() => {
            setState('fadeOut'); 

        }, fadeOutDelay)
        }
      }, speed)

      return () => clearInterval(interval);

    }

    if(state === 'fadeOut') {
      
      const interval = setInterval(() => {
        setVisibleText(visibleText.slice(0, -1)); 

        if(visibleText.length === 0) {
          setState('fadeIn');
          setVisibleText('');
        }
      }, speedFadeOut);

      return () => clearInterval(interval);
      
    }

  }, [state, text, speed, visibleText, speedFadeOut, fadeOutDelay]);

  return (
    <span key={text}>{visibleText}</span>
  );

}

export default TextEffectLoop;