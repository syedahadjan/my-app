import React from 'react';
import '../styles/cart.css';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import { cartActions } from '../redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const dispatch = useDispatch();

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {
                cartItems.length === 0 ? (
                  <h2 className="fs-4 text-center">No item added to the cart</h2>
                ) : (
                  <table className="table bordered">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        cartItems.map((item, index) => (
                          <Tr item={item} key={index} />
                        ))
                      }
                    </tbody>
                  </table>
                )
              }
            </Col>
            <Col lg="3">
              <div>
                <h6 className='d-flex align-items-center justify-content-between'>
                  Subtotal
                  <span className='fs-4 fw-bold'>${totalAmount}</span>
                </h6>
              </div>
              <p className='fs-6 mt-2'>Taxes and shipping will calculate at checkout</p>
              <div>
                <button className='buy_btn w-100 '>
                  <Link to='/checkout'>Checkout</Link>
                </button>
                <button className='buy_btn w-100 mt-3'>
                  <Link to='/shop'>Continue Shopping</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(cartActions.deleteItem(item.id));
    }
  };

  const increaseQuantity = () => {
    dispatch(cartActions.addItem({...item, quantity: 1}));
  };

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      dispatch(cartActions.removeItem(item.id)); // Assuming you have this action to reduce quantity
    }
  };

  return (
    <tr>
      <td><img src={item.imgUrl} alt={item.productName} /></td>
      <td>{item.productName}</td>
      <td>${item.price}</td>
      <td>
        <div className="quantity-controls">
          <button onClick={decreaseQuantity} disabled={item.quantity <= 1}>-</button>
          <span>{item.quantity}</span>
          <button onClick={increaseQuantity}>+</button>
        </div>
      </td>
      <td>
        <motion.i 
          whileTap={{ scale: 1.2 }}
          onClick={deleteProduct}
          className="ri-delete-bin-line"
        />
      </td>
    </tr>
  );
};

export default Cart;
