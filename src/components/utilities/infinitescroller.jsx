
import React from 'react'

function InfiniteScroller() {

  const styleH1 = {
    textAlign: "center",
    fontSize: "34px",
  }

  // const styleScroller = {
  //   display: 'flex',
  //   justifyContent: 'center',
  // };

  // React.useEffect(() => {
  //   const scroller = document.querySelector('.scroller__inner');

  //   const scroll = () => {
  //     scroller.scrollLeft += 1; // Ajusta la velocidad de desplazamiento aquí
  //   };

  //   const interval = setInterval(scroll, 50); // Ajusta la frecuencia de actualización aquí

  //   return () => clearInterval(interval);
  // }, []);

  const scrollers = document.querySelectorAll(".scroller")

  if(!window.matchMedia("prefers-reduced-motion: reduce").matches){
    addAnimation()
  }

  function addAnimation() {
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", true)

      const scrollerInner = scroller.querySelector(".scroller__inner")
      const scrollerContent = Array.from(scrollerInner.children)

      scrollerContent.forEach((item) => {
        const duplicateItem = item.cloneNode(true)
        // duplicateItem.setAttribute("aria-hidden", true)//El atributo aria-hidden se utiliza para indicar a los lectores de pantalla que un elemento no debe ser anunciado
        scrollerInner.appendChild(duplicateItem)
      })
    })
  }

  return (

    <>
      <h1 style={styleH1}>Marcas</h1>

      <div className='body-scroller'>
      <div className='scroller'  data-speed="fast" >
        
      <ul className='tag-list scroller__inner'>
        <li>Hermes</li>
        <li>Michael Kors</li>
        <li>Zara</li>
        <li>Prada</li>
        <li>MOSHINO</li>
        <li>Gucci</li>
        <li>LeCoq</li>
        <li>Addidas</li>
        <li>Levis</li>
        <li>American Eagle</li>
        <li>H&M</li>
        <li>Giorgio Armani</li>
        <li>Gap</li>
        <li>Jackie Smith</li>
      </ul>
      </div>

      <div className="scroller"  data-speed="slow" >
        <div className="scroller__inner">
          <img src="https://i.imgur.com/EetOdLJ.png" alt="" />
          <img src="https://i.imgur.com/mkmU7Da.png" alt="" />
          <img src="https://i.imgur.com/TbyKuVP.png" alt="" />
          <img src="https://i.imgur.com/54W7AWD.png" alt="" />
          <img src="https://i.imgur.com/K8Z6cqF.png" alt="" />
          <img src="https://i.imgur.com/hRBFJeZ.png" alt="" />
          <img src="https://i.imgur.com/ELn3AIA.png" alt="" />
          <img src="https://i.imgur.com/9LiuYxS.png" alt="" />
          <img src="https://i.imgur.com/Nj3BuWf.png" alt="" />
          <img src="https://i.imgur.com/MykEBZ9.png" alt="" />
          <img src="https://i.imgur.com/3mwrK4e.png" alt="" />
          <img src="https://i.imgur.com/uDsZjwD.png" alt="" />
          <img src="https://i.imgur.com/hzaFJ76.png" alt="" />
          <img src="https://i.imgur.com/pjBztBg.png" alt="" />
          <img src="https://i.imgur.com/E2sRyiP.png" alt="" />
          <img src="https://i.imgur.com/Qm3AJj4.png" alt="" />
          <img src="https://i.imgur.com/Nee6MyI.png" alt="" />
          <img src="https://i.imgur.com/xLXYU3P.png" alt="" />
          <img src="https://i.imgur.com/3i0BLJZ.png" alt="" />
        </div>
      </div>
      </div>
    </>
    
  )
}

export default InfiniteScroller