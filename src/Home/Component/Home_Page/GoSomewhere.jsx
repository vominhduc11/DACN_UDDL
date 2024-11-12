import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import React, { memo, useEffect, useState } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import axios from 'axios';

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy tất cả các thành phố (6 thành phố) và lưu vào trong AsyncStorage
                // Nếu AsyncStorage tồn tại thì lần sau chỉ cần truy cập vào AsyncStorage
                if (!(await AsyncStorage.getItem('city'))) {
                    const res3 = await axios.get(`http://192.168.0.113:8080/api/getListCity`);
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
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
                <View style={{ flexDirection: 'row' }}>
                    {/* element */}
                    {listCity.map((city, index) => (
                        <TouchableWithoutFeedback key={city.id} onPress={() => handlePressCity(city.id, city.image, city.name)}>
                            <View
                                style={{
                                    marginRight: 12,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: '#F5F5F5',
                                    borderRadius: 30,
                                }}
                            >
                                <FastImage
                                    style={{
                                        height: 50,
                                        width: 50,
                                        borderRadius: 30,
                                    }}
                                    source={{ uri: city.image, priority: FastImage.priority.high }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />

                                <View style={{ marginHorizontal: 15 }}>
                                    {index === 0 && (
                                        <Text
                                            style={{
                                                color: '#000',
                                                fontSize: 12,
                                            }}
                                        >
                                            Tiếp tục khám phá
                                        </Text>
                                    )}
                                    <Text
                                        style={{
                                            color: '#000',
                                        }}
                                    >
                                        {city.name}
                                    </Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default memo(GoSomewhere);
