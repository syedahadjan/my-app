import React, { useState } from 'react';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import '../styles/shop.css';
import products from '../assets/data/products';
import ProductsList from '../components/UI/ProductsList';

const Shop = () => {
  const [productsData, setProductsData] = useState(products);
  const [filterValue, setFilterValue] = useState(''); // State for filter
  const [sortOrder, setSortOrder] = useState(''); // State for sorting
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const handleFilterChange = e => {
    const selectedCategory = e.target.value;
    setFilterValue(selectedCategory);
    applyFilters(selectedCategory, searchTerm, sortOrder);
  };

  const handleSearchChange = e => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters(filterValue, term, sortOrder);
  };

  const handleSortChange = e => {
    const order = e.target.value;
    setSortOrder(order);
    applyFilters(filterValue, searchTerm, order);
  };

  const applyFilters = (category, search, order) => {
    let filteredProducts = products;

    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(item => item.category === category);
    }

    // Search by product name
    if (search) {
      filteredProducts = filteredProducts.filter(item => 
        item.productName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort products
    if (order) {
      filteredProducts.sort((a, b) => {
        if (order === 'ascending') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }

    setProductsData(filteredProducts);
  };

  return (
    <Helmet title='Shop'>
      <CommonSection title='Products' />

      <section>
        <Container>
          <Row>
            <Col lg='3' md='6'>
              <div className="filter_widget">
                <select onChange={handleFilterChange} value={filterValue}>
                  <option value=''>Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg='3' md='6' className='text-end'>
              <div className="filter_widget">
                <select onChange={handleSortChange} value={sortOrder}>
                  <option value=''>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg='6' md='12'>
              <div className="search_box">
                <input 
                  type="text" 
                  placeholder='Search......' 
                  onChange={handleSearchChange}
                  value={searchTerm}
                />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className='pt-0'>
        <Container>
          <Row>
            {
              productsData.length === 0
                ? <h1 className='text-center fs-4'>No products are found!</h1>
                : <ProductsList data={productsData} />
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
