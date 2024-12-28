export interface UserType {
    id: string,
    username: string,
    password: string,
    balance: number
}

export interface ProductType {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    count?: number, //? zorunlu değil 
    rating: RatingType
}


interface RatingType {
    rate: number,
    count: number
}