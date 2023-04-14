import { Link, useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from "react";

const SinglePage = () => {

    const paramId = useParams();
    const [service, setService] = useState([]);

    useEffect(() => {
        fetch(`https://api.avavion.ru/api/products/${paramId.id}`)
            .then((r) => r.json())
            .then((data) => setService(data.data))
    }, []);

    // Функция подсчета скидки

    const discountCount = (price, discount) => {
        return Math.round(price - ((price * discount)/100));
    }

    return(
        <div className="container">
            <Card.Img variant="top" src={service.image_url} />
            <Card.Body className="card_body">
                <Card.Title>{ service.name }</Card.Title>
                <Card.Text>
                    { service.text }
                </Card.Text>
                <Card.Text className='cart_text_price'>
                    { discountCount(service.price, service.discount) }₽
                </Card.Text>
                <Link to={'/'}>
                    Назад
                </Link>
            </Card.Body>
        </div>
    )

}

export default SinglePage;