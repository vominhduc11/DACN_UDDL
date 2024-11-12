import { View, Text, ScrollView, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

const Part3 = () => {
    return (
        <View style={{ marginTop: 28 }}>
            <Text
                style={{
                    color: '#000',
                    fontSize: 18,
                    fontWeight: '700',
                }}
            >
                Điểm đến gần đây
            </Text>
            <ScrollView
                style={{ marginTop: 24, marginBottom: 12 }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginRight: 12 }}>
                        <ImageBackground
                            borderRadius={10}
                            style={{
                                height: 170,
                                width: 130,
                                justifyContent: 'flex-end',
                            }}
                            source={{
                                uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_auto/w_400,h_533,c_fill/cities/gagpmpohflexp1kfy9vr.webp',
                            }}
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
                                    Pattaya
                                </Text>
                                <Text style={{ color: '#fff' }}>101km</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ marginRight: 12 }}>
                        <ImageBackground
                            borderRadius={10}
                            style={{
                                height: 170,
                                width: 130,
                                justifyContent: 'flex-end',
                            }}
                            source={{
                                uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_auto/w_400,h_533,c_fill/cities/gagpmpohflexp1kfy9vr.webp',
                            }}
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
                                    Pattaya
                                </Text>
                                <Text style={{ color: '#fff' }}>101km</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ marginRight: 12 }}>
                        <ImageBackground
                            borderRadius={10}
                            style={{
                                height: 170,
                                width: 130,
                                justifyContent: 'flex-end',
                            }}
                            source={{
                                uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_auto/w_400,h_533,c_fill/cities/gagpmpohflexp1kfy9vr.webp',
                            }}
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
                                    Pattaya
                                </Text>
                                <Text style={{ color: '#fff' }}>101km</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ marginRight: 12 }}>
                        <ImageBackground
                            borderRadius={10}
                            style={{
                                height: 170,
                                width: 130,
                                justifyContent: 'flex-end',
                            }}
                            source={{
                                uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_auto/w_400,h_533,c_fill/cities/gagpmpohflexp1kfy9vr.webp',
                            }}
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
                                    Pattaya
                                </Text>
                                <Text style={{ color: '#fff' }}>101km</Text>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
            </ScrollView>
            <TouchableWithoutFeedback>
                <Text
                    style={{
                        textAlign: 'center',
                        color: '#000',
                        fontWeight: '700',
                        borderWidth: 1,
                        paddingVertical: 12,
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
