import React from 'react'

//Componente de conexion con Whastapp que usa un icono mas un popup que lleva a whastapp web hecho por elfsight widgets
function ChatElfsightWhatsapp() {
    const APP_ELFSIGHT_KEY = process.env.REACT_APP_ELFSIGHT_API_KEY
    React.useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://static.elfsight.com/platform/platform.js'
        script.setAttribute('data-use-service-core', '')
        script.async = true

        const div = document.createElement('div'); 
        div.className = `elfsight-app-${APP_ELFSIGHT_KEY}`
        div.setAttribute('data-elfsight-app-lazy', '');

        document.body.appendChild(script)
        document.body.appendChild(div)
        return () => {
            document.body.removeChild(script)
            document.body.removeChild(div)
        }
    }, [APP_ELFSIGHT_KEY])
    

  return (
    <div className="elfsight-app-65bc8791-f9ad-4850-aadb-d113c99c6df0" data-elfsight-app-lazy/>
  )
}

export default ChatElfsightWhatsapp

