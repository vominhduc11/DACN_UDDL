import { View, Text, ScrollView, TextInput, Image } from 'react-native';
import React from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';

const Search = ({ navigation }) => {
    return (
        <View style={{ backgroundColor: '#fff' }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 12,
                    paddingVertical: 12,
                    elevation: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: '#DDDDDD',
                }}>
                <IconAntDesign
                    name="left"
                    size={26}
                    onPress={() => navigation.goBack()}
                />
                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                    <TextInput
                        style={{
                            backgroundColor: '#f5f5f5',
                            borderRadius: 25,
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                        }}
                    />
                </View>
                <IconFeather
                    name="shopping-cart"
                    size={26}
                    onPress={() => navigation.navigate('Cart')}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        paddingHorizontal: 12,
                        backgroundColor: '#fff',
                    }}>
                    <Text style={{ color: '#000', paddingVertical: 15 }}>
                        Tìm thấy 925 kết quả
                    </Text>
                    {/* phần tử */}
                    <View style={{ paddingTop: 12, position: 'relative' }}>
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
                    <View style={{ paddingTop: 12, position: 'relative' }}>
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
                    <View style={{ paddingTop: 12, position: 'relative' }}>
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
                    <View style={{ paddingTop: 12, position: 'relative' }}>
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

export default Search;
