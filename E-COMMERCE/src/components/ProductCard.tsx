import React from 'react';
import { ProductType } from '../types/Types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

interface ProductCardCardProps {
    product: ProductType;
}

function ProductCard(props: ProductCardCardProps) {
    const { id, title, price, description, category, image, rating } = props.product;
    const navigate = useNavigate();

    return (
        <Card sx={{
            margin: '60px 20px 20px 20px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            overflow: 'hidden',
            width: '280px',
            maxWidth: '100%',
            height: '550px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: '#fff',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
            }
        }}>
            <img
                src={image}
                style={{
                    width: '90%',
                    height: '220px',
                    objectFit: 'contain',
                    marginTop: '15px',
                    borderRadius: '8px',
                    transition: 'transform 0.3s ease-in-out'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
            />
            <CardContent sx={{
                padding: '15px',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Typography gutterBottom variant="subtitle1" component="div" sx={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#2d3436',
                }}>
                    {title.substring(0, 42)}
                </Typography>
                <Typography variant="inherit" sx={{
                    fontSize: '0.95rem',
                    color: '#7f8c8d',
                    marginBottom: '12px',
                    lineHeight: '1.4',
                    textAlign: 'justify'
                }}>
                    {description.substring(0, 100)}...
                </Typography>
            </CardContent>
            <div>
                <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#6c7d6b',
                    margin: '10px 0'
                }}>
                    {price} $
                </h3>
            </div>
            <CardActions sx={{ width: '100%', padding: '0 16px 16px 16px' }}>
                <Button
                    onClick={() => navigate('/product-detail/' + id)}
                    size="small"
                    sx={{
                        background: '#C19A92',
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '0px',
                        padding: '8px 16px',
                        width: '100%',
                        '&:hover': {
                            backgroundColor: '#a28e82',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        }
                    }}
                >
                    View Details
                </Button>
            </CardActions>
        </Card>

    );
}

export default ProductCard;
