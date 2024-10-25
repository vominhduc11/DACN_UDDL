import { View, Text, ImageBackground, Image, ScrollView, TouchableWithoutFeedback, TextInput } from 'react-native';
import React, { useState } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconFeather from 'react-native-vector-icons/Feather';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const City = ({ navigation }) => {
    const [opacity, setOpacity] = useState(0);
    const [opacityBackground, setOpacityBackground] = useState(1);
    const [color, setColor] = useState('#fff');
    const [bottom, setBottom] = useState(0);
    const [colorBtn, setColorBtn] = useState('');
    const [backgroundBtn, setBackgroundBtn] = useState('#fff');

    const handleScroll = (event) => {
        // Lấy tọa độ của scroll
        const scrollY = event.nativeEvent.contentOffset.y;
        setOpacity(scrollY / 160);
        setBottom(scrollY / 5);
        setOpacityBackground(1.2 - scrollY / 160);

        if (scrollY >= 160) {
            setColor('#f5f5f5');
            // setZIndex(1);
        } else {
            setColor('#fff');
            // setZIndex(10);
        }
    };
    return (
        <View style={{ position: 'relative' }}>
            <View
                style={{
                    padding: 12,
                    position: 'absolute',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    top: 0,
                    right: 0,
                    left: 0,
                    zIndex: 1,
                    backgroundColor: `rgba(255, 255, 255, ${opacity})`,
                }}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
                    <View
                        style={{
                            backgroundColor: backgroundBtn,
                            padding: 10,
                            borderRadius: 30,
                        }}>
                        <IconEntypo name="chevron-left" size={20} color={colorBtn} />
                    </View>
                </TouchableWithoutFeedback>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 30,
                        paddingRight: 12,
                        backgroundColor: color,
                    }}>
                    <IconFeather name="search" size={20} color="#000" style={{ marginHorizontal: 10 }} />
                    <TextInput
                        placeholder="Tìm kiếm ..."
                        style={{
                            width: 130,
                            fontSize: 15,
                            color: '#000',
                            paddingVertical: 5,
                        }}
                    />
                </View>
                <View
                    style={{
                        backgroundColor: backgroundBtn,
                        padding: 10,
                        borderRadius: 30,
                        opacity: 0,
                    }}>
                    <IconEntypo name="chevron-left" size={20} color={colorBtn} />
                </View>
            </View>
            <ScrollView
                onScroll={handleScroll}
                style={{ backgroundColor: '#fff', height: '100%' }}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
                overScrollMode="always">
                <View style={{ position: 'relative' }}>
                    <ImageBackground
                        style={{
                            paddingTop: 148,
                            paddingBottom: 52,
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
                            Bangkok
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
                        paddingTop: 20,
                        paddingBottom: 12,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginTop: 12,
                        }}>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    flexBasis: '25%',
                                }}>
                                <IconMaterialIcons name="tour" size={30} color="#990000" />
                                <Text style={{ maxWidth: 60, fontSize: 12, textAlign: 'center' }}>Tour</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    flexBasis: '25%',
                                }}>
                                <IconMaterialIcons name="directions-boat" size={30} color="#33FFFF" />
                                <Text style={{ maxWidth: 60, fontSize: 12, textAlign: 'center' }}>Du thuyền</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    flexBasis: '25%',
                                }}>
                                <IconFontAwesome5 name="hot-tub" size={30} color="#FF9999" />
                                <Text style={{ maxWidth: 60, fontSize: 12, textAlign: 'center' }}>Massage & Suối nước nóng</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    flexBasis: '25%',
                                }}>
                                <IconFoundation name="trees" size={30} color="#009933" />
                                <Text style={{ maxWidth: 60, fontSize: 12, textAlign: 'center' }}>Phiêu lưu & khám phá thiên nhiên</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    flexBasis: '25%',
                                }}>
                                <IconFontAwesome5 name="swimmer" size={30} color="#0099FF" />
                                <Text style={{ maxWidth: 60, fontSize: 12, textAlign: 'center' }}>Hoạt động dưới nước</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Search')}>
                            <View
                                style={{
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    flexBasis: '25%',
                                }}>
                                <IconFontAwesome5 name="landmark" size={30} color="#900" />
                                <Text style={{ maxWidth: 60, fontSize: 12, textAlign: 'center' }}>Trải nghiệm văn hóa</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ marginTop: 28 }}>
                        <Text
                            style={{
                                color: '#000',
                                fontSize: 18,
                                fontWeight: '700',
                            }}>
                            Vui hết cỡ tại Bangkok
                        </Text>
                        <View
                            style={{
                                marginTop: 24,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                            }}>
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('Product')}>
                                <View
                                    style={{
                                        borderWidth: 0.5,
                                        borderColor: '#DDDDDD',
                                        borderRadius: 12,
                                        width: 140,
                                        marginBottom: 15,
                                        position: 'relative',
                                    }}>
                                    <Image
                                        height={100}
                                        borderTopLeftRadius={12}
                                        borderTopRightRadius={12}
                                        source={{
                                            uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w',
                                        }}
                                    />
                                    <View
                                        style={{
                                            padding: 5,
                                        }}>
                                        <Text
                                            numberOfLines={3}
                                            style={{
                                                fontWeight: 700,
                                                color: '#000',
                                                width: 140,
                                            }}>
                                            Du thuyền ăn tối sang trọng Opulence trên sông Chao Phraya
                                        </Text>
                                        <Text style={{ marginTop: 6 }}>
                                            <IconAntDesign name="star" size={16} color="#FFCC33" />
                                            <Text
                                                style={{
                                                    color: '#FFCC33',
                                                }}>
                                                4.8
                                            </Text>
                                            (362)
                                        </Text>
                                        <Text
                                            style={{
                                                fontWeight: '700',
                                                marginTop: 6,
                                                color: '#000',
                                            }}>
                                            đ 61,777
                                        </Text>
                                    </View>
                                    <IconAntDesign
                                        name="hearto"
                                        size={25}
                                        color="#fff"
                                        style={{
                                            position: 'absolute',
                                            right: 12,
                                            top: 12,
                                        }}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('Product')}>
                                <View
                                    style={{
                                        borderWidth: 0.5,
                                        borderColor: '#DDDDDD',
                                        borderRadius: 12,
                                        width: 140,
                                        marginBottom: 15,
                                        position: 'relative',
                                    }}>
                                    <Image
                                        height={100}
                                        borderTopLeftRadius={12}
                                        borderTopRightRadius={12}
                                        source={{
                                            uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w',
                                        }}
                                    />
                                    <View
                                        style={{
                                            padding: 5,
                                        }}>
                                        <Text
                                            numberOfLines={3}
                                            style={{
                                                fontWeight: 700,
                                                color: '#000',
                                                width: 140,
                                            }}>
                                            Du thuyền ăn tối sang trọng Opulence trên sông Chao Phraya
                                        </Text>
                                        <Text style={{ marginTop: 6 }}>
                                            <IconAntDesign name="star" size={16} color="#FFCC33" />
                                            <Text
                                                style={{
                                                    color: '#FFCC33',
                                                }}>
                                                4.8
                                            </Text>
                                            (362)
                                        </Text>
                                        <Text
                                            style={{
                                                fontWeight: '700',
                                                marginTop: 6,
                                                color: '#000',
                                            }}>
                                            đ 61,777
                                        </Text>
                                    </View>
                                    <IconAntDesign
                                        name="hearto"
                                        size={25}
                                        color="#fff"
                                        style={{
                                            position: 'absolute',
                                            right: 12,
                                            top: 12,
                                        }}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('Product')}>
                                <View
                                    style={{
                                        borderWidth: 0.5,
                                        borderColor: '#DDDDDD',
                                        borderRadius: 12,
                                        width: 140,
                                        marginBottom: 15,
                                        position: 'relative',
                                    }}>
                                    <Image
                                        height={100}
                                        borderTopLeftRadius={12}
                                        borderTopRightRadius={12}
                                        source={{
                                            uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w',
                                        }}
                                    />
                                    <View
                                        style={{
                                            padding: 5,
                                        }}>
                                        <Text
                                            numberOfLines={3}
                                            style={{
                                                fontWeight: 700,
                                                color: '#000',
                                                width: 140,
                                            }}>
                                            Du thuyền ăn tối sang trọng Opulence trên sông Chao Phraya
                                        </Text>
                                        <Text style={{ marginTop: 6 }}>
                                            <IconAntDesign name="star" size={16} color="#FFCC33" />
                                            <Text
                                                style={{
                                                    color: '#FFCC33',
                                                }}>
                                                4.8
                                            </Text>
                                            (362)
                                        </Text>
                                        <Text
                                            style={{
                                                fontWeight: '700',
                                                marginTop: 6,
                                                color: '#000',
                                            }}>
                                            đ 61,777
                                        </Text>
                                    </View>
                                    <IconAntDesign
                                        name="hearto"
                                        size={25}
                                        color="#fff"
                                        style={{
                                            position: 'absolute',
                                            right: 12,
                                            top: 12,
                                        }}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('Product')}>
                                <View
                                    style={{
                                        borderWidth: 0.5,
                                        borderColor: '#DDDDDD',
                                        borderRadius: 12,
                                        width: 140,
                                        marginBottom: 15,
                                        position: 'relative',
                                    }}>
                                    <Image
                                        height={100}
                                        borderTopLeftRadius={12}
                                        borderTopRightRadius={12}
                                        source={{
                                            uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w',
                                        }}
                                    />
                                    <View
                                        style={{
                                            padding: 5,
                                        }}>
                                        <Text
                                            numberOfLines={3}
                                            style={{
                                                fontWeight: 700,
                                                color: '#000',
                                                width: 140,
                                            }}>
                                            Du thuyền ăn tối sang trọng Opulence trên sông Chao Phraya
                                        </Text>
                                        <Text style={{ marginTop: 6 }}>
                                            <IconAntDesign name="star" size={16} color="#FFCC33" />
                                            <Text
                                                style={{
                                                    color: '#FFCC33',
                                                }}>
                                                4.8
                                            </Text>
                                            (362)
                                        </Text>
                                        <Text
                                            style={{
                                                fontWeight: '700',
                                                marginTop: 6,
                                                color: '#000',
                                            }}>
                                            đ 61,777
                                        </Text>
                                    </View>
                                    <IconAntDesign
                                        name="hearto"
                                        size={25}
                                        color="#fff"
                                        style={{
                                            position: 'absolute',
                                            right: 12,
                                            top: 12,
                                        }}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Have_fun')}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: '#000',
                                    fontWeight: '700',
                                    borderWidth: 1,
                                    paddingVertical: 12,
                                    borderRadius: 12,
                                }}>
                                Xem tất cả
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ marginTop: 28 }}>
                        <Text
                            style={{
                                color: '#000',
                                fontSize: 18,
                                fontWeight: '700',
                            }}>
                            Điểm đến gần đây
                        </Text>
                        <ScrollView style={{ marginTop: 24, marginBottom: 12 }} horizontal={true} showsHorizontalScrollIndicator={false}>
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
                                        }}>
                                        <View
                                            style={{
                                                paddingHorizontal: 12,
                                                paddingVertical: 16,
                                            }}>
                                            <Text
                                                numberOfLines={1}
                                                style={{
                                                    color: '#fff',
                                                    fontSize: 16,
                                                    fontWeight: '700',
                                                }}>
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
                                        }}>
                                        <View
                                            style={{
                                                paddingHorizontal: 12,
                                                paddingVertical: 16,
                                            }}>
                                            <Text
                                                numberOfLines={1}
                                                style={{
                                                    color: '#fff',
                                                    fontSize: 16,
                                                    fontWeight: '700',
                                                }}>
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
                                        }}>
                                        <View
                                            style={{
                                                paddingHorizontal: 12,
                                                paddingVertical: 16,
                                            }}>
                                            <Text
                                                numberOfLines={1}
                                                style={{
                                                    color: '#fff',
                                                    fontSize: 16,
                                                    fontWeight: '700',
                                                }}>
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
                                        }}>
                                        <View
                                            style={{
                                                paddingHorizontal: 12,
                                                paddingVertical: 16,
                                            }}>
                                            <Text
                                                numberOfLines={1}
                                                style={{
                                                    color: '#fff',
                                                    fontSize: 16,
                                                    fontWeight: '700',
                                                }}>
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
                                }}>
                                Tất cả điểm đến
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default City;
