import React from 'react';
import ProductCard from './PromotionCard/PromotionCard';

const ProductList: React.FC = () => {
    const products = [
        {
            image: 'https://png.pngtree.com/png-clipart/20230928/original/pngtree-sushi-on-a-plate-png-image_13163383.png',
            name: 'Пепперони',
            price: 'от 465 сом',
        },
        {
            image: 'https://pngimg.com/d/sushi_PNG98863.png',
            name: 'Мексиканская',
            price: 'от 465 сом',
        },
        {
            image: 'https://static.vecteezy.com/system/resources/thumbnails/028/615/354/small_2x/sake-nigiri-sushi-isolated-on-transparent-background-generative-ai-png.png',
            name: '2 пиццы',
            price: '1 195 сом',
            oldPrice: '1 370 сом',
        },
    ];

    return (
        <div>
           
            <div className="product-list">
                {products.map((product, index) => (
                    <ProductCard
                        key={index}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        oldPrice={product.oldPrice}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
