import { View, Text, Animated } from 'react-native';
import React, { forwardRef, memo } from 'react';

import { CircleFade } from 'react-native-animated-spinkit';
import TabViewExampleHomePage from './TabViewExampleHomePage';

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
                            fontSize: 18,
                            fontWeight: '600',
                            color: active ? '#FF9933' : '#000',
                        }}
                    >
                        Đề xuất
                    </Text>
                    <Text
                        onPress={() => handleChange(false)}
                        style={{
                            fontSize: 18,
                            fontWeight: '600',
                            marginLeft: 30,
                            color: active ? '#000' : '#FF9933',
                        }}
                    >
                        Gần đây
                    </Text>
                </View>
                <View
                    style={{
                        width: 187,
                        height: 4,
                        marginTop: 12,
                    }}
                >
                    <Animated.View
                        style={{
                            height: 4,
                            backgroundColor: '#FF9933',
                            width: 75,
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
