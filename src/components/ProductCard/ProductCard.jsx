import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

// Функция подсчета скидки

const discountCount = (price, discount) => {
    return Math.round(price - ((price * discount)/100));
}

function ProductCard({ item }) {
  return (
    <Card style={{ width: '18rem' }}>
        <Card.Img className='card_img' variant="top" src={item.image_url} />
        <Card.Body>
            <Card.Title className='cart_title'>{ item.name }</Card.Title>
            <Card.Text className='cart_text'>
                { item.text }
            </Card.Text>

            <Card.Text className='cart_text_price'>
                { discountCount(item.price, item.discount) } ₽
            </Card.Text>

            <Button href={`/product/${item.id}`} variant="primary">
                 Подробнее
            </Button>
            
        </Card.Body>
    </Card>
);
}

export default ProductCard;