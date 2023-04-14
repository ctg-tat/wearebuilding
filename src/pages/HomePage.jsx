import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ProductCard from '../components/ProductCard/ProductCard';
import Card from 'react-bootstrap/Card';
import { useContext, useEffect, useState } from 'react';
import { CardModalContext, ModalContext } from './Root';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';

const OrderLink = () => {
    const {toggleModal} = useContext(ModalContext);

    return(
        <Nav.Link onClick={toggleModal}>Заявка</Nav.Link>
    )
}

const CardLink = () => {
    const {toggleModalcard} = useContext(CardModalContext);

    console.log(12);

    return(
        <Nav.Link onClick={toggleModalcard}>Корзина</Nav.Link>
    )
}

function HomePage() {

    // получение id 
    const tag = useParams();

    // Функция подсчета скидки
    const discountCount = (a) => {
        return Math.round(a.price - ((a.price * a.discount)/100));
    }

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

    // Данные тегов

    const [tags, setTags] = useState([]);

    const fetchTags = async () => {
        const response = await fetch('https://api.avavion.ru/api/tags');
        const data = await response.json();

        setTags(data.data);
    }

    useEffect(() => {
        fetchTags();
    }, []);

    // Поиск

    const [query, setQuery] = useState("");
    const [query2, setQuery2] = useState("");

    let filteredProducts = products.filter((item) => item.name.toLocaleLowerCase().includes(query));

    const onChangeQuery = (event) => setQuery(event.target.value.toLocaleLowerCase());

    const onChangeQuery2 = (event) => {
        
        setQuery2(event.target.options[event.target.selectedIndex].value);
        const value = event.target.options[event.target.selectedIndex].value

        if(value == 1){
            filteredProducts = products.sort((a, b) => discountCount(a) > discountCount(b) ? -1 : 1)
        }else if(value == 2){
            filteredProducts = products.sort((a, b) => discountCount(a) < discountCount(b) ? -1 : 1)
        }
    }

    if(tag.name !== undefined){
        filteredProducts = products.filter((item) => item.tag === tag.name)
    }

    return (
        <div className="layout">
            <header className="header_container">
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="/">WeAreBuilding</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <OrderLink/>
                            <CardLink/>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>

            <main className="container">
                {/* Форма поиска */}

                <Form className='form_search'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control value={query} onChange={(e) => onChangeQuery(e)} type="email" placeholder="Поиск по названию..." />
                    </Form.Group>
                </Form>

                {/* Сортировка по ценам */}

                <Form.Select value={query2} onChange={(e) => onChangeQuery2(e)} aria-label="Default select example" className='select_price'>
                    <option>Сортировка по ценам</option>
                    <option value="1">От большого к меньшему</option>
                    <option value="2">От меньшего к большому</option>
                </Form.Select>
                
                {/* Сортировка */}
                <Card.Header>
                    <Nav variant="pills" defaultActiveKey="#first">
                        <Nav.Item>
                            <Nav.Link href='/'>Все</Nav.Link>
                        </Nav.Item>

                        {
                            tags.map((tag) => {
                                return(
                                    <Nav.Item>
                                        <Nav.Link href={`/tags/${tag.name}`}>{tag.name}</Nav.Link>
                                    </Nav.Item>
                                )
                            })
                        }
                    </Nav>
                </Card.Header>

                {/* Товары */}

                <div className="products">
                    {
                        filteredProducts.length ? (
                            filteredProducts.map((item) => {
                                return(
                                    <ProductCard key={item.id} item={item}/>
                                )
                            })
                        ): <h2 className="empty">По вашему запросу ничего не найдено!</h2>
                    }
                </div>
                
            </main>
        </div>
  );
}

export default HomePage;