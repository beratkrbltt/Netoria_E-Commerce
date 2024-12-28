import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/appSlice';
import { toast } from 'react-toastify';
import productServis from '../services/ProductServis';
import { ProductType } from '../types/Types';
import '../css/ProductDetail.css';
import { FaCirclePlus, FaCircleMinus, FaBasketShopping } from "react-icons/fa6";
import Button from '@mui/material/Button';
import { addProductToBasket } from '../redux/basketSlice';

function ProductDetail() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState<ProductType | null>(null);
    const [count, setCount] = useState<number>(0);

    const getProductById = async (productId: number) => {
        try {
            dispatch(setLoading(true));
            const product: ProductType = await productServis.getProductById(productId);
            setProduct(product);
        } catch (error) {
            toast.error("An error occurred while displaying the product: " + error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const addBasket = () => {
        if (product && count > 0) {
            const payload: ProductType = {
                ...product,
                count: count
            };
            dispatch(addProductToBasket(payload));
            toast.success("The product has been added successfully:");
            setCount(0);
        } else {
            toast.warn("Please select a valid quantity!");
        }
    };

    useEffect(() => {
        if (productId) {
            getProductById(Number(productId));
        }
    }, [productId]);

    return (
        <Container maxWidth="lg">
            {product &&
                <div className='product-detail-container'>
                    <div>
                        <img className='productd-image' src={product.image} alt={product.title} />
                    </div>
                    <div className='details'>
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                        <div className='price-container'>
                            <i>{product.price} $</i>
                        </div>
                        <div className='process-and-cart'>
                            <div className='process'>
                                <FaCirclePlus onClick={() => setCount(count + 1)} />
                                <span>{count}</span>
                                <FaCircleMinus onClick={() => setCount(count > 0 ? count - 1 : 0)} />
                            </div>
                            <div className='add-to-cart'>
                                <Button
                                    onClick={addBasket}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<FaBasketShopping />}
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        padding: '8px 16px',
                                        backgroundColor: '#1976d2',
                                        '&:hover': {
                                            backgroundColor: '#1565c0'
                                        }
                                    }}
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Container>

    );
}

export default ProductDetail;
