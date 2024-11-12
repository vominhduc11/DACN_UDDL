import { View, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

import Stars from 'react-native-stars';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Comment = ({ star, comments }) => {
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
            {/* Danh sách các bình luận */}
            <View>
                {comments !== undefined &&
                    comments.map((ele) => (
                        <View
                            key={ele.id}
                            style={{
                                backgroundColor: '#F5F5F5',
                                padding: 15,
                                borderRadius: 12,
                                marginTop: 18,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Text style={{ color: '#000' }}>{ele.name}</Text>
                                <Text>{ele.time}</Text>
                            </View>
                            <Text>
                                <Stars
                                    default={ele.evaluate} // Giá trị mặc định
                                    count={5} // Tổng số sao
                                    half={true} // Hỗ trợ nửa sao
                                    // starSize={50} // Kích thước sao
                                    disabled={true}
                                    fullStar={<IconAntDesign name="star" size={14} color="gold" />}
                                    emptyStar={<IconAntDesign name="staro" size={14} color="gold" />}
                                    halfStar={<IconFontAwesome5 name="star-half-alt" size={14} color="gold" />}
                                    update={(rating) => console.log(rating)} // Callback khi cập nhật
                                />
                            </Text>
                            <Text
                                numberOfLines={5}
                                style={{
                                    color: '#000',
                                    marginTop: 8,
                                }}
                            >
                                {ele.content}
                            </Text>
                        </View>
                    ))}

                <View
                    style={{
                        backgroundColor: '#F5F5F5',
                        padding: 15,
                        borderRadius: 12,
                        marginTop: 18,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Text style={{ color: '#000' }}>Võ Minh Đức</Text>
                        <Text>2/9</Text>
                    </View>
                    <Text>
                        <Stars
                            default={4} // Giá trị mặc định
                            count={5} // Tổng số sao
                            half={true} // Hỗ trợ nửa sao
                            fullStar={<IconAntDesign name="star" size={14} color="gold" />}
                            emptyStar={<IconAntDesign name="staro" size={14} color="gold" />}
                            halfStar={<IconFontAwesome5 name="star-half-alt" size={14} color="gold" />}
                            update={(rating) => console.log(rating)} // Callback khi cập nhật
                        />
                    </Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        textAlignVertical="top"
                        style={{
                            borderWidth: 1,
                            borderColor: '#C0C0C0',
                            marginTop: 12,
                            paddingHorizontal: 12,
                            borderRadius: 12,
                        }}
                        placeholder="Nhập bình luận..."
                    />
                    <TouchableWithoutFeedback>
                        <Text
                            style={{
                                backgroundColor: '#99FF99',
                                textAlign: 'center',
                                alignItems: 'center',
                                color: '#fff',
                                paddingVertical: 12,
                                marginTop: 12,
                                borderRadius: 12,
                            }}
                        >
                            Gửi
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>
    );
};

export default Comment;
