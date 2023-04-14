import { createContext, useState } from "react"
import OrderModal from "../components/OrderModal/OrderModal";
import { Outlet } from "react-router-dom";
import BasketModal from "../components/BasketModal/BasketModal";

export const ModalContext = createContext(null);
export const CardModalContext = createContext(null);

const Root = () => {

    // order
    const [modal, setModal] = useState(false);
    const toggleModal = setModal.bind(this, !modal);

    // basket
    const [modalcard, setModalcard] = useState(false);
    const toggleModalcard = setModalcard.bind(this, !modalcard);

    return(
        <CardModalContext.Provider value={{ modalcard, toggleModalcard }}>
            <ModalContext.Provider value={{ modal, toggleModal }}>
                <Outlet/>
                <OrderModal />
                {/* <BasketModal /> */}
            </ModalContext.Provider>
        </CardModalContext.Provider>
    )
}

export default Root;