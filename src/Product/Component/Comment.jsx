import { View, Text, TouchableOpacity } from 'react-native';
import React, { memo, useEffect, useState } from 'react';

import Stars from 'react-native-stars';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import Config from '../../.env/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Comment = ({ star, navigation, idProduct, evaluate }) => {
    const [comments, setComments] = useState([]);
    // console.log(evaluate);
    useEffect(() => {
        async function fetchData() {
            const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));
            const res = await axios.get(`${Config.API_URL}/api/getAllComment/${idUser}/${idProduct}`);
            setComments(res.data);
        }
        fetchData();
    }, [idProduct]);
    return (
        <View style={{ marginTop: 24 }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        backgroundColor: '#FF5B00',
                        width: 7,
                        borderRadius: 12,
                        height: 24,
                        marginRight: 10,
                    }}
                />
                <Text
                    style={{
                        color: '#000',
                        fontSize: 18,
                        fontWeight: '700',
                    }}
                >
                    Đánh giá
                </Text>
            </View>
            {comments.length !== 0 || (
                <TouchableOpacity style={{ marginTop: 16 }} onPress={() => navigation.navigate('Comment', { idProduct, evaluate })}>
                    <Text
                        style={{
                            color: '#fff',
                            textAlign: 'center',
                            paddingVertical: 12,
                            backgroundColor: '#dedede',
                            fontWeight: '700',
                            fontSize: 15,
                            borderRadius: 12,
                        }}
                    >
                        Thêm bình luận
                    </Text>
                </TouchableOpacity>
            )}
            {comments.length === 0 || (
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 14,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text>
                        <Text
                            style={{
                                fontSize: 40,
                                fontWeight: '700',
                                color: '#000',
                            }}
                        >
                            {star}
                        </Text>
                        <Text
                            style={{
                                fontWeight: '700',
                                fontSize: 20,
                            }}
                        >
                            /
                        </Text>
                        <Text
                            style={{
                                fontWeight: '700',
                                fontSize: 20,
                            }}
                        >
                            5
                        </Text>
                    </Text>
                    <Text>
                        <Stars
                            default={star} // Giá trị mặc định
                            count={5} // Tổng số sao
                            half={true} // Hỗ trợ nửa sao
                            starSize={50} // Kích thước sao
                            disabled={true}
                            fullStar={<IconAntDesign name="star" size={35} color="gold" />}
                            emptyStar={<IconAntDesign name="staro" size={35} color="gold" />}
                            halfStar={<IconFontAwesome5 name="star-half-alt" size={32} color="gold" />}
                            update={(rating) => console.log(rating)} // Callback khi cập nhật
                        />
                    </Text>
                </View>
            )}
            {/* Danh sách các bình luận */}
            {comments.length === 0 || (
                <View style={{ marginTop: 12 }}>
                    {comments.map((comment, index) => (
                        <View key={index} style={{ flexDirection: 'row', marginBottom: 12 }}>
                            <FastImage
                                source={{ uri: `${Config.API_URL}/api/image/${comment.image}` }}
                                resizeMode={FastImage.resizeMode.cover}
                                style={{
                                    height: 40,
                                    width: 40,
                                    borderRadius: 60,
                                }}
                            />
                            <View style={{ flex: 1, marginLeft: 8 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: '#000', fontWeight: '700' }}>{comment.name}</Text>
                                    <Text style={{ color: '#c0c0c0', marginLeft: 8 }}>
                                        {formatDistanceToNow(new Date(comment.time), { addSuffix: true })}
                                    </Text>
                                </View>
                                <View style={{ alignItems: 'flex-start' }}>
                                    <Stars
                                        default={comment.evaluate}
                                        count={5}
                                        half={true}
                                        fullStar={<IconAntDesign name="star" size={15} color="gold" />}
                                        emptyStar={<IconAntDesign name="staro" size={15} color="gold" />}
                                        halfStar={<IconFontAwesome5 name="star-half-alt" size={15} color="gold" />}
                                        disabled={true}
                                    />
                                </View>
                                <Text numberOfLines={2} style={{ color: '#000', marginTop: 8 }}>
                                    {comment.content}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            )}

            {comments.length === 0 || (
                <Text
                    onPress={() => navigation.navigate('Comment', { idProduct, evaluate })}
                    style={{ color: '#000', textAlign: 'center', paddingVertical: 12 }}
                >
                    Xem tất cả <IconEntypo name="chevron-small-down" />
                </Text>
            )}
        </View>
    );
};

export default memo(Comment);
