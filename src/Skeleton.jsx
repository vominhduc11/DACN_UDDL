import { View, Text } from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
// import SkeletonContent from 'react-native-skeleton-content';

const Skeleton = () => {
    return (
        <>
            <SkeletonPlaceholder
                enabled={false}
                borderRadius={4}
                backgroundColor="#e1e1e1" // Màu nền
                highlightColor="#fff" // Màu highlight khi hiển thị skeleton
            >
                {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}> */}
                <View style={{ width: 100, height: 100 }} />
                <View style={{ marginLeft: 20 }}>
                    <Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18, color: 'red' }}>Hello world</Text>
                </View>
                {/* </View> */}
            </SkeletonPlaceholder>
        </>

        // <SkeletonContent
        //     containerStyle={{ flex: 1, width: 300 }}
        //     isLoading={true}
        //     layout={[
        //         { key: 'someId', width: 220, height: 20, marginBottom: 6 },
        //         { key: 'someOtherId', width: 180, height: 20, marginBottom: 6 },
        //     ]}
        // >
        //     <Text style={styles.normalText}>Your content</Text>
        //     <Text style={styles.bigText}>Other content</Text>
        // </SkeletonContent>
    );
};

export default Skeleton;
