import React, { useState, useEffect } from "react";

const ShopDetails = ({ shopID }) => {
    const [shopDetails, setShopDetails] = useState(null);

    useEffect(() => {
        const fetchShopDetails = async () => {
            try {
                const response = await fetch(`/api/shop/${shopID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch shop data');
                }
                const data = await response.json();
                setShopDetails(data);
            } catch (error) {
                console.error('Error fetching shop data:', error);
            }
        };

        fetchShopDetails();
    }, [shopID]);

    return (
        <>
            {shopDetails && (
                <>
                    <h3>{shopDetails.shopName}</h3>
                    <p>{shopDetails.shopAddress}</p>
                </>
            )}
        </>
    );
};

export default ShopDetails;
