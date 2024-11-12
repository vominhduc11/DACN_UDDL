import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';

const Category = ({ nameCategory, setModalVisible2 }) => {
    return (
        <TouchableWithoutFeedback onPress={() => setModalVisible2(true)}>
            <View
                style={{
                    borderWidth: 1,
                    borderColor: '#e8e8e8',
                    padding: 14,
                    borderRadius: 12,
                    marginTop: 18,
                }}
            >
                <Text style={{ color: '#000' }}>Danh mục</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 8,
                    }}
                >
                    {nameCategory === undefined && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <IconMaterialIcons name="category" size={20} />
                            <Text
                                style={{
                                    marginLeft: 8,
                                }}
                            >
                                Danh mục bất kì
                            </Text>
                        </View>
                    )}
                    {nameCategory === undefined || (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <IconMaterialIcons name="category" size={20} color="#000" />
                            <Text
                                numberOfLines={1}
                                style={{
                                    marginLeft: 8,
                                    color: '#000',
                                    flexBasis: '80%',
                                }}
                            >
                                {nameCategory}
                            </Text>
                        </View>
                    )}
                    <IconEntypo name="chevron-thin-right" size={18} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Category;
