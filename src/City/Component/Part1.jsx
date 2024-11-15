import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';

import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFoundation from 'react-native-vector-icons/Foundation';
import axios from 'axios';

const Part1 = ({ id }) => {
    const [listCategory, setListCategory] = useState([]);

    // Gọi Api
    useEffect(() => {
        async function fetchData() {
            const res1 = await axios.get(`http://10.150.3.6:8080/api/getAllCategoryOfCity/${id}`);
            setListCategory(res1.data);
        }
        fetchData();
    }, []);
    return (
        <View
            style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: 12,
            }}
        >
            {listCategory.map((category, index) => {
                switch (category) {
                    case 'Tour':
                        return (
                            <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Search')}>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        flexBasis: '25%',
                                    }}
                                >
                                    <IconMaterialIcons name="tour" size={30} color="#990000" />
                                    <Text style={{ maxWidth: 60, fontSize: 12, textAlign: 'center', color: '#000' }}>Tour</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    case 'Du thuyền':
                        return (
                            <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Search')}>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        flexBasis: '25%',
                                    }}
                                >
                                    <IconMaterialIcons name="directions-boat" size={30} color="#33FFFF" />
                                    <Text style={{ maxWidth: 60, fontSize: 12, textAlign: 'center', color: '#000' }}>Du thuyền</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    case 'Massage & Suối nước nóng':
                        return (
                            <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Search')}>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        flexBasis: '25%',
                                    }}
                                >
                                    <IconFontAwesome5 name="hot-tub" size={30} color="#FF9999" />
                                    <Text style={{ maxWidth: 60, fontSize: 12, textAlign: 'center', color: '#000' }}>Massage & Suối nước nóng</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    case 'Phiêu lưu & khám phá thiên nhiên':
                        return (
                            <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Search')}>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        flexBasis: '25%',
                                    }}
                                >
                                    <IconFoundation name="trees" size={30} color="#009933" />
                                    <Text style={{ maxWidth: 60, fontSize: 12, textAlign: 'center', color: '#000' }}>
                                        Phiêu lưu & khám phá thiên nhiên
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    case 'Hoạt động dưới nước':
                        return (
                            <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Search')}>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        flexBasis: '25%',
                                    }}
                                >
                                    <IconFontAwesome5 name="swimmer" size={30} color="#0099FF" />
                                    <Text style={{ maxWidth: 60, fontSize: 12, textAlign: 'center', color: '#000' }}>Hoạt động dưới nước</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    case 'Trải nghiệm văn hóa':
                        return (
                            <TouchableWithoutFeedback key={index} onPress={() => navigation.navigate('Search')}>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        flexBasis: '25%',
                                    }}
                                >
                                    <IconFontAwesome5 name="landmark" size={30} color="#900" />
                                    <Text style={{ maxWidth: 60, fontSize: 12, textAlign: 'center', color: '#000' }}>Trải nghiệm văn hóa</Text>
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
