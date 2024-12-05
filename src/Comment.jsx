import { View, Text, ScrollView, TextInput, Modal, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import FastImage from 'react-native-fast-image';
import Stars from 'react-native-stars';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { formatDistanceToNow } from 'date-fns';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import TimeAgo from 'react-native-timeago';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from './.env/Config';

const Comment = ({ route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [comments, setComments] = useState([]);
    const [star, setStar] = useState(0);
    const [value, setValue] = useState('');

    const { idProduct, evaluate } = route.params;
    console.log(evaluate);
    // console.log(evaluate);
    const handleSubmitComment = async () => {
        const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));

        try {
            await axios.post(`${Config.API_URL}/api/addComment`, {
                idUser: idUser,
                idProduct: idProduct,
                star: star,
                time: new Date(),
                content: value,
            });
            // console.log(idProduct, star, evaluate);
            await axios.patch(`${Config.API_URL}/api/updateMulti`, {
                idProduct: idProduct,
                star: star,
                evaluate: evaluate,
            });
            await fetchData();
        } catch (error) {
            console.log(error);
        } finally {
            setModalVisible(false);
        }
    };
    async function fetchData() {
        try {
            const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));
            const res = await axios.get(`${Config.API_URL}/api/getAllComment/${idUser}/${idProduct}`);
            setComments(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [idProduct]);
    return (
        <>
            <ScrollView style={{ backgroundColor: '#fff' }}>
                <View>
                    {comments.map((comment, index) => (
                        <View key={index} style={{ flexDirection: 'row', padding: 12 }}>
                            <FastImage
                                source={{
                                    uri: `${Config.API_URL}/api/image/${comment.image}`,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                                style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: 60,
                                }}
                            />
                            <View style={{ flex: 1, marginLeft: 8 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: '#000', fontWeight: '700' }}>{comment.name}</Text>
                                    <Text style={{ color: '#c0c0c0', marginLeft: 8 }}>
                                        <TimeAgo time={comment.time} />
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
                                <Text style={{ color: '#000', marginTop: 8 }}>{comment.content}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 12 }}>
                <FastImage
                    source={{ uri: 'https://png.pngtree.com/png-vector/20240205/ourlarge/pngtree-ice-cream-rainbow-png-image_11615843.png' }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{
                        height: 40,
                        width: 40,
                        borderRadius: 60,
                    }}
                />
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setModalVisible(true)}
                    style={{
                        flex: 1,
                        marginLeft: 12,
                        paddingVertical: 6,
                        paddingHorizontal: 16,
                        color: '#000',
                        borderWidth: 1,
                        borderColor: '#c0c0c0',
                        backgroundColor: '#eee',
                        borderRadius: 28,
                    }}
                >
                    <Text style={{ color: '#c0c0c0' }}>Viết đánh giá ...</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 16,
                            padding: 20,
                            width: '80%',
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                        }}
                    >
                        <Text
                            style={{
                                color: '#000',
                                textAlign: 'center',
                                fontWeight: '700',
                                fontSize: 18,
                                marginBottom: 10,
                            }}
                        >
                            Đánh giá của bạn
                        </Text>

                        <Text
                            style={{
                                color: '#666',
                                textAlign: 'center',
                                fontSize: 14,
                                marginBottom: 20,
                            }}
                        >
                            Hãy chia sẻ cảm nhận của bạn về sản phẩm/dịch vụ!
                        </Text>

                        <View style={{ marginBottom: 20 }}>
                            <Stars
                                count={5}
                                half={true}
                                // starSize={50}
                                fullStar={<IconAntDesign name="star" size={35} color="gold" />}
                                emptyStar={<IconAntDesign name="staro" size={35} color="gold" />}
                                halfStar={<IconFontAwesome5 name="star-half-alt" size={32} color="gold" />}
                                update={(rating) => setStar(rating)}
                            />
                        </View>

                        <TextInput
                            placeholder="Viết đánh giá của bạn..."
                            placeholderTextColor="#aaa"
                            multiline
                            value={value}
                            onChangeText={setValue}
                            style={{
                                width: '100%',
                                height: 80,
                                borderWidth: 1,
                                borderColor: '#ddd',
                                borderRadius: 8,
                                paddingHorizontal: 10,
                                paddingVertical: 5,
                                textAlignVertical: 'top',
                                marginBottom: 20,
                                color: '#000',
                            }}
                        />

                        <TouchableOpacity
                            style={{
                                backgroundColor: '#2196F3',
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                borderRadius: 8,
                                marginBottom: 10,
                            }}
                            onPress={handleSubmitComment}
                        >
                            <Text
                                style={{
                                    color: '#fff',
                                    fontWeight: '600',
                                    textAlign: 'center',
                                }}
                            >
                                Gửi đánh giá
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                borderRadius: 8,
                            }}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={{ color: '#000', fontWeight: '500' }}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default Comment;
