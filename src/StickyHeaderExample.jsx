import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const StickyHeaderExample = () => {
    const [isSticky, setIsSticky] = useState(false);

    const handleScroll = (event) => {
        const contentOffsetY = event.nativeEvent.contentOffset.y;
        if (contentOffsetY > 100) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    return (
        <ScrollView
            style={styles.container}
            onScroll={handleScroll}
            scrollEventThrottle={16} // Điều chỉnh tốc độ cập nhật scroll
        >
            <View style={[styles.header, isSticky ? styles.stickyHeader : null]}>
                <Text style={styles.headerText}>Sticky Header</Text>
            </View>
            <View style={styles.content}>
                <Text>Content goes here...</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 60,
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stickyHeader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        marginTop: 200,
        padding: 200,
        flex: 1,
    },
});

export default StickyHeaderExample;
