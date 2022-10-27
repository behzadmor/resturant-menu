import React, { useEffect, useState } from 'react';
import { Food } from '../data/Food';
import { Button, Card } from 'react-bootstrap';

const pic = require('../static/images/test-pic.jpg');

interface ordersHandle {
  sendFoodSale: (sales: Food) => void;
}

interface FoodProps {
  food: Food;
}

const FoodItem: React.FC<FoodProps & ordersHandle> = (props) => {
  const [orderCount, setOrderCount] = useState<number | null>(null);

  function sendToParent(foodObj: Food, counter: number) {
    // console.log('sendtoParent', { ...foodObj, count: counter });
    props.sendFoodSale({ ...foodObj, count: counter });
  }

  useEffect(() => {
    if (orderCount !== null) sendToParent(props.food, orderCount);
  }, [orderCount]);

  const handleOrder = (action: string) => {
    if (action === 'add') {
      setOrderCount(orderCount! + 1);
    }
    if (action === 'remove' && orderCount) {
      setOrderCount(orderCount - 1);
    }
  };

  return (
    <Card>
      <Card.Img variant="top" src={pic} />
      <Card.Body>
        <Card.Title>
          <p className="txt-primary text-center">{props.food.name}</p>
        </Card.Title>
        <Card.Text>
          <p className="txt-secondary text-secondary">
            {props.food.desc ? props.food.desc : `بدون توضیحات`}
          </p>
        </Card.Text>
        <p className="text-center">
          {props.food.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
          تومان
        </p>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex justify-content-between">
          <Button
            variant="outline-success"
            className="rounded-circle"
            onClick={() => handleOrder('add')}
          >
            +
          </Button>
          {orderCount ? (
            <>
              <span className="mt-2">{orderCount}</span>
              <Button
                variant="outline-secondary"
                className="rounded-circle"
                onClick={() => handleOrder('remove')}
              >
                -
              </Button>
            </>
          ) : (
            ''
          )}
        </div>
      </Card.Footer>
    </Card>
  );
};

export default FoodItem;
