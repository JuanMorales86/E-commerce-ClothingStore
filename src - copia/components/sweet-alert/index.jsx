import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const sweetAlertsModal = ({ showUserData, setShowUserData, calcwithIva, calcTotalPerItemsCart  }) => {
    const MySwal = withReactContent(Swal)
  return (
    <SweetAlert2
    show={showUserData}
    title="Venta Casi Lista"
    html={`Muchas gracias por preferirnos, su factura a abonar es de ${calcwithIva()} Pesos.<br>Le estaremos enviando la factura a su correo electronico con la cantidad de # ${calcTotalPerItemsCart()} productos, Ahora debe ingresar los siguientes datos que requeridos habilitados un poco mas abajo`}
    icon="success"
    confirmButtonText="OK"
    onConfirm={() => setShowUserData(false)}
    timer={2500}
  />
  )
}

export default sweetAlertsModal


{/* <sweetAlertsModal 
showUserData={showUserData}
setShowUserData={setShowUserData}
calcwithIva={calcwithIva}
calcTotalPerItemsCart={calcTotalPerItemsCart}
/> */}