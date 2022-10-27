import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import './index.css';
import { Col, Container, Row } from 'react-bootstrap';
import FoodList from './components/pages/FoodList';
import allFoodsList from './config/JSONs';
import { FoodsState } from './data/Types';
import Order from './components/pages/Order';
import { Food } from './data/Food';

const App: React.FC = () => {
  const [finalOrders, setFinalOrders] = useState<FoodsState>([]);

  const handleFoodSale = (ordersList: Food[]) => {
    // console.log(foods)
    setFinalOrders(ordersList);
  };
  return (
    <Container>
      <Row>
        <Col md={8}>
          <FoodList foods={allFoodsList} sendFoodFinal={handleFoodSale} />
        </Col>
        <Col md={4} className="bg-light">
          {' '}
          <Order foods={finalOrders} />{' '}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
