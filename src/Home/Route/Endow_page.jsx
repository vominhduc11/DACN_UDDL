import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';

function Endow_page({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    paddingHorizontal: 12,
                    paddingTop: 30,
                    paddingBottom: 15,
                    backgroundColor: '#f5451e',
                    elevation: 5,
                }}
            >
                <Text style={{ fontSize: 24, fontWeight: '700', color: '#fff' }}>Ưu đãi</Text>
                <ScrollView style={{ marginTop: 12 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{
                                paddingHorizontal: 10,
                                paddingVertical: 8,
                                borderWidth: 1,
                                borderColor: '#fff',
                                borderRadius: 28,
                                marginRight: 8,
                                color: '#fff',
                                fontSize: 13,
                            }}
                        >
                            New ZEALAND
                        </Text>
                        <Text
                            style={{
                                paddingHorizontal: 10,
                                paddingVertical: 8,
                                borderWidth: 1,
                                borderColor: '#fff',
                                borderRadius: 28,
                                marginRight: 8,
                                color: '#fff',
                                fontSize: 13,
                            }}
                        >
                            New ZEALAND
                        </Text>
                        <Text
                            style={{
                                paddingHorizontal: 10,
                                paddingVertical: 8,
                                borderWidth: 1,
                                borderColor: '#fff',
                                borderRadius: 28,
                                marginRight: 8,
                                color: '#fff',
                                fontSize: 13,
                            }}
                        >
                            New ZEALAND
                        </Text>
                        <Text
                            style={{
                                paddingHorizontal: 10,
                                paddingVertical: 8,
                                borderWidth: 1,
                                borderColor: '#fff',
                                borderRadius: 28,
                                marginRight: 8,
                                color: '#fff',
                                fontSize: 13,
                            }}
                        >
                            New ZEALAND
                        </Text>
                        <Text
                            style={{
                                paddingHorizontal: 10,
                                paddingVertical: 8,
                                borderWidth: 1,
                                borderColor: '#fff',
                                borderRadius: 28,
                                marginRight: 8,
                                color: '#fff',
                                fontSize: 13,
                            }}
                        >
                            New ZEALAND
                        </Text>
                    </View>
                </ScrollView>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        marginTop: 24,
                        paddingHorizontal: 12,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Product')}>
                        <View
                            style={{
                                borderWidth: 0.5,
                                borderColor: '#DDDDDD',
                                borderRadius: 12,
                                width: 140,
                                marginBottom: 8,
                            }}
                        >
                            <FastImage
                                style={{
                                    height: 100,
                                    borderTopLeftRadius: 12,
                                    borderTopRightRadius: 12,
                                }}
                                source={{
                                    uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w',
                                    priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <View
                                style={{
                                    padding: 5,
                                }}
                            >
                                <Text
                                    numberOfLines={3}
                                    style={{
                                        fontWeight: 700,
                                        color: '#000',
                                        width: 140,
                                    }}
                                >
                                    Du thuyền ăn tối sang trọng Opulence trên sông Chao Phraya
                                </Text>
                                <Text style={{ marginTop: 6 }}>
                                    <IconAntDesign name="star" size={16} color="#FFCC33" />
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
                                        marginTop: 6,
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
                                borderRadius: 12,
                                width: 140,
                                marginBottom: 8,
                            }}
                        >
                            <FastImage
                                style={{
                                    height: 100,
                                    borderTopLeftRadius: 12,
                                    borderTopRightRadius: 12,
                                }}
                                source={{
                                    uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w',
                                    priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <View
                                style={{
                                    padding: 5,
                                }}
                            >
                                <Text
                                    numberOfLines={3}
                                    style={{
                                        fontWeight: 700,
                                        color: '#000',
                                        width: 140,
                                    }}
                                >
                                    Du thuyền ăn tối sang trọng Opulence trên sông Chao Phraya
                                </Text>
                                <Text style={{ marginTop: 6 }}>
                                    <IconAntDesign name="star" size={16} color="#FFCC33" />
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
                                        marginTop: 6,
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
                                borderRadius: 12,
                                width: 140,
                                marginBottom: 8,
                            }}
                        >
                            <FastImage
                                style={{
                                    height: 100,
                                    borderTopLeftRadius: 12,
                                    borderTopRightRadius: 12,
                                }}
                                source={{
                                    uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w',
                                    priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <View
                                style={{
                                    padding: 5,
                                }}
                            >
                                <Text
                                    numberOfLines={3}
                                    style={{
                                        fontWeight: 700,
                                        color: '#000',
                                        width: 140,
                                    }}
                                >
                                    Du thuyền ăn tối sang trọng Opulence trên sông Chao Phraya
                                </Text>
                                <Text style={{ marginTop: 6 }}>
                                    <IconAntDesign name="star" size={16} color="#FFCC33" />
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
                                        marginTop: 6,
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
                                borderRadius: 12,
                                width: 140,
                                marginBottom: 8,
                            }}
                        >
                            <FastImage
                                style={{
                                    height: 100,
                                    borderTopLeftRadius: 12,
                                    borderTopRightRadius: 12,
                                }}
                                source={{
                                    uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w',
                                    priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <View
                                style={{
                                    padding: 5,
                                }}
                            >
                                <Text
                                    numberOfLines={3}
                                    style={{
                                        fontWeight: 700,
                                        color: '#000',
                                        width: 140,
                                    }}
                                >
                                    Du thuyền ăn tối sang trọng Opulence trên sông Chao Phraya
                                </Text>
                                <Text style={{ marginTop: 6 }}>
                                    <IconAntDesign name="star" size={16} color="#FFCC33" />
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
                                        marginTop: 6,
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
                                borderRadius: 12,
                                width: 140,
                                marginBottom: 8,
                            }}
                        >
                            <FastImage
                                style={{
                                    height: 100,
                                    borderTopLeftRadius: 12,
                                    borderTopRightRadius: 12,
                                }}
                                source={{
                                    uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w',
                                    priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <View
                                style={{
                                    padding: 5,
                                }}
                            >
                                <Text
                                    numberOfLines={3}
                                    style={{
                                        fontWeight: 700,
                                        color: '#000',
                                        width: 140,
                                    }}
                                >
                                    Du thuyền ăn tối sang trọng Opulence trên sông Chao Phraya
                                </Text>
                                <Text style={{ marginTop: 6 }}>
                                    <IconAntDesign name="star" size={16} color="#FFCC33" />
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
                                        marginTop: 6,
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
                                borderRadius: 12,
                                width: 140,
                                marginBottom: 8,
                            }}
                        >
                            <FastImage
                                style={{
                                    height: 100,
                                    borderTopLeftRadius: 12,
                                    borderTopRightRadius: 12,
                                }}
                                source={{
                                    uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w',
                                    priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <View
                                style={{
                                    padding: 5,
                                }}
                            >
                                <Text
                                    numberOfLines={3}
                                    style={{
                                        fontWeight: 700,
                                        color: '#000',
                                        width: 140,
                                    }}
                                >
                                    Du thuyền ăn tối sang trọng Opulence trên sông Chao Phraya
                                </Text>
                                <Text style={{ marginTop: 6 }}>
                                    <IconAntDesign name="star" size={16} color="#FFCC33" />
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
                                        marginTop: 6,
                                        color: '#000',
                                    }}
                                >
                                    đ 61,777
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
        </View>
    );
}

export default Endow_page;
