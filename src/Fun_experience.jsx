import {
    View,
    Text,
    ImageBackground,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    Modal,
} from 'react-native';
import React, { useState } from 'react';

import IconFeather from 'react-native-vector-icons/Feather';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { TextInput } from 'react-native';

const Fun_experience = ({ navigation }) => {
    const [opacity, setOpacity] = useState(0);
    const [opacityBackground, setOpacityBackground] = useState(1);
    const [color1, setColor1] = useState('#fff');
    const [color2, setColor2] = useState('transparent');
    const [bottom, setBottom] = useState(0);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [nameCity, setNameCity] = useState(undefined);
    const [nameCategory, setNameCategory] = useState(undefined);
    const [active, setActive] = useState(undefined);

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

    const handlePressCity = (param) => {
        setNameCity(param);
        setModalVisible1(false);
    };

    const handlePressCategory = (param1, param2) => {
        setNameCategory(param2);
        setActive(param1);
    };

    return (
        <View style={{ position: 'relative' }}>
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
            </View>
            <ScrollView
                onScroll={handleScroll}
                style={{ backgroundColor: '#fff', height: '100%' }}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}>
                <View style={{ position: 'relative' }}>
                    <ImageBackground
                        style={{
                            paddingTop: 100,
                            paddingBottom: 80,
                            paddingHorizontal: 12,
                            position: 'relative',
                            bottom: bottom,
                            opacity: opacityBackground,
                        }}
                        source={{
                            uri: 'https://dep.com.vn/wp-content/uploads/2018/08/khinh-khi-cau_1.jpg',
                        }}>
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: 28,
                                fontWeight: '600',
                            }}>
                            Vui chơi & Trải nghiệm
                        </Text>
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: 14,
                                marginTop: 8,
                            }}>
                            Tour, công viên, spa và nhiều hoạt động khác
                        </Text>
                    </ImageBackground>
                </View>
                <View
                    style={{
                        paddingHorizontal: 20,
                        zIndex: 10,
                        borderRadius: 12,
                        backgroundColor: '#fff',
                        marginTop: -12,
                    }}>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: '700',
                            color: '#000',
                            marginTop: 20,
                        }}>
                        Bạn đang tìm gì?
                    </Text>
                    {/* Điểm đến */}
                    <TouchableWithoutFeedback
                        onPress={() => setModalVisible1(true)}>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#e8e8e8',
                                padding: 14,
                                borderRadius: 12,
                                marginTop: 40,
                            }}>
                            <Text style={{ color: '#000' }}>Điểm đến</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: 8,
                                }}>
                                {nameCity === undefined && (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <IconFeather name="map-pin" size={20} />
                                        <Text style={{ marginLeft: 8 }}>
                                            Điểm đến bất kì
                                        </Text>
                                    </View>
                                )}
                                {nameCity !== undefined && (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <IconFeather
                                            name="map-pin"
                                            size={20}
                                            color="#000"
                                        />
                                        <Text
                                            style={{
                                                marginLeft: 8,
                                                color: '#000',
                                                fontWeight: '500',
                                            }}>
                                            {nameCity}
                                        </Text>
                                    </View>
                                )}
                                <IconEntypo
                                    name="chevron-thin-right"
                                    size={18}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <Modal
                        animationType="slide" // hoặc 'fade', 'none', 'slide'
                        transparent={true} // modal trong suốt hay không
                        visible={modalVisible1} // điều kiện để hiện modal
                        onRequestClose={() => {
                            setModalVisible1(false); // Hành động khi người dùng nhấn nút back trên Android
                        }}>
                        <View
                            style={{
                                backgroundColor: '#fff',
                                flex: 1,
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingHorizontal: 12,
                                    paddingVertical: 4,
                                }}>
                                <IconAntDesign
                                    name="close"
                                    size={22}
                                    onPress={() => setModalVisible1(false)}
                                />
                                <TextInput
                                    placeholder="Tìm thành phồ hoặc điểm đến"
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#f9c197',
                                        borderRadius: 30,
                                        flex: 1,
                                        marginLeft: 14,
                                        paddingHorizontal: 12,
                                        paddingVertical: 6,
                                    }}
                                />
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    paddingHorizontal: 14,
                                    paddingVertical: 24,
                                }}>
                                <Text
                                    style={{
                                        fontWeight: '700',
                                        color: '#000',
                                    }}>
                                    Phổ biến nhất
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                    }}>
                                    <Text
                                        onPress={() => handlePressCity('Tokyo')}
                                        style={{
                                            backgroundColor: '#f5f5f5',
                                            paddingVertical: 8,
                                            paddingHorizontal: 12,
                                            borderRadius: 24,
                                            color: '#000',
                                            marginRight: 8,
                                            marginTop: 12,
                                        }}>
                                        Tokyo
                                    </Text>
                                    <Text
                                        onPress={() => handlePressCity('Osaka')}
                                        style={{
                                            backgroundColor: '#f5f5f5',
                                            paddingVertical: 8,
                                            paddingHorizontal: 12,
                                            borderRadius: 24,
                                            color: '#000',
                                            marginRight: 8,
                                            marginTop: 12,
                                        }}>
                                        Osaka
                                    </Text>
                                    <Text
                                        onPress={() => handlePressCity('Kyoto')}
                                        style={{
                                            backgroundColor: '#f5f5f5',
                                            paddingVertical: 8,
                                            paddingHorizontal: 12,
                                            borderRadius: 24,
                                            color: '#000',
                                            marginRight: 8,
                                            marginTop: 12,
                                        }}>
                                        Kyoto
                                    </Text>
                                    <Text
                                        onPress={() =>
                                            handlePressCity('New York')
                                        }
                                        style={{
                                            backgroundColor: '#f5f5f5',
                                            paddingVertical: 8,
                                            paddingHorizontal: 12,
                                            borderRadius: 24,
                                            color: '#000',
                                            marginRight: 8,
                                            marginTop: 12,
                                        }}>
                                        New York
                                    </Text>
                                    <Text
                                        onPress={() =>
                                            handlePressCity('Los Angeles')
                                        }
                                        style={{
                                            backgroundColor: '#f5f5f5',
                                            paddingVertical: 8,
                                            paddingHorizontal: 12,
                                            borderRadius: 24,
                                            color: '#000',
                                            marginRight: 8,
                                            marginTop: 12,
                                        }}>
                                        Los Angeles
                                    </Text>
                                    <Text
                                        onPress={() => handlePressCity('Seoul')}
                                        style={{
                                            backgroundColor: '#f5f5f5',
                                            paddingVertical: 8,
                                            paddingHorizontal: 12,
                                            borderRadius: 24,
                                            color: '#000',
                                            marginRight: 8,
                                            marginTop: 12,
                                        }}>
                                        Seoul
                                    </Text>
                                    <Text
                                        onPress={() =>
                                            handlePressCity('Singapore')
                                        }
                                        style={{
                                            backgroundColor: '#f5f5f5',
                                            paddingVertical: 8,
                                            paddingHorizontal: 12,
                                            borderRadius: 24,
                                            color: '#000',
                                            marginRight: 8,
                                            marginTop: 12,
                                        }}>
                                        Singapore
                                    </Text>
                                    <Text
                                        onPress={() =>
                                            handlePressCity('Hồng Kông')
                                        }
                                        style={{
                                            backgroundColor: '#f5f5f5',
                                            paddingVertical: 8,
                                            paddingHorizontal: 12,
                                            borderRadius: 24,
                                            color: '#000',
                                            marginRight: 8,
                                            marginTop: 12,
                                        }}>
                                        Hồng Kông
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    {/* Danh mục */}
                    <TouchableWithoutFeedback
                        onPress={() => setModalVisible2(true)}>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#e8e8e8',
                                padding: 14,
                                borderRadius: 12,
                                marginTop: 18,
                            }}>
                            <Text style={{ color: '#000' }}>Danh mục</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: 8,
                                }}>
                                {nameCategory === undefined && (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <IconMaterialIcons
                                            name="category"
                                            size={20}
                                        />
                                        <Text
                                            style={{
                                                marginLeft: 8,
                                            }}>
                                            Danh mục bất kì
                                        </Text>
                                    </View>
                                )}
                                {nameCategory === undefined || (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                        <IconMaterialIcons
                                            name="category"
                                            size={20}
                                            color="#000"
                                        />
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                marginLeft: 8,
                                                color: '#000',
                                                flexBasis: '80%',
                                            }}>
                                            {nameCategory}
                                        </Text>
                                    </View>
                                )}
                                <IconEntypo
                                    name="chevron-thin-right"
                                    size={18}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <Modal
                        animationType="slide" // hoặc 'fade', 'none', 'slide'
                        transparent={true} // modal trong suốt hay không
                        visible={modalVisible2} // điều kiện để hiện modal
                        onRequestClose={() => {
                            setModalVisible2(false); // Hành động khi người dùng nhấn nút back trên Android
                        }}>
                        <View
                            style={{
                                backgroundColor: '#fff',
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                height: 400,
                                borderTopLeftRadius: 12,
                                borderTopEndRadius: 12,
                            }}>
                            <IconAntDesign
                                style={{
                                    position: 'absolute',
                                    top: 15,
                                    left: 15,
                                    zIndex: 1,
                                }}
                                name="close"
                                size={22}
                                onPress={() => setModalVisible2(false)}
                            />
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 16,
                                    fontWeight: '600',
                                    color: '#000',
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#ccc',
                                    paddingVertical: 14,
                                }}>
                                Chọn danh mục
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    padding: 12,
                                }}>
                                <Text
                                    onPress={() =>
                                        handlePressCategory(1, 'Tour')
                                    }
                                    style={{
                                        color:
                                            active === 1 ? '#33FF00' : '#000',
                                        borderWidth: 1,
                                        borderColor:
                                            active === 1 ? '#33FF00' : '#000',
                                        paddingVertical: 8,
                                        paddingHorizontal: 16,
                                        borderRadius: 18,
                                        marginRight: 12,
                                        marginTop: 12,
                                    }}>
                                    Tour
                                </Text>
                                <Text
                                    onPress={() =>
                                        handlePressCategory(2, 'Du thuyền')
                                    }
                                    style={{
                                        color:
                                            active === 2 ? '#33FF00' : '#000',
                                        borderWidth: 1,
                                        borderColor:
                                            active === 2 ? '#33FF00' : '#000',
                                        paddingVertical: 8,
                                        paddingHorizontal: 16,
                                        borderRadius: 18,
                                        marginRight: 12,
                                        marginTop: 12,
                                    }}>
                                    Du thuyền
                                </Text>
                                <Text
                                    onPress={() =>
                                        handlePressCategory(
                                            3,
                                            'Massage & Suối nước nóng'
                                        )
                                    }
                                    style={{
                                        color:
                                            active === 3 ? '#33FF00' : '#000',
                                        borderWidth: 1,
                                        borderColor:
                                            active === 3 ? '#33FF00' : '#000',
                                        paddingVertical: 8,
                                        paddingHorizontal: 16,
                                        borderRadius: 18,
                                        marginRight: 12,
                                        marginTop: 12,
                                    }}>
                                    Massage & Suối nước nóng
                                </Text>
                                <Text
                                    onPress={() =>
                                        handlePressCategory(
                                            4,
                                            'Phiêu lưu & Khám phá thiên nhiên'
                                        )
                                    }
                                    style={{
                                        color:
                                            active === 4 ? '#33FF00' : '#000',
                                        borderWidth: 1,
                                        borderColor:
                                            active === 4 ? '#33FF00' : '#000',
                                        paddingVertical: 8,
                                        paddingHorizontal: 16,
                                        borderRadius: 18,
                                        marginRight: 12,
                                        marginTop: 12,
                                    }}>
                                    Phiêu lưu & Khám phá thiên nhiên
                                </Text>
                                <Text
                                    onPress={() =>
                                        handlePressCategory(5, 'Khách sạn')
                                    }
                                    style={{
                                        color:
                                            active === 5 ? '#33FF00' : '#000',
                                        borderWidth: 1,
                                        borderColor:
                                            active === 5 ? '#33FF00' : '#000',
                                        paddingVertical: 8,
                                        paddingHorizontal: 16,
                                        borderRadius: 18,
                                        marginRight: 12,
                                        marginTop: 12,
                                    }}>
                                    Khách sạn
                                </Text>
                            </View>
                            <View
                                style={{
                                    position: 'absolute',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    bottom: 0,
                                    width: '100%',
                                    paddingHorizontal: 12,
                                    paddingVertical: 15,
                                    borderTopWidth: 1,
                                    borderTopColor: '#ccc',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    onPress={() => {
                                        setActive(undefined);
                                        setNameCategory(undefined);
                                    }}
                                    style={{
                                        textDecorationLine: 'underline',
                                    }}>
                                    Xóa
                                </Text>
                                <Text
                                    onPress={() => setModalVisible2(false)}
                                    style={{
                                        backgroundColor: '#ff5b00',
                                        color: '#fff',
                                        fontWeight: '500',
                                        paddingHorizontal: 18,
                                        paddingVertical: 8,
                                        borderRadius: 8,
                                    }}>
                                    Chọn
                                </Text>
                            </View>
                        </View>
                    </Modal>
                    {/* Btn khám phá */}
                    <View style={{ height: 38 }} />
                    <TouchableWithoutFeedback>
                        <Text
                            style={{
                                backgroundColor: '#ff5c19',
                                color: '#fff',
                                fontWeight: '600',
                                textAlign: 'center',
                                padding: 14,
                                borderRadius: 12,
                            }}>
                            Khám phá
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
        </View>
    );
};

export default Fun_experience;
