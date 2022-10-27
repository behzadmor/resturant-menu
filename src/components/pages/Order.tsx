import React from 'react';
import { Food } from '../../data/Food';
import { Table } from 'react-bootstrap';

interface orderFoods {
  foods: Food[];
}

function booking(orderedFoods: Food[]) {
  const result = orderedFoods
    .filter((food) => food.count! > 0)
    .map((food) => {
      const amount = food.count! * food.price;
      return { ...food, amount };
    });
  return result;
}

function getTotal(orders: Food[]) {
  const result = orders.reduce((pre, cur) => pre + cur.amount!, 0);
  return result;
}

const Order: React.FC<orderFoods> = (props) => {
  const bookingList = booking(props.foods);
  const total = getTotal(bookingList);

  return (
    <Table striped hover className="mt-5 sticky-top table-responsive">
      <thead>
        <tr>
          <td colSpan={4} className="text-center txt-primary">
            فاکتور خرید
          </td>
        </tr>
      </thead>
      {bookingList.length ? (
        <>
          <thead>
            <tr>
              <th>کالا</th>
              <th className="text-center">تعداد</th>
              <th className="text-center">فی</th>
              <th className="text-center">مبلغ</th>
            </tr>
          </thead>
          <tbody>
            {bookingList.map((bookingItem) => (
              <tr key={bookingItem.id}>
                <td>{bookingItem.name}</td>
                <td className="text-center">{bookingItem.count}</td>
                <td className="text-center">
                  {bookingItem.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </td>
                <td className="text-center">
                  {bookingItem
                    .amount!.toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan={3} className="text-center">
                مبلغ قابل پرداخت:
              </th>
              <th className="text-center">
                {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </th>
            </tr>
          </tfoot>
        </>
      ) : (
        ''
      )}
    </Table>
  );
};

export default Order;
