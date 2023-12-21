import React from 'react'

function ChatElfsightWhatsapp() {
    React.useEffect(() => {
        const script = document.createElement('script')
        script.src = 'https://static.elfsight.com/platform/platform.js'
        script.setAttribute('data-use-service-core', '')
        script.async = true

        const div = document.createElement('div'); 
        div.className = 'elfsight-app-65bc8791-f9ad-4850-aadb-d113c99c6df0';
        div.setAttribute('data-elfsight-app-lazy', '');

        document.body.appendChild(script)
        document.body.appendChild(div)
        return () => {
            document.body.removeChild(script)
            document.body.removeChild(div)
        }
    }, [])
    

  return (
    <div className="elfsight-app-65bc8791-f9ad-4850-aadb-d113c99c6df0" data-elfsight-app-lazy/>
  )
}

export default ChatElfsightWhatsapp

// {/* <script src="https://static.elfsight.com/platform/platform.js" data-use-service-core defer></script>
// <div class="elfsight-app-65bc8791-f9ad-4850-aadb-d113c99c6df0" data-elfsight-app-lazy></div> */}