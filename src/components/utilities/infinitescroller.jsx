

import React from 'react'


function InfiniteScroller() {

 const styleH1 = {
    textAlign: "center",
    fontSize: "24px",
 }

//  window.onload = function () {
//   const scrollers = document.querySelectorAll(".scroller");

//   if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
//     addAnimation();
//   }


// function addAnimation() {
//   scrollers.forEach((scroller) => {
//     scroller.setAttribute("data-animated", true)

//     const scrollerInner = scroller.querySelector(".scroller__inner")
//     const scrollerContent = Array.from(scrollerInner.children)

//     scrollerContent.forEach((item) => {
//       const duplicateItem = item.cloneNode(true)
//       duplicateItem.setAttribute("aria-hidden", true)
//       //El atributo aria-hidden se utiliza para indicar a los lectores de pantalla que un elemento no debe ser anunciado //cambiar si no funciona en el mobile por el de abajo
//       scrollerInner.appendChild(duplicateItem)
//     })
//   })
// }
// }

 React.useEffect(() => {
  const scrollers = document.querySelectorAll(".scroller");

  const handleAnimation = () => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }
  };

  const addAnimation = () => {
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", true);

      const scrollerInner = scroller.querySelector(".scroller__inner");
      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicateItem = item.cloneNode(true);
        duplicateItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicateItem);
      });
    });
  };

  // Manejar la animación cuando el componente se monta
  handleAnimation();

  // Agregar un event listener para manejar la animación en futuros cambios
  window.addEventListener('resize', handleAnimation);

  // Limpiar el event listener cuando el componente se desmonta
  return () => {
    window.removeEventListener('resize', handleAnimation);
  };
}, []); // El segundo argumento vacío asegura que este efecto se ejecute solo una vez al montar el componente.



 return (

    <>
      <h1 style={styleH1}>Marcas</h1>

      <div className='body-scroller'>
      <div className='scroller' data-speed="fast" >
       
      <ul className='tag-list scroller__inner'>
        <li>Hermes</li>
        <li>Michael Kors</li>
        <li>Valentino</li>
        <li>Hugo Boss</li>
        <li>Zara</li>
        <li>Prada</li>
        <li>MOSHINO</li>
        <li>Gucci</li>
        <li>LeCoq</li>
        <li>Addidas</li>
        <li>Levis</li>
        <li>American Eagle</li>
        <li>H&M</li>
        <li>Fendi</li>
        <li>Giorgio Armani</li>
        <li>Gap</li>
        <li>Ralph Lauren</li> 
        <li>Mango</li>
        <li>Jackie Smith</li>
      </ul>
      </div>

      <div className="scroller" data-speed="slow" >
        <div className="scroller__inner">
          <img src="https://i.imgur.com/EetOdLJ.png" alt="" />
          <img src="https://i.imgur.com/iOhT4Mo.png" alt="" />
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
