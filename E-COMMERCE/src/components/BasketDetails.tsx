import React from 'react'
import { useEffect, useState } from 'react'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setDrawer, updateBalance } from '../redux/appSlice';
import { ProductType, UserType } from '../types/Types';
import '../css/Basket.css'
import { Button } from '@mui/material';
import { calculateBasket, removeProductFromBasket, setBasket } from '../redux/basketSlice';
import { toast } from 'react-toastify';


function BasketDetails() {

    const dispatch = useDispatch();

    const { drawer, currentUser } = useSelector((state: RootState) => state.app);
    const { basket, totalAmount } = useSelector((state: RootState) => state.basket);


    useEffect(() => {
        dispatch(calculateBasket());
    }, [basket])

    const closeDrawner = () => {
        dispatch(setDrawer(false));
    }

    const removeProduct = (productId: number) => {
        dispatch(removeProductFromBasket(productId))
    }

    const buy = () => {
        if (currentUser?.balance && currentUser.balance < totalAmount) {
            toast.warn("Your balance is insufficient")
            return;
        }
        if (currentUser?.balance) {
            const remaningTotal = currentUser.balance - totalAmount;

            const payload: UserType = {
                ...currentUser,
                balance: remaningTotal
            }
            dispatch(updateBalance(payload));
            dispatch(setBasket([]));
            localStorage.removeItem("basket");
            toast.success("Products have been purchased");
        }
    }

    return (
        <Drawer open={drawer} anchor='right' sx={{
            width: '400px',
            '& .MuiDrawer-paper': {
                backgroundColor: '#D1D9D7',
            },
        }} onClose={closeDrawner}>
            <div className='basket-wrapper'>
                {
                    basket && basket.map((product: ProductType) => (
                        <div className='basket-container' key={product.id}>
                            <img src={product.image} alt={product.title} />
                            <div className='basket-details'>
                                <div className='basket-title'>{product.title.substring(0, 30)}</div>
                                <div className='basket-description'>{product.description.substring(0, 40)}</div>
                            </div>
                            <div className='basket-quantity'>{product.count} Quantity</div>
                            <div className='basket-price'>${product.price}</div>
                            <div className='basket-actions'>
                                <Button onClick={() => removeProduct(product.id)} className='basket-delete-btn'>Remove</Button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className='basket-total'>
                <div className='total-label'>Total Price:</div>
                <div className='total-amount'>${totalAmount}</div>
                <div> <Button onClick={buy} sx={{ textTransform: 'none', height: '25', marginTop: '20px', backgroundColor: '#5B4342' }} size='small' variant='contained'>  Buy Now</Button> </div>
            </div>
        </Drawer>


    )
}

export default BasketDetails