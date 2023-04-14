import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ModalContext } from '../../pages/Root';
import { useContext, useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';


const OrderModal = () => {

    // Данные
    const [products, setProducts] = useState([]);

    const fetchServices = async () => {
        const response = await fetch('https://api.avavion.ru/api/products');
        const data = await response.json();

        setProducts(data.data);
    }

    useEffect(() => {
        fetchServices();
    }, []);

    // Модальное окно

    const { modal, toggleModal } = useContext(ModalContext);

    const overlayRef = useRef();

    const close = (e) => {
        if(e.target === overlayRef.current){
            toggleModal();
        }
    }

    // вмдьыдлмывьмдпытьдмпылк

    const [form, setForm] = useState({
        email: "",
        first_name: "",
        last_name: "",
        message: "",
        product_id: 1
    });

    const onChangeForm = (event) => {
        setForm((prevState) => {
            prevState = {...prevState};

            prevState[event.target.name] = event.target.value.trim();

            return prevState;
        });
    }

    const onSubmitHandle = (event) => {
        event.preventDefault();
    }

    const sendRequest = async (body) => {
        const response = await fetch("https://api.avavion.ru/api/applications/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (data.status){
            return Swal.fire({
                icon: "success",
                title: data.message,
            });
        }

        return Swal.fire({
            icon: "error",
            title: data.message
        });
    }

    const onClickHandle = (event) => {
        event.preventDefault();

        sendRequest(form);
    }

    const onChangeSelectForm = (event) => {
        setForm((prevState) => {
            prevState = {...prevState};

            prevState[event.target.name] = event.target.options[event.target.selectedIndex].value;

            return prevState;
        });
    }
    
    return (
        <div onClick={(e) => close(e)} ref={overlayRef} className={`modal show overlay ${modal ? "active" : ""}`}>
        <Modal.Dialog>
            <Modal.Header>
            <Modal.Title>Заявка</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={onSubmitHandle.bind(this)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={onChangeForm.bind(this)} value={form.email} type="email" name="email" placeholder="email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Фамилия</Form.Label>
                        <Form.Control onChange={onChangeForm.bind(this)} value={form.last_name} name="last_name" type="text" placeholder="Фамилия" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Имя</Form.Label>
                        <Form.Control onChange={onChangeForm.bind(this)} value={form.first_name} name="first_name" type="text" placeholder="Имя" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Сообщение</Form.Label>
                        <Form.Control onChange={onChangeForm.bind(this)} value={form.message} type="text" name="message" placeholder="Сообщение..." />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Выбор продукта</Form.Label>
                        
                        <Form.Select name="product_id" onChange={onChangeSelectForm.bind(this)} aria-label="Default select example">
                            <option>Выбор продукта</option>
                            {
                                products.map((item) => {
                                    return(
                                        <option value={item.id} key={item.id}>{item.name}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={onClickHandle.bind(this)}>
                        Отправить
                    </Button>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => toggleModal()} variant="secondary">Закрыть</Button>
            </Modal.Footer>
        </Modal.Dialog>
        </div>
    );
}

export default OrderModal;