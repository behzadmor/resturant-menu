import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Food } from '../../data/Food';
import FoodItem from '../FoodItem';

interface foodList {
  foods: Food[];
}

interface handleOrderList {
  sendFoodFinal: (orders: Food[]) => void;
}

const FoodList: React.FC<foodList & handleOrderList> = (props) => {
  const [foodOrders, setFoodOrders] = useState<Food[] | []>([]);

  useEffect(() => {
    if (foodOrders.length) {
      // console.log('foodList send:', foodOrders);
      props.sendFoodFinal(foodOrders);
    }
  }, [foodOrders]);

  const ordersHandle = (order: Food) => {
    // console.log('foodList recieved:', order);
    const repatedFoodIndex = foodOrders.findIndex(
      (foodOrder) => foodOrder.id === order.id
    );
    if (repatedFoodIndex >= 0) {
      foodOrders[repatedFoodIndex].count = order.count;
      setFoodOrders([...foodOrders]);
    } else {
      setFoodOrders([...foodOrders, order]);
    }
  };

  return (
    <>
      <Row className="border-bottom rounded-2">
        <h3 className="text-center mt-2">لیست غذاها</h3>
      </Row>
      <Row>
        {props.foods.map((food) => (
          <Col key={food.id} md={4} className="mt-2 mb-2">
            {<FoodItem food={food} sendFoodSale={ordersHandle} />}
          </Col>
        ))}
      </Row>
    </>
  );
};

export default FoodList;
