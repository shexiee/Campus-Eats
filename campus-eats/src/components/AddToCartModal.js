import React, { useState } from "react";
import "./css/AddToCartModal.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const AddToCartModal = ({ showModal, onClose }) => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    return (
        <div className={`shop-modal-overlay ${showModal ? 'show' : ''}`} onClick={onClose}>
            <div className="shop-modal" onClick={e => e.stopPropagation()}>
                <button className="shop-close-button" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h1>Sisig ni Tatay</h1>
                <div className="info">
                    <div className="header">
                        <h3>Description:</h3>       
                        <h3>Qty: 5</h3>
                    </div>
                    <p>
                        Sisig is a savory Filipino dish made from chopped pig's head and liver,
                        seasoned with onions, chili peppers, and calamansi juice, served on a sizzling
                        hot plate, offering a unique blend of flavors and textures.
                    </p>
                </div>
                <div className="price">
                <h2>₱75</h2>
                </div>
                <div className="action-controls">
                    <div className="quantity-controls">
                        <button className="quantity-button" onClick={decreaseQuantity}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <span className="quantity-number">{quantity}</span>
                        <button className="quantity-button" onClick={increaseQuantity}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                    <button className="add-to-cart-button">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default AddToCartModal;
