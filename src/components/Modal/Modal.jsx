import { useContext, useRef } from "react";
import { CardModalContext } from "../../pages/Root";

const Modal = () => {

    const { modalcard, toggleModalcard } = useContext(CardModalContext);

    const overlayRef = useRef();

    const close = (e) => {
        if(e.target === overlayRef.current){
            toggleModalcard();
        }
    }

    return(
        <div onClick={(e) => close(e)} ref={overlayRef} className={`modal show overlay ${modalcard ? "active" : ""}`}>
            <Modal.Dialog>
                <Modal.Header>
                <Modal.Title>Корзина</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => toggleModal2()} variant="secondary">Закрыть</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    )
}

export default Modal;