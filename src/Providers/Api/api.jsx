import { getFirestore, collection, getDocs, onSnapshot } from "firebase/firestore";

export const getOrders = async () => {
    const db = getFirestore()
    const ordersRef = collection(db, 'taskOrder')
    const snapshot = await getDocs(ordersRef)

    const queryShow = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))

    return queryShow
}

//hace casi lo mismo q en el de arriba pero este se reactualiza si hay cambios
export const onOrdersUpdate = (callback) => {
    const db = getFirestore()
    const ordersRef = collection(db, 'taskOrder')

    onSnapshot(ordersRef, snapshot => {
        const upDatedOrders = snapshot.docs.map(doc => ({
            id: doc.id,
           ...doc.data()
        }))

        callback(upDatedOrders)
    })
}

