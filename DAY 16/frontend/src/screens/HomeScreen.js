import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { listProducts, listProductCategories } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { keyword, pageNumber = 1, category } = useParams();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(listProductCategories());
    dispatch(listProducts(keyword, pageNumber, category));
  }, [dispatch, keyword, pageNumber, category]);

  return (
    <>
      <Meta />
      {!keyword && !category ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {category && <h2>Category: {category}</h2>}

      <Row>
        <Col md={3}>
          <h4>Categories</h4>
          {loadingCategories ? (
            <Loader />
          ) : errorCategories ? (
            <Message variant='danger'>{errorCategories}</Message>
          ) : (
            <ul className='list-group'>
              <Link to='/' className='list-group-item'>All Products</Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/category/${cat}`}
                  className={`list-group-item ${cat === category ? 'active' : ''}`}
                >
                  {cat}
                </Link>
              ))}
            </ul>
          )}
        </Col>
        <Col md={9}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
                category={category ? category : ''}
              />
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;