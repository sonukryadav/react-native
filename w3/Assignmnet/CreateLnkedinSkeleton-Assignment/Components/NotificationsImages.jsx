import React from 'react';
import {View, Image, StyleSheet } from 'react-native';

const NotificationsImages = ({ item }) => {
    const { uri, w = 60, h = 60, r = 30 } = item;
    return (
        <View style={styles.view0}>
            <Image source={{
                uri: uri
            }}
                style={[styles.Img1, {width: w, height: h, borderRadius: r}]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    view0: {
        flex:0,
    },
    Img1: {
    }
});

export default NotificationsImages;
