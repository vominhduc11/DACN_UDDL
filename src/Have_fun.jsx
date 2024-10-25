import { View, Text, ScrollView, ImageBackground, Image } from 'react-native';
import React from 'react';

import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const Have_fun = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    paddingHorizontal: 12,
                    paddingTop: 24,
                    paddingBottom: 12,
                }}>
                <IconEntypo
                    name="chevron-left"
                    color="#000"
                    size={30}
                    onPress={() => navigation.goBack()}
                />
                <Text
                    style={{
                        color: '#000',
                        fontSize: 16,
                        fontWeight: '700',
                        marginLeft: 24,
                    }}>
                    Vui hết cỡ tại Bangkok
                </Text>
            </View>
            <ScrollView
                style={{ backgroundColor: '#fff' }}
                showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        paddingHorizontal: 12,
                        backgroundColor: '#fff',
                    }}>
                    {/* phần tử */}
                    <View style={{ marginTop: 12, position: 'relative' }}>
                        <Image
                            borderRadius={12}
                            height={160}
                            source={{
                                uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_540,h_360,c_fill,q_85/activities/mzefblljuetiycoas1or.webp',
                            }}
                        />
                        <Text style={{ marginTop: 6 }}>
                            Tour <IconEntypo name="dot-single" /> TP Hồ Chí Minh
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color: '#000',
                                marginTop: 6,
                            }}>
                            Buffet Hải Sản La Vela Saigon
                        </Text>
                        <Text style={{ marginTop: 6 }}>
                            <IconAntDesign name="star" color="#fe9428" />{' '}
                            <Text
                                style={{
                                    color: '#fe9428',
                                    fontWeight: '600',
                                }}>
                                4.5
                            </Text>
                            (152)
                            <IconEntypo name="dot-single" />
                            2K+ Đã được đặt
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color: '#000',
                                marginTop: 6,
                            }}>
                            đ 351,540
                        </Text>
                        <IconAntDesign
                            name="hearto"
                            size={25}
                            color="#fff"
                            style={{ position: 'absolute', right: 12, top: 20 }}
                        />
                    </View>
                    <View style={{ marginTop: 12, position: 'relative' }}>
                        <Image
                            borderRadius={12}
                            height={160}
                            source={{
                                uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_540,h_360,c_fill,q_85/activities/mzefblljuetiycoas1or.webp',
                            }}
                        />
                        <Text style={{ marginTop: 6 }}>
                            Tour <IconEntypo name="dot-single" /> TP Hồ Chí Minh
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color: '#000',
                                marginTop: 6,
                            }}>
                            Buffet Hải Sản La Vela Saigon
                        </Text>
                        <Text style={{ marginTop: 6 }}>
                            <IconAntDesign name="star" color="#fe9428" />{' '}
                            <Text
                                style={{
                                    color: '#fe9428',
                                    fontWeight: '600',
                                }}>
                                4.5
                            </Text>
                            (152)
                            <IconEntypo name="dot-single" />
                            2K+ Đã được đặt
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color: '#000',
                                marginTop: 6,
                            }}>
                            đ 351,540
                        </Text>
                        <IconAntDesign
                            name="hearto"
                            size={25}
                            color="#fff"
                            style={{ position: 'absolute', right: 12, top: 20 }}
                        />
                    </View>
                    <View style={{ marginTop: 12, position: 'relative' }}>
                        <Image
                            borderRadius={12}
                            height={160}
                            source={{
                                uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_540,h_360,c_fill,q_85/activities/mzefblljuetiycoas1or.webp',
                            }}
                        />
                        <Text style={{ marginTop: 6 }}>
                            Tour <IconEntypo name="dot-single" /> TP Hồ Chí Minh
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color: '#000',
                                marginTop: 6,
                            }}>
                            Buffet Hải Sản La Vela Saigon
                        </Text>
                        <Text style={{ marginTop: 6 }}>
                            <IconAntDesign name="star" color="#fe9428" />{' '}
                            <Text
                                style={{
                                    color: '#fe9428',
                                    fontWeight: '600',
                                }}>
                                4.5
                            </Text>
                            (152)
                            <IconEntypo name="dot-single" />
                            2K+ Đã được đặt
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color: '#000',
                                marginTop: 6,
                            }}>
                            đ 351,540
                        </Text>
                        <IconAntDesign
                            name="hearto"
                            size={25}
                            color="#fff"
                            style={{ position: 'absolute', right: 12, top: 20 }}
                        />
                    </View>
                    <View style={{ marginTop: 12, position: 'relative' }}>
                        <Image
                            borderRadius={12}
                            height={160}
                            source={{
                                uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_540,h_360,c_fill,q_85/activities/mzefblljuetiycoas1or.webp',
                            }}
                        />
                        <Text style={{ marginTop: 6 }}>
                            Tour <IconEntypo name="dot-single" /> TP Hồ Chí Minh
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color: '#000',
                                marginTop: 6,
                            }}>
                            Buffet Hải Sản La Vela Saigon
                        </Text>
                        <Text style={{ marginTop: 6 }}>
                            <IconAntDesign name="star" color="#fe9428" />{' '}
                            <Text
                                style={{
                                    color: '#fe9428',
                                    fontWeight: '600',
                                }}>
                                4.5
                            </Text>
                            (152)
                            <IconEntypo name="dot-single" />
                            2K+ Đã được đặt
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: '700',
                                color: '#000',
                                marginTop: 6,
                            }}>
                            đ 351,540
                        </Text>
                        <IconAntDesign
                            name="hearto"
                            size={25}
                            color="#fff"
                            style={{ position: 'absolute', right: 12, top: 20 }}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Have_fun;
