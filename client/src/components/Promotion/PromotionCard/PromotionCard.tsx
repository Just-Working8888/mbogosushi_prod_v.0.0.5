import React from 'react';

type ProductCardProps = {
    image: string;
    name: string;
    price: string;
    oldPrice?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ image, name, price, oldPrice }) => {
    return (
        <div className="product-card">
            <img src={image} alt={name} className="product-image" />

            <div className="product-price">
                <div className="product-name">{name}</div>
                {price}
                {oldPrice && <div className="old-price">{oldPrice}</div>}
            </div>
        </div>
    );
};

export default ProductCard;
