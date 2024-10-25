import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const Recent_View = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ paddingHorizontal: 12 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: '#fff',
                        borderRadius: 12,
                        padding: 12,
                        marginTop: 12,
                    }}>
                    <Image
                        height={100}
                        width={100}
                        borderRadius={12}
                        source={{
                            uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w.webp',
                        }}
                    />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <Text>
                            Tour <IconEntypo name="dot-single" /> TP Hồ Chí Minh
                        </Text>
                        <Text
                            numberOfLines={2}
                            style={{
                                fontSize: 16,
                                fontWeight: '600',
                                color: '#000',
                            }}>
                            Du thuyền ăn tối sang trọng Opulence trên sông Chao
                            Phraya
                        </Text>
                        <Text style={{ marginTop: 6 }} numberOfLines={1}>
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
                                fontWeight: '600',
                                color: '#000',
                                marginTop: 5,
                            }}>
                            đ 690,000
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default Recent_View;
