import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';

function Endow_page({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    paddingHorizontal: scale(12),
                    paddingTop: verticalScale(30),
                    paddingBottom: verticalScale(15),
                    backgroundColor: '#f5451e',
                    elevation: 5,
                }}
            >
                <Text style={{ fontSize: moderateScale(24), fontWeight: '700', color: '#fff' }}>Ưu đãi</Text>
                <ScrollView style={{ marginTop: verticalScale(12) }} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{
                                paddingHorizontal: moderateScale(10),
                                paddingVertical: moderateScale(8),
                                borderWidth: 1,
                                borderColor: '#fff',
                                borderRadius: moderateScale(28),
                                marginRight: moderateScale(8),
                                color: '#fff',
                                fontSize: moderateScale(13),
                            }}
                        >
                            New ZEALAND
                        </Text>
                        {/* Repeat the Text components as needed */}
                    </View>
                </ScrollView>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        marginTop: verticalScale(24),
                        paddingHorizontal: scale(12),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                    }}
                >
                    {/* Repeat this TouchableWithoutFeedback component for each item */}
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Product')}>
                        <View
                            style={{
                                borderWidth: 0.5,
                                borderColor: '#DDDDDD',
                                borderRadius: moderateScale(12),
                                width: scale(140),
                                marginBottom: verticalScale(8),
                            }}
                        >
                            <FastImage
                                style={{
                                    height: verticalScale(100),
                                    borderTopLeftRadius: moderateScale(12),
                                    borderTopRightRadius: moderateScale(12),
                                }}
                                source={{
                                    uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w',
                                    priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <View
                                style={{
                                    padding: scale(5),
                                }}
                            >
                                <Text
                                    numberOfLines={3}
                                    style={{
                                        fontWeight: '700',
                                        color: '#000',
                                        width: scale(140),
                                    }}
                                >
                                    Du thuyền ăn tối sang trọng Opulence trên sông Chao Phraya
                                </Text>
                                <Text style={{ marginTop: verticalScale(6) }}>
                                    <IconAntDesign name="star" size={scale(16)} color="#FFCC33" />
                                    <Text
                                        style={{
                                            color: '#FFCC33',
                                        }}
                                    >
                                        4.8
                                    </Text>
                                    (362)
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: '700',
                                        marginTop: verticalScale(6),
                                        color: '#000',
                                    }}
                                >
                                    đ 61,777
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Product')}>
                        <View
                            style={{
                                borderWidth: 0.5,
                                borderColor: '#DDDDDD',
                                borderRadius: moderateScale(12),
                                width: scale(140),
                                marginBottom: verticalScale(8),
                            }}
                        >
                            <FastImage
                                style={{
                                    height: verticalScale(100),
                                    borderTopLeftRadius: moderateScale(12),
                                    borderTopRightRadius: moderateScale(12),
                                }}
                                source={{
                                    uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w',
                                    priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <View
                                style={{
                                    padding: scale(5),
                                }}
                            >
                                <Text
                                    numberOfLines={3}
                                    style={{
                                        fontWeight: '700',
                                        color: '#000',
                                        width: scale(140),
                                    }}
                                >
                                    Du thuyền ăn tối sang trọng Opulence trên sông Chao Phraya
                                </Text>
                                <Text style={{ marginTop: verticalScale(6) }}>
                                    <IconAntDesign name="star" size={scale(16)} color="#FFCC33" />
                                    <Text
                                        style={{
                                            color: '#FFCC33',
                                        }}
                                    >
                                        4.8
                                    </Text>
                                    (362)
                                </Text>
                                <Text
                                    style={{
                                        fontWeight: '700',
                                        marginTop: verticalScale(6),
                                        color: '#000',
                                    }}
                                >
                                    đ 61,777
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    {/* Repeat for other items */}
                </View>
            </ScrollView>
        </View>
    );
}

export default Endow_page;
