import { View, Text, FlatList, TouchableWithoutFeedback } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalDestination from './Modal/Modal';
import Header from './Component/Header';

import ListSearch from './Component/ListSearch';

const Search = ({ navigation, route }) => {
    //Nhận prop
    const { category, nameCity } = route.params;
    // Thẻ ref dùng để gọi hàm useImperativeHandle trong component ModalDestination
    const modalDestinationRef = useRef();
    // Thẻ ref dùng để gọi hàm useImperativeHandle trong component Header
    const headerRef = useRef();
    //  Thẻ ref dùng để gọi hàm useImperativeHandle trong component ListSearch
    const ListSearchRef = useRef();

    // Component con Header gọi hàm này để chạy hàm ở component con ModalDestination
    const openModal = () => {
        modalDestinationRef.current.openModal();
    };
    // Component con Modal gọi hàm này để chạy hàm ở component con ListSearch
    const setListProduct = (param) => {
        ListSearchRef.current.setListProduct(param);
    };

    //Thực hiện khi nhấn vào sản phẩm
    const handlePressProduct = async (...param) => {
        const [id, image, name, star, category, cityId, city, packages] = param;
        //Chuyển sang trang sản phẩm
        navigation.navigate('Product', {
            id: id,
            category: category,
            cityId: cityId,
            cityName: city,
        });

        // Lưu sản phẩm vào AsyncStorage
        const arr = (await AsyncStorage.getItem('product')) ? JSON.parse(await AsyncStorage.getItem('product')) : [];

        if (!arr.some((item) => item.id === id)) {
            if (arr.length === 10) {
                arr.pop();
            }
            arr.unshift({ id: id, image: image, name: name, star: star, category: category, cityId: cityId, city: city, package: packages });
            await AsyncStorage.setItem('product', JSON.stringify(arr));
        } else {
            // Tách phần tử có id bằng 2 và các phần tử còn lại
            const elementToMove = arr.filter((item) => item.id === id);
            const remainingElements = arr.filter((item) => item.id !== id);

            // Nối phần tử đã lọc lên đầu mảng
            const newArray = elementToMove.concat(remainingElements);
            await AsyncStorage.setItem('product', JSON.stringify(newArray));
        }
    };

    // Sử lý giá trị input trong component Header
    const setValueInput = (cityName) => {
        headerRef.current.setValueInput(cityName);
    };

    useEffect(() => {
        if (!nameCity) {
            return;
        }
        setValueInput(nameCity);
    }, []);

    return (
        <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <Header navigation={navigation} openModal={openModal} ref={headerRef} />

            <ListSearch category={category} nameCity={nameCity} ref={ListSearchRef} handlePressProduct={handlePressProduct} />

            <ModalDestination
                ref={modalDestinationRef}
                setValueInput={setValueInput}
                setListProduct={setListProduct}
                handlePressProduct={handlePressProduct}
                navigation={navigation}
            />
        </View>
    );
};

export default Search;
