import React from 'react'

function TextEffectLoop({text, speed}) {
const [visibleText,setVisibleText] = React.useState('')


React.useEffect(() => {
    const interval = setInterval(() => {
        setVisibleText(text.slice(0, visibleText.length + 1))

        if (visibleText.length === text){
            setVisibleText('')//Reniciar texto
        }

    }, speed)

    return () => clearInterval(interval)
}, [visibleText, text, speed])

  return (
    <span key={text}>{visibleText}</span>
  )
}

export default TextEffectLoop