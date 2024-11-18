import {
    View,
    Text,
    Modal,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback,
    Dimensions,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView,
} from 'react-native';
import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useState } from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import axios from 'axios';

import { API_URL } from '@env';
import FastImage from 'react-native-fast-image';

const ModalDestination = ({ setValueInput, setListProduct, handlePressProduct, navigation }, ref) => {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');
    const [citys, setCitys] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Cung cấp hàm openModal cho component cha
    useImperativeHandle(ref, () => ({
        openModal() {
            setVisible(true);
        },
        closeModal() {
            setVisible(false);
        },
    }));

    // Sử lý khi nhấp vào tên thành phố
    const handlePressCity_Name = (cityName, cityId) => {
        setVisible(false);
        setValueInput(cityName);
        setListProduct(cityId);
        setValue(cityName);
    };

    // Các phần tử renderItem
    const renderItemCity = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                setVisible(false);
                setValueInput(item.name);
                setListProduct(item.id);
            }}
            activeOpacity={0.5}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 6 }}>
                <IconFeather name="map-pin" size={26} color="#FF6600" />
                <View style={{ paddingHorizontal: 12 }}>
                    <Text style={{ color: '#000', fontWeight: 700, fontSize: 16 }}>{item.name}</Text>
                    <Text style={{ color: '#000' }}>{item.country}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
    const renderItemProduct = ({ item }) => (
        <TouchableWithoutFeedback
            onPress={() => {
                handlePressProduct(item.id, item.image, item.name, item.star, item.category, item.cityId, item.city, item.package), setVisible(false);
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12 }}>
                <FastImage
                    style={{
                        height: 50,
                        width: 50,
                        borderRadius: 8,
                    }}
                    source={{ uri: item.image, priority: FastImage.priority.high }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ color: '#000', marginBottom: 4 }} numberOfLines={1}>
                        {item.name}
                    </Text>
                    <Text style={{ color: '#c0c0c0', fontWeight: 700 }}>{item.city}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    // Gọi api lần đầu
    useEffect(() => {
        if (value === '') {
            setCitys([]);
            setProducts([]);
        }
        if (loading) {
            return;
        }
        setLoading(true);
        async function fetchData() {
            try {
                const res = await axios.get(`${API_URL}/api/getListCityAccordingString/${value}`);
                setCitys(res.data);

                const res1 = await axios.get(`${API_URL}/api/getListProductAccordingString/${value}`);
                setProducts(res1.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [value]);
    return (
        <Modal
            animationType="slide" // hoặc 'fade', 'none', 'slide'
            transparent={true} // modal trong suốt hay không
            visible={visible} // điều kiện để hiện modal
            hardwareAccelerated={true}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View
                    style={{
                        backgroundColor: '#fff',
                        flex: 1,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 12,
                        }}
                    >
                        <IconAntDesign
                            name="close"
                            size={22}
                            color="#000"
                            onPress={() => {
                                // height.setValue(0);
                                setVisible(false);
                            }}
                        />
                        <TextInput
                            placeholder="Tìm thành phồ hoặc điểm đến"
                            placeholderTextColor="#C0C0C0"
                            value={value}
                            onChangeText={setValue}
                            style={{
                                borderWidth: 1,
                                borderColor: '#f9c197',
                                borderRadius: 30,
                                flex: 1,
                                marginLeft: 14,
                                paddingHorizontal: 16,
                                paddingVertical: 6,
                                color: '#000',
                            }}
                        />
                    </View>

                    {(citys.length !== 0 || products.length !== 0) && (
                        <ScrollView
                            style={{
                                position: 'absolute',
                                zIndex: 1,
                                top: 66,
                                width: '100%',
                                backgroundColor: '#fff',
                                height: Dimensions.get('window').height - 66,
                            }}
                        >
                            {citys.length !== 0 && (
                                <FlatList
                                    style={{ paddingVertical: 12 }}
                                    data={citys}
                                    renderItem={renderItemCity}
                                    keyExtractor={(item) => item.id}
                                    initialNumToRender={1}
                                    maxToRenderPerBatch={1}
                                    windowSize={3}
                                    removeClippedSubviews={true}
                                    scrollEventThrottle={16}
                                    scrollEnabled={false}
                                    ItemSeparatorComponent={() => <View style={{ height: 12 }}></View>}
                                />
                            )}
                            {citys.length === 0 || products.length === 0 || <View style={{ borderBottomColor: '#dedede', borderBottomWidth: 1 }} />}
                            {products.length !== 0 && (
                                <FlatList
                                    style={{ paddingVertical: 12 }}
                                    data={products}
                                    renderItem={renderItemProduct}
                                    keyExtractor={(item) => item.id}
                                    initialNumToRender={1}
                                    maxToRenderPerBatch={1}
                                    windowSize={3}
                                    removeClippedSubviews={true}
                                    scrollEventThrottle={16}
                                    scrollEnabled={false}
                                    ItemSeparatorComponent={() => <View style={{ height: 12 }}></View>}
                                    ListHeaderComponent={() => (
                                        <Text style={{ color: '#c0c0c0', paddingHorizontal: 12, marginBottom: 16 }}>Có thể bạn sẽ thích</Text>
                                    )}
                                />
                            )}
                        </ScrollView>
                    )}

                    <View
                        style={{
                            flex: 1,
                            paddingHorizontal: 14,
                            paddingVertical: 24,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: '700',
                                color: '#000',
                            }}
                        >
                            Phổ biến nhất
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                        >
                            <Text
                                onPress={() => handlePressCity_Name('Tokyo', 11)}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 24,
                                    color: '#000',
                                    marginRight: 8,
                                    marginTop: 12,
                                }}
                            >
                                Tokyo
                            </Text>
                            <Text
                                onPress={() => handlePressCity_Name('Osaka', 13)}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 24,
                                    color: '#000',
                                    marginRight: 8,
                                    marginTop: 12,
                                }}
                            >
                                Osaka
                            </Text>
                            <Text
                                onPress={() => handlePressCity_Name('Kyoto', 12)}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 24,
                                    color: '#000',
                                    marginRight: 8,
                                    marginTop: 12,
                                }}
                            >
                                Kyoto
                            </Text>
                            <Text
                                onPress={() => handlePressCity_Name('Thâm Quyến', 19)}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 24,
                                    color: '#000',
                                    marginRight: 8,
                                    marginTop: 12,
                                }}
                            >
                                Thâm Quyến
                            </Text>
                            <Text
                                onPress={() => handlePressCity_Name('Bangkok', 23)}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 24,
                                    color: '#000',
                                    marginRight: 8,
                                    marginTop: 12,
                                }}
                            >
                                Bangkok
                            </Text>
                            <Text
                                onPress={() => handlePressCity_Name('Seoul', 7)}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 24,
                                    color: '#000',
                                    marginRight: 8,
                                    marginTop: 12,
                                }}
                            >
                                Seoul
                            </Text>
                            <Text
                                onPress={() => handlePressCity_Name('Sydney', 27)}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 24,
                                    color: '#000',
                                    marginRight: 8,
                                    marginTop: 12,
                                }}
                            >
                                Sydney
                            </Text>
                            <Text
                                onPress={() => handlePressCity_Name('Quảng Châu', 20)}
                                style={{
                                    backgroundColor: '#f5f5f5',
                                    paddingVertical: 8,
                                    paddingHorizontal: 12,
                                    borderRadius: 24,
                                    color: '#000',
                                    marginRight: 8,
                                    marginTop: 12,
                                }}
                            >
                                Quảng Châu
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default forwardRef(ModalDestination);
