import { collection, getFirestore } from 'firebase/firestore'
import React from 'react'

function MoreProductSelled() {
    React.useEffect(() => {
    const db = getFirestore()
    const productSelled = collection(db, "producto")


    }, [])


  return (
    <div>moreproductselled</div>
  )
}

export default MoreProductSelled