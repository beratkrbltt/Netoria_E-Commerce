import React from 'react'
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../images/logo.png'
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import { filterProducts, setCurrentUser, setDrawer, setLoading, setProducts } from '../redux/appSlice';
import { toast } from 'react-toastify';
import productServis from '../services/ProductServis';
import { ProductType } from '../types/Types';
import { CiShoppingBasket } from "react-icons/ci";
import Badge from '@mui/material/Badge';
import { RootState } from '../redux/store';
import { setBasket } from '../redux/basketSlice';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { basket } = useSelector((state: RootState) => state.basket);

    const logout = () => {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("basket");
        dispatch(setCurrentUser(null));
        dispatch(setBasket([]));
        navigate("/");
        toast.success("Logged Out");
    };

    const handleFilter = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        try {
            if (e.target.value) {
                dispatch(filterProducts(e.target.value));
            } else {
                const products: ProductType[] = await productServis.getAllProducts();
                dispatch(setProducts(products));
            }
        } catch (error) {
            toast.error("An error occurred while filtering" + error);
        }
    }

    const openDrawer = () => {
        dispatch(setDrawer(true));
    }

    return (
        <AppBar position="static" sx={{ backgroundColor: '#5B4342' }}>
            <Toolbar>
                <IconButton
                    onClick={() => navigate("/home")}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <img src={Logo} width={60} height={60} style={{ marginLeft: '30px' }} />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate("/home")} >
                    𝓝𝓔𝓣𝓞𝓡𝓘𝓐
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <TextField
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleFilter(e)}
                        variant="standard"
                        autoComplete="off"
                        sx={{
                            width: '200px', marginBottom: '10px', marginRight: '10px',
                            '& .MuiInput-underline:after': {
                                borderBottomColor: '#C19A92', // Odaklanınca alt çizgi rengi
                            }
                        }}
                        id="searchInput"
                        placeholder='Search for something'
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                    </InputAdornment>
                                ),
                                style: {
                                    color: 'lightgray',
                                    borderBottom: '1px solid lightgray'
                                }
                            },
                        }}
                    />
                    <Badge badgeContent={basket.length} color="warning" style={{ margin: '0px 10px' }}>
                        <CiShoppingBasket onClick={openDrawer} style={{ fontSize: '25', cursor: 'pointer' }} />
                    </Badge>
                    <Button onClick={logout} sx={{ textTransform: 'none', color: 'fff' }} color="inherit">
                        𝓛𝓸𝓰𝓸𝓾𝓽</Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar