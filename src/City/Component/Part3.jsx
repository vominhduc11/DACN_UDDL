import { View, Text, ImageBackground, TouchableWithoutFeedback, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

import Config from '../../.env/Config';

const Part3 = ({ id, city, navigation }) => {
    const [citys, setCitys] = useState([]);

    // Phần tử render trong flatList
    const renderItem = ({ item }) => (
        <TouchableWithoutFeedback onPress={() => navigation.push('City', { id: item.id })}>
            <View>
                <ImageBackground
                    borderRadius={moderateScale(10)} // Sử dụng moderateScale cho borderRadius
                    style={{
                        height: verticalScale(170), // Dùng verticalScale cho chiều cao
                        width: scale(130), // Dùng scale cho chiều rộng
                        justifyContent: 'flex-end',
                    }}
                    source={{
                        uri: item.image,
                    }}
                >
                    <View
                        style={{
                            paddingHorizontal: scale(12), // Sử dụng scale cho padding ngang
                            paddingVertical: verticalScale(16), // Dùng verticalScale cho padding dọc
                        }}
                    >
                        <Text
                            numberOfLines={1}
                            style={{
                                color: '#fff',
                                fontSize: moderateScale(16), // Dùng moderateScale cho fontSize
                                fontWeight: '700',
                            }}
                        >
                            {item.name}
                        </Text>
                        <Text style={{ color: '#fff' }}>{item.distance} km</Text>
                    </View>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );

    // Gọi api lần đầu
    useEffect(() => {
        // console.log('mount');
        async function findLocal(param) {
            const res = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?apikey=${Config.API_KEY}&q=${param}`);
            // console.log(param);
            return res.data.items[0].position;
        }

        async function fetchData() {
            try {
                const res = await axios.get(`${API_URL}/api/getAllCity/${id}`);
                // Bỏ thành phố hiện tại
                const newData = res.data.filter((ele) => ele.id !== id);
                // Tìm tọa độ hiện tại của thành phố đó

                const positionOrigin = await findLocal(city.name);
                // Duyệt qua mảng đã bỏ thành phố hiện tại để thêm distance
                var mainData = await Promise.all(
                    newData.map(async (ele) => {
                        //lấy vị trí
                        const positionDestination = await findLocal(ele.name);
                        const res = await axios.get(
                            `https://router.hereapi.com/v8/routes?apikey=${Config.API_KEY}&transportMode=car&origin=${positionOrigin.lat},${positionOrigin.lng}&destination=${positionDestination.lat},${positionDestination.lng}&return=summary`
                        );
                        ele.distance = res.data.routes[0].sections[0].summary.length / 1000;
                        return ele;
                    })
                );
            } catch (error) {
                console.log(error);
            } finally {
                setCitys(mainData);
            }
        }
        fetchData();
    }, [city]);

    return (
        <View style={{ marginTop: moderateScale(28) }}>
            <Text
                style={{
                    color: '#000',
                    fontSize: moderateScale(18),
                    fontWeight: '700',
                }}
            >
                Điểm đến gần đây
            </Text>

            <FlatList
                style={{ marginBottom: moderateScale(12), marginTop: moderateScale(24) }}
                data={citys}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                initialNumToRender={1}
                maxToRenderPerBatch={1}
                windowSize={3}
                removeClippedSubviews={true}
                scrollEventThrottle={16}
                ItemSeparatorComponent={() => <View style={{ width: scale(12) }} />}
                horizontal
            />

            <TouchableWithoutFeedback>
                <Text
                    style={{
                        textAlign: 'center',
                        color: '#000',
                        fontWeight: '700',
                        borderWidth: 1,
                        paddingVertical: moderateScale(12),
                        borderRadius: 12,
                    }}
                >
                    Tất cả điểm đến
                </Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default Part3;
