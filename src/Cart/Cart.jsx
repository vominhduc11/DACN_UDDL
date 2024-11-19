import React, { useEffect, useState } from 'react';

import ScreenLogined from './Component/ScreenLogined';
import ScreenLoginedAndProduct from './Component/ScreenLoginedAndProduct';
import ScreenNotLogin from './Component/ScreenNotLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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
                const res = await axios.get('http://localhost:8080/api/getAllProductCart');
                // Xét trường hợp
                if (res.data.length === 0) {
                    setProducts([]);
                } else {
                    setProducts(res.data);
                }
            } else {
                setIsLogin(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function removeItem() {
            await AsyncStorage.removeItem('unviewedCartCount');
        }
        removeItem();
    }, []);
    return (
        <>
            {isLogin || <ScreenNotLogin navigation={navigation} />}
            {isLogin && products.length === 0 && <ScreenLogined navigation={navigation} />}
            {isLogin && products.length !== 0 && <ScreenLoginedAndProduct navigation={navigation} products={products} />}
        </>
    );
};

export default Cart;
