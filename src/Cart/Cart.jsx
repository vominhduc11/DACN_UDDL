import React, { useEffect, useState } from 'react';

import ScreenLogined from './Component/ScreenLogined';
import ScreenLoginedAndProduct from './Component/ScreenLoginedAndProduct';
import ScreenNotLogin from './Component/ScreenNotLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = ({ navigation }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // Lấy bất đồng bộ id của người dùng lưu trong AsyncStorage
            const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));
            // Xét trường hợp
            if (idUser) {
                setIsLogin(true);

                // Lấy bất đồng bộ các sản phẩm của của giỏ hàng lưu trong AsyncStorage
                const products_cart = JSON.parse(await AsyncStorage.getItem('cart'));
                // Xét trường hợp
                if (products_cart.length === 0) {
                    setProducts([]);
                } else {
                    setProducts(products_cart);
                }
            } else {
                setIsLogin(false);
            }
        }
        fetchData();
    }, []);
    return (
        <>
            {isLogin || <ScreenNotLogin navigation={navigation} />}
            {isLogin && products.length === 0 && <ScreenLogined navigation={navigation} />}
            {isLogin && products.length !== 0 && <ScreenLoginedAndProduct navigation={navigation} />}
        </>
    );
};

export default Cart;
