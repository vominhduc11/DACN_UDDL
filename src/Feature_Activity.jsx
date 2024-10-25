import { View, Text, ImageBackground, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';

import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const Feature_Activity = ({ navigation }) => {
    const [opacity, setOpacity] = useState(0);
    const [opacityBackground, setOpacityBackground] = useState(1);
    const [color1, setColor1] = useState('#fff');
    const [color2, setColor2] = useState('transparent');
    const [bottom, setBottom] = useState(0);

    const handleScroll = (event) => {
        // Lấy tọa độ của scroll
        const scrollY = event.nativeEvent.contentOffset.y;
        setOpacity(scrollY / 160);
        setBottom(scrollY / 5);
        setOpacityBackground(1.2 - scrollY / 160);

        if (scrollY >= 160) {
            setColor1('#000');
            setColor2('#000');
            // setZIndex(1);
        } else {
            setColor1('#fff');
            setColor2('transparent');
            // setZIndex(10);
        }
    };
    return (
        <View style={{ position: 'relative' }}>
            <ScrollView
                onScroll={handleScroll}
                style={{ backgroundColor: '#fff', height: '100%' }}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}>
                <View style={{ position: 'relative' }}>
                    <ImageBackground
                        style={{
                            paddingTop: 130,
                            paddingBottom: 42,
                            paddingHorizontal: 12,
                            position: 'relative',
                            bottom: bottom,
                            opacity: opacityBackground,
                        }}
                        source={{
                            uri: 'https://tphcm.dangcongsan.vn/DATA/72/IMAGES/2023/11/tao-da-de-tphcm-phat-trien-thanh-do-thi-thong-minh1517188897.jpg',
                        }}>
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: 24,
                                fontWeight: '600',
                            }}
                            numberOfLines={1}>
                            Hoạt động nổi bật ở thành phố Hồ Chí Minh
                        </Text>
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: 16,
                                marginTop: 8,
                            }}>
                            <IconFeather name="map-pin" size={16} />
                            TP Hồ Chí Minh
                        </Text>
                    </ImageBackground>
                </View>
                <View
                    style={{
                        paddingHorizontal: 12,
                        zIndex: 10,
                        borderRadius: 12,
                        backgroundColor: '#fff',
                        marginTop: -12,
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
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    position: 'absolute',
                    backgroundColor: 'red',
                    backgroundColor: `rgba(255, 255, 255, ${opacity})`,
                    paddingTop: 24,
                    paddingBottom: 12,
                    paddingHorizontal: 12,
                    top: 0,
                    right: 0,
                    left: 0,
                    zIndex: 100,
                }}>
                <IconEntypo
                    onPress={() => navigation.navigate('Home')}
                    name="chevron-left"
                    size={30}
                    color={color1}
                />
                <Text style={{ color: color2, fontWeight: '600' }}>
                    Hoạt động nổi bật gần đây
                </Text>
            </View>
        </View>
    );
};

export default Feature_Activity;
