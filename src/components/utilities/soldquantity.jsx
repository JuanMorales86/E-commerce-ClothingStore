import { doc, getFirestore, getDoc, setDoc, updateDoc } from 'firebase/firestore'

const handleSoldQuantity = async (productId, quantity) => {
    const db = getFirestore()
    const productRef = doc(db, 'productos',  productId)

    try {
        //Veirifcar Documento
        const docSnapshot = await getDoc(productRef)

        if(docSnapshot.exists()) {
            //Si el documento existe, verifica si el campo 'soldquantity' existe
            const data = docSnapshot.data()

            if('soldquantity' in data) {
                //Si el campo 'soldquantity' existe, actualiza su valor
                await updateDoc(productRef, {soldquantity: data.soldquantity + quantity})
            } else {
                //Si el campo 'soldquatoty' no existe, crealo y establece su valor
                await setDoc(productRef, {soldquantity: quantity}, {merge:true})
            }
            console.log('Campo soldquantity actualizado/creado correctamente')
        } else {
            console.log('El producto no existe en la base de datos')
        }
        } catch (error) {
            //Manejar errores
            console.error('Error al actualizar/crear el campo soldquantity:', error)
        }
    }


export default handleSoldQuantity