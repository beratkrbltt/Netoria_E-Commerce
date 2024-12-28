import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductType, UserType } from '../types/Types';
import { setCurrentUser, setLoading, setProducts } from '../redux/appSlice';
import productServis from '../services/ProductServis';
import { toast } from 'react-toastify';
import { RootState } from '../redux/store';
import ProductCard from '../components/ProductCard';
import '../css/HomePage.css'
import Category from '../components/Category';
import Container from '@mui/material/Container';
function HomePage() {

    const dispatch = useDispatch();
    const { products } = useSelector((state: RootState) => state.app);

    const getAllProducts = async () => {
        try {
            dispatch(setLoading(true));
            const response: ProductType[] = await productServis.getAllProducts();
            if (response) {
                dispatch(setProducts(response));
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error("Products could not be retrieved: " + error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])


    useEffect(() => {
        const result = localStorage.getItem("currentUser")
        if (result) {
            const currentUser: UserType = JSON.parse(result) as UserType;
            dispatch(setCurrentUser(currentUser));
        }
    }, [])
    return (
        <div className='homepageContainer'>
            <div className='category-container'>
                <Category />
            </div>
            <Container maxWidth="xl">
                <div className='homepage-product-container'>
                    {
                        products && products.map((product: ProductType, index: number) => (
                            <ProductCard key={index} product={product} />
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default HomePage