import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';

const Category = ({ colorAuthenCategory, openModalCategory }, ref) => {
    const [nameCategory, setNameCategory] = useState(undefined);

    useImperativeHandle(ref, () => ({
        getnameCategory() {
            return nameCategory;
        },
        setNameCategory(name) {
            setNameCategory(name);
        },
    }));
    return (
        <TouchableWithoutFeedback onPress={openModalCategory}>
            <View
                style={{
                    borderWidth: 1,
                    borderColor: '#e8e8e8',
                    padding: verticalScale(14), // Responsive padding
                    borderRadius: moderateScale(12), // Responsive border radius
                    marginTop: verticalScale(18), // Responsive margin top
                }}
            >
                <Text style={{ color: '#000' }}>Danh mục</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: verticalScale(8), // Responsive margin top
                    }}
                >
                    {/* Nếu nameCategory chưa được định nghĩa */}
                    {nameCategory === undefined && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <IconMaterialIcons
                                name="category"
                                size={moderateScale(20)} // Responsive icon size
                                color={colorAuthenCategory ? '#c0c0c0' : 'red'}
                            />
                            <Text
                                style={{
                                    marginLeft: scale(8), // Responsive margin left
                                    color: colorAuthenCategory ? '#c0c0c0' : 'red',
                                }}
                            >
                                Danh mục bất kì
                            </Text>
                        </View>
                    )}

                    {/* Nếu nameCategory đã được định nghĩa */}
                    {nameCategory !== undefined && (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}
                        >
                            <IconMaterialIcons
                                name="category"
                                size={moderateScale(20)} // Responsive icon size
                                color="#000"
                            />
                            <Text
                                numberOfLines={1}
                                style={{
                                    marginLeft: scale(8), // Responsive margin left
                                    color: '#000',
                                    flexBasis: '80%',
                                }}
                            >
                                {nameCategory}
                            </Text>
                        </View>
                    )}
                    <IconEntypo name="chevron-thin-right" size={moderateScale(18)} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default forwardRef(Category);
