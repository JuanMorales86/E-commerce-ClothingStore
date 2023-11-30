import React from 'react'
import MostProductSelled from './mostproductselled';


//!No lo estoy usando


function IfiniteScrollerCard() {


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

 
}, []); // El segundo argumento vacío asegura que este efecto se ejecute solo una vez al montar el componente.



 return (

  <>
  <MostProductSelled/>
</>
)
}

export default IfiniteScrollerCard