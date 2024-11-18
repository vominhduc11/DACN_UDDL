import { View, Text, ScrollView, TouchableWithoutFeedback, FlatList } from 'react-native';
import React, { memo, useEffect, useState } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import { API_URL } from '@env';

const GoSomewhere = ({ navigation }) => {
    const [listCity, setListCity] = useState([]);

    //Thực hiện khi nhấn vào thành phố
    async function handlePressCity(id, image, name) {
        const listCity = JSON.parse(await AsyncStorage.getItem('city'));
        if (!listCity.some((item) => item.id === id)) {
            listCity.unshift({ id: id, image: image, name: name });
            await AsyncStorage.setItem('city', JSON.stringify(listCity));
        } else {
            // Tách phần tử có id bằng 2 và các phần tử còn lại
            const elementToMove = listCity.filter((item) => item.id === id);
            const remainingElements = listCity.filter((item) => item.id !== id);
            // Nối phần tử đã lọc lên đầu mảng
            const newArray = elementToMove.concat(remainingElements);
            await AsyncStorage.setItem('city', JSON.stringify(newArray));
        }
        setListCity(JSON.parse(await AsyncStorage.getItem('city')));
        //Chuyển sang trang city
        navigation.navigate('City', {
            id: id,
        });
    }

    // Các element sản phẩm FlaList
    const renderItem = ({ item, index }) => (
        <TouchableWithoutFeedback onPress={() => handlePressCity(item.id, item.image, item.name)}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#F5F5F5',
                    borderRadius: 30,
                }}
            >
                <FastImage
                    style={{
                        height: verticalScale(50),
                        width: scale(50),
                        borderRadius: 30,
                    }}
                    source={{ uri: item.image, priority: FastImage.priority.high }}
                    resizeMode={FastImage.resizeMode.cover}
                />

                <View style={{ marginHorizontal: 15 }}>
                    {index === 0 && (
                        <Text
                            style={{
                                color: '#000',
                                fontSize: moderateScale(12),
                            }}
                        >
                            Tiếp tục khám phá
                        </Text>
                    )}
                    <Text
                        style={{
                            color: '#000',
                            fontSize: moderateScale(14),
                        }}
                    >
                        {item.name}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    // Gọi api và lưu vào AsyncStorage lần đầu
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy tất cả các thành phố (6 thành phố) và lưu vào trong AsyncStorage
                // Nếu AsyncStorage tồn tại thì lần sau chỉ cần truy cập vào AsyncStorage
                if (!(await AsyncStorage.getItem('city'))) {
                    const res3 = await axios.get(`${API_URL}/api/getListCity`);
                    await AsyncStorage.setItem('city', JSON.stringify(res3.data));
                    setListCity(res3.data);
                } else {
                    setListCity(JSON.parse(await AsyncStorage.getItem('city')));
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);
    return (
        <View style={{ marginTop: 28, paddingLeft: 16 }}>
            <Text
                onPress={() => navigation.navigate('Where_go')}
                style={{
                    fontSize: 17,
                    fontWeight: '700',
                    color: '#000',
                }}
            >
                Bạn muốn đi đâu chơi
                <IconEntypo name="chevron-thin-right" size={16} color="#000" />
            </Text>

            {/* Danh sách sản phẩm */}
            <FlatList
                style={{ marginTop: 12 }}
                data={listCity}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                initialNumToRender={1}
                maxToRenderPerBatch={1}
                windowSize={3}
                removeClippedSubviews={true}
                horizontal
                scrollEventThrottle={16}
                ItemSeparatorComponent={() => <View style={{ width: scale(12) }} />}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

export default memo(GoSomewhere);
