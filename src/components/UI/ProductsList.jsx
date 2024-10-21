import React from 'react';
import ProductCard from './ProductCard'; // Make sure this path is correct
import '../../styles/product-card.css'; // Ensure this CSS file exists

export const ProductsList = ({ data }) => {
  return (
    <>
      {data?.map((item, index) => (
        <ProductCard item={item} key={index} /> // Added key for each item
      ))}
    </>
  );
};

export default ProductsList;
