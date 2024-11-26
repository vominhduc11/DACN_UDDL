import { View, Text, TouchableWithoutFeedback, ScrollView, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import LoggedAndProduct from '../Component/Like_Page/LoggedAndProduct';
import NotLogged from '../Component/Like_Page/NotLogged';
import Logged from '../Component/Like_Page/Logged';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from '../../.env/Config';

function Like_page({ navigation }) {
    const [isLogin, setIsLogin] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // await AsyncStorage.removeItem('idUser');
            // Lấy bất đồng bộ id của người dùng lưu trong AsyncStorage
            const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));
            // Xét trường hợp
            if (idUser) {
                setIsLogin(true);

                const res = await axios.get(`${Config.API_URL}/api/getAllProductFavorite/${idUser}`);
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
        <>
            {isLogin && products.length > 0 && <LoggedAndProduct products={products} navigation={navigation} setProducts={setProducts} />}
            {isLogin || <NotLogged navigation={navigation} />}
            {isLogin && products.length == 0 && <Logged />}
        </>
    );
}

export default Like_page;
