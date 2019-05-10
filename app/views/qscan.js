import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView, RefreshControl, Image,TouchableOpacity,Linking,NavigatorIOS
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from "react-native-vector-icons/FontAwesome";

export class qscan extends Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            productUPC: '',
            qrAvailability: true
        };
    }

    onSuccess = (e) => {
        this.state = {productUPC:e.data};
        console.log(this.state.productUPC)
        this.state.qrAvailability = true
        this.props.navigation.navigate('Detail',{
            productUPC: this.state.productUPC,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:1}}>
                    <QRCodeScanner
                        onRead={this.onSuccess}
                        topViewStyle={styles.zeroContainer}
                        bottomViewStyle={styles.zeroContainer}
                        cameraStyle={{padding:8}}
                        reactivate={this.state.qrAvailability}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
    zeroContainer: {
        height: 0,
        flex: 0,
    },
});