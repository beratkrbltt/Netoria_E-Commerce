import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading, setProducts } from '../redux/appSlice';
import { toast } from 'react-toastify';
import categoryService from '../services/CategoryService';
import ProductServis from '../services/ProductServis';
import { ProductType } from '../types/Types';

function Category() {
    const dispatch = useDispatch();
    const [categories, setCategories] = useState<string[]>();

    const getAllCategories = async () => {
        try {
            dispatch(setLoading(true));
            const categories: string[] = await categoryService.getAllCategories();
            setCategories(categories);
        } catch (error) {
            toast.error("An error occurred while retrieving the category list" + error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleCategory = async (categoryName: string) => {
        try {
            dispatch(setLoading(true));
            const products: ProductType[] = await categoryService.getProductsByCategoryName(categoryName);
            dispatch(setProducts(products));
        } catch (error) {
            toast.error(" An error occurred while retrieving products for the category " + error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleAllProducts = async () => {
        try {
            dispatch(setLoading(true));
            const products: ProductType[] = await ProductServis.getAllProducts();
            dispatch(setProducts(products));
        } catch (error) {
            toast.error("An error occurred while retrieving all products" + error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div style={{
            marginTop: '60px',
            padding: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            {/* "All" butonu */}
            <button
                onClick={handleAllProducts}
                style={{
                    backgroundColor: '#5B4342',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginBottom: '15px',
                    width: '200px',
                    textAlign: 'center',
                    transition: '0.3s ease',
                }}
            >
                All Products
            </button>

            {/* Kategoriler */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '15px',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
            }}>
                {categories && categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => handleCategory(category)}
                        style={{
                            backgroundColor: '#f1f1f1',
                            color: '#5B4342',
                            border: '1px solid #5B4342',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            width: '200px',
                            textAlign: 'center',
                            transition: '0.3s ease',
                            marginBottom: '10px',
                            fontWeight: 'bold',
                        }}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Category;
