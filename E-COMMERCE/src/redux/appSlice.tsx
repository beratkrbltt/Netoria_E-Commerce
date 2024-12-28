import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType, ProductType } from '../types/Types';

export interface AppSliceType {
    currentUser: UserType | null,
    loading: boolean,
    drawer: boolean,
    products: ProductType[],

}

const initialState: AppSliceType = {
    currentUser: null,
    loading: false,
    drawer: false,
    products: []

}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoading: (state: AppSliceType, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setDrawer: (state: AppSliceType, action: PayloadAction<boolean>) => {
            state.drawer = action.payload;
        },
        setCurrentUser: (state: AppSliceType, action: PayloadAction<UserType | null>) => {
            state.currentUser = action.payload;
        },
        updateBalance: (state: AppSliceType, action: PayloadAction<UserType>) => {
            const user: UserType = {
                ...action.payload
            }

            state.currentUser = user;
            localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
        },
        setProducts: (state: AppSliceType, action: PayloadAction<ProductType[]>) => {
            state.products = action.payload;
        },
        filterProducts: (state: AppSliceType, action: PayloadAction<string>) => {
            const tempList: ProductType[] = [];
            state.products.map((product: ProductType) => {
                if (product.title.toLocaleLowerCase().includes(action.payload.toLocaleLowerCase())) { //includes içeriyormu / lowercase zaten Kharf
                    tempList.push(product);
                }
            })

            state.products = [...tempList];
        }
    }
});

export const { setLoading, setCurrentUser, setProducts, filterProducts, setDrawer, updateBalance } = appSlice.actions;

export default appSlice.reducer;
