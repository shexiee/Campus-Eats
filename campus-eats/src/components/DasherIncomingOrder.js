import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/AdminOrders.css";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import DeclineOrderModal from './AdminDeclineOrderModal';

const DasherIncomingOrder = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState({});
  const [messages, setMessages] = useState({});
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
    const [activeDashers, setActiveDashers] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/incoming-orders/dasher');
        const ordersWithShopData = await Promise.all(response.data.map(async order => {
          const shopDataResponse = await axios.get(`/api/shop/${order.shopID}`);
          const shopData = shopDataResponse.data;
          return { ...order, shopData };
        }));
        setOrders(ordersWithShopData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    
        fetchOrders();
  }, []);

  const toggleAccordion = (orderId) => {
    setIsAccordionOpen((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId]
    }));
  };


  const handleSubmit = async (orderId) => {
    try {
      // Make a POST request to check and update the order
      const response = await axios.post('/api/assign-dasher', { orderId, dasherId: currentUser.uid });
      console.log(response.data.success);
      if (response.data.success) {
        alert('Dasher assigned successfully');
        // Optionally update local state if needed
        await axios.post('/api/update-order-status', { orderId, status: 'active_heading' });
        setOrders(prevOrders => {
          return prevOrders.map(order => {
            if (order.id === orderId) {
              return { ...order, dasherId: currentUser.uid, status: 'active_heading' };
            } else {
              return order;
            }
          });
        });
        window.location.reload();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'This order is already assigned to another dasher.') {
        alert('This order is already assigned to another dasher. Please Reload the page and try again.');
      } else if (error.response && error.response.status === 400 && error.response.data.message === 'There is already an ongoing order for this dasher.') {
        alert('There is already an ongoing order for this dasher. Please complete the current order first.');
      } else {
        console.error('Error assigning dasher:', error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="ao-body">
        <div className="ao-title">
          <h2>Incoming Orders</h2>
        </div>
        {orders.length === 0 && <div className="ao-no-orders">No incoming orders...</div>}
        {orders.map((order) => (
          <div key={order.id} className="ao-content-current">
            <div className="ao-card-current ao-card-large">
              <div className="ao-card-content" onClick={() => toggleAccordion(order.id)}>
                <div className="ao-order-img-holder">
                  <img src='/Assets/Panda.png' alt="food" className="ao-order-img" />
                </div>
                <div className="ao-card-text">
                  <h3>{`${order.firstName} ${order.lastName}`}</h3>
                  <p>{`Order #${order.id}`}</p>
                </div>
                <div className="ao-buttons">
                  
                  <button className="i-save-button" onClick={() => handleSubmit(order.id)}>Accept Order</button>
                </div>
                <div className="ao-toggle-content">
                  <FontAwesomeIcon icon={faAngleDown} rotation={isAccordionOpen[order.id] ? 180 : 0} />
                </div>
              </div>
              {isAccordionOpen[order.id] && (
                <div className="ao-accordion">
                <div className="o-order-summary">
                <h3>Order Summary</h3>
                {order.items.map((item, index) => (
                    <div className="o-order-summary-item" key={index}>
                        <div className="o-order-summary-item-header">
                            <p>{item.quantity}x</p>
                            <p>{item.name}</p>
                        </div>
                        <p>₱{item.price}</p>
                    </div>
                ))}
                <div className="o-order-summary-total-container">
                    <div className="o-order-summary-subtotal">
                        <h4>Subtotal</h4>
                        <h4>₱{order.totalPrice.toFixed(2)}</h4>
                    </div>
                    <div className="o-order-summary-subtotal">
                        <h4>Delivery Fee</h4>
                        <h4>₱{order.shopData ? order.shopData.deliveryFee.toFixed(2) : ''}</h4>
                    </div>
                    <div className="o-order-summary-total">
                        <h4>Total</h4>
                        <h4>
                        ₱{order.totalPrice && order.shopData ? (order.totalPrice + order.shopData.deliveryFee).toFixed(2) : ''}
                        </h4>
                    </div>
                </div>
            </div>
            </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DasherIncomingOrder;
