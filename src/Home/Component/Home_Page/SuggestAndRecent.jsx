import { View, Text, Animated } from 'react-native';
import React, { forwardRef, memo } from 'react';

import { CircleFade } from 'react-native-animated-spinkit';
import TabViewExampleHomePage from './TabViewExampleHomePage';
import { moderateScale, scale } from 'react-native-size-matters';

const SuggestAndRecent = (
    { active, marginLeft, formatNumberWithCommas, minPricePackage, handlePressProduct, handleChange, pagerViewRef, viewRef },
    ref
) => {
    return (
        <View style={{ marginTop: 28, paddingHorizontal: 16 }}>
            <View
                ref={viewRef}
                style={{
                    backgroundColor: '#fff',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <Text
                        onPress={() => handleChange(true)}
                        style={{
                            fontSize: moderateScale(18),
                            fontWeight: '600',
                            color: active ? '#FF9933' : '#000',
                            paddingHorizontal: moderateScale(4),
                        }}
                    >
                        Đề xuất
                    </Text>
                    <Text
                        onPress={() => handleChange(false)}
                        style={{
                            fontSize: moderateScale(18),
                            fontWeight: '600',
                            marginLeft: 30,
                            color: active ? '#000' : '#FF9933',
                            paddingHorizontal: moderateScale(4),
                        }}
                    >
                        Gần đây
                    </Text>
                </View>
                <View
                    style={{
                        width: scale(160),
                        height: 4,
                        marginTop: 12,
                        // backgroundColor: 'red',
                    }}
                >
                    <Animated.View
                        style={{
                            height: 4,
                            backgroundColor: '#FF9933',
                            width: scale(70),
                            marginLeft: marginLeft,
                        }}
                    />
                </View>
            </View>

            <TabViewExampleHomePage
                formatNumberWithCommas={formatNumberWithCommas}
                minPricePackage={minPricePackage}
                handlePressProduct={handlePressProduct}
                pagerViewRef={pagerViewRef}
                ref={ref}
            />

            <View style={{ alignItems: 'center', paddingBottom: 12 }}>
                <CircleFade size={28} color="#FF9900" />
            </View>
        </View>
    );
};

export default memo(forwardRef(SuggestAndRecent));
