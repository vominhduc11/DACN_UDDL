import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import FastImage from 'react-native-fast-image';
import NotLogin from '../Component/Order_Page/NotLogin';
import Logined from '../Component/Order_Page/Logined';
import LoginedAndProduct from '../Component/Order_Page/LoginedAndProduct';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from '../../.env/Config';
import axios from 'axios';

function Order_page({ navigation, route }) {
    const [products, setProducts] = useState([]);
    const [isLogin, setIsLogin] = useState(false);

    const { setActive } = route.params;
    // Gọi api lần đầu để xác nhận giao diện
    useEffect(() => {
        async function fetchData() {
            // await AsyncStorage.removeItem('idUser');
            // Lấy bất đồng bộ id của người dùng lưu trong AsyncStorage
            const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));
            // Xét trường hợp
            if (idUser) {
                setIsLogin(true);

                // Lấy bất đồng bộ các sản phẩm của của giỏ hàng lưu trong AsyncStorage
                const res = await axios.get(`${Config.API_URL}/api/getAllOrder/${idUser}`);
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
    return (
        <Fragment>
            {isLogin || <NotLogin navigation={navigation} />}
            {isLogin && products.length === 0 && <Logined navigation={navigation} setActive={setActive} />}
            {isLogin && products.length !== 0 && <LoginedAndProduct navigation={navigation} products={products} />}
        </Fragment>
    );
}

export default Order_page;
