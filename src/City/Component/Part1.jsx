import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';

import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFoundation from 'react-native-vector-icons/Foundation';
import axios from 'axios';
import { moderateScale, scale } from 'react-native-size-matters';

import Config from '../../.env/Config';

const Part1 = ({ id, navigation, city }) => {
    const [listCategory, setListCategory] = useState([]);

    // Gọi Api
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`${Config.API_URL}/api/getAllCategoryOfCity/${id}`);
            setListCategory(res.data);
        }
        fetchData();
    }, []);
    return (
        <View
            style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: moderateScale(12),
            }}
        >
            {listCategory.map((category, index) => {
                switch (category) {
                    case 'Tour':
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.navigate('Search', { category: 'Tour', nameCity: city.name })}
                            >
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        flexBasis: '25%',
                                    }}
                                >
                                    <IconMaterialIcons name="tour" size={moderateScale(30)} color="#990000" />
                                    <Text style={{ maxWidth: scale(60), fontSize: moderateScale(12), textAlign: 'center', color: '#000' }}>Tour</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    case 'Du thuyền':
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.navigate('Search', { category: 'Du thuyền', nameCity: city.name })}
                            >
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        flexBasis: '25%',
                                    }}
                                >
                                    <IconMaterialIcons name="directions-boat" size={moderateScale(30)} color="#33FFFF" />
                                    <Text style={{ maxWidth: scale(60), fontSize: moderateScale(12), textAlign: 'center', color: '#000' }}>
                                        Du thuyền
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    case 'Massage & Suối nước nóng':
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.navigate('Search', { category: 'Massage & Suối nước nóng', nameCity: city.name })}
                            >
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        flexBasis: '25%',
                                    }}
                                >
                                    <IconFontAwesome5 name="hot-tub" size={moderateScale(30)} color="#FF9999" />
                                    <Text style={{ maxWidth: scale(60), fontSize: moderateScale(12), textAlign: 'center', color: '#000' }}>
                                        Massage & Suối nước nóng
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    case 'Phiêu lưu & khám phá thiên nhiên':
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.navigate('Search', { category: 'Phiêu lưu & khám phá thiên nhiên', nameCity: city.name })}
                            >
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        flexBasis: '25%',
                                    }}
                                >
                                    <IconFoundation name="trees" size={moderateScale(30)} color="#009933" />
                                    <Text style={{ maxWidth: scale(60), fontSize: moderateScale(12), textAlign: 'center', color: '#000' }}>
                                        Phiêu lưu & khám phá thiên nhiên
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    case 'Hoạt động dưới nước':
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.navigate('Search', { category: 'Hoạt động dưới nước', nameCity: city.name })}
                            >
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        flexBasis: '25%',
                                    }}
                                >
                                    <IconFontAwesome5 name="swimmer" size={moderateScale(30)} color="#0099FF" />
                                    <Text style={{ maxWidth: scale(60), fontSize: moderateScale(12), textAlign: 'center', color: '#000' }}>
                                        Hoạt động dưới nước
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    case 'Trải nghiệm văn hóa':
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.navigate('Search', { category: 'Trải nghiệm văn hóa', nameCity: city.name })}
                            >
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        flexBasis: '25%',
                                    }}
                                >
                                    <IconFontAwesome5 name="landmark" size={moderateScale(30)} color="#900" />
                                    <Text style={{ maxWidth: scale(60), fontSize: moderateScale(12), textAlign: 'center', color: '#000' }}>
                                        Trải nghiệm văn hóa
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    default:
                        break;
                }
            })}
        </View>
    );
};

export default Part1;
