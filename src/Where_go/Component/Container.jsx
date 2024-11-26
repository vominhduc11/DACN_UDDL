import { View, Text, ScrollView, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Config from '../../.env/Config';
import FastImage from 'react-native-fast-image';

const Container = ({ navigation }) => {
    const [citys, setCitys] = useState([]);
    const [countrys, setCountrys] = useState([]);
    // Hàm render phần tử cho FlatList
    const renderItem = ({ item }) => (
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('City', { id: item.id })}>
            <FastImage
                style={{ borderRadius: 10, height: 170, width: 130, justifyContent: 'flex-end' }}
                source={{
                    uri: item.image,
                    priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
            >
                <View
                    style={{
                        paddingHorizontal: 12,
                        paddingVertical: 16,
                    }}
                >
                    <Text
                        numberOfLines={1}
                        style={{
                            color: '#fff',
                            fontSize: 16,
                            fontWeight: '700',
                        }}
                    >
                        {item.name}
                    </Text>
                </View>
            </FastImage>
        </TouchableOpacity>
    );
    const renderItem1 = ({ item }) => (
        <View style={{ marginTop: 36 }}>
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#000',
                    marginBottom: 12,
                }}
            >
                {item.name}
            </Text>
            {/* phần tử */}
            <ScrollView horizontal>
                {item.cities.map((city) => (
                    <TouchableOpacity onPress={() => navigation.navigate('City', { id: city.id })} activeOpacity={1} style={{ marginRight: 12 }}>
                        <FastImage
                            style={{ borderRadius: 10, height: 70, width: 90, justifyContent: 'flex-end' }}
                            source={{
                                uri: city.image,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        >
                            <View
                                style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 8,
                                }}
                            >
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        color: '#fff',
                                        fontSize: 16,
                                        fontWeight: '700',
                                    }}
                                >
                                    {city.name}
                                </Text>
                            </View>
                        </FastImage>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
    // Gọi api lấy 10 thành phố
    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`${Config.API_URL}/api/get10City`);
                setCitys(res.data);
                const res1 = await axios.get(`${Config.API_URL}/api/getAllCountry`);
                setCountrys(res1.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    return (
        <View
            style={{
                backgroundColor: '#fff',
                paddingHorizontal: 12,
                paddingBottom: 12,
            }}
        >
            <FlatList
                style={{ backgroundColor: '#fff', flex: 1, marginTop: 24 }}
                data={citys}
                renderItem={renderItem}
                keyExtractor={(item) => item.id} // Dùng id làm key duy nhất
                initialNumToRender={1}
                maxToRenderPerBatch={1}
                windowSize={3}
                removeClippedSubviews={true}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                horizontal
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            />

            <FlatList
                style={{ backgroundColor: '#fff', flex: 1, marginTop: 24 }}
                data={countrys}
                renderItem={renderItem1}
                keyExtractor={(item) => item.id} // Dùng id làm key duy nhất
                initialNumToRender={3}
                maxToRenderPerBatch={1}
                windowSize={3}
                removeClippedSubviews={true}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
            />
        </View>
    );
};

export default Container;
