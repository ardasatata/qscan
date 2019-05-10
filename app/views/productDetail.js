import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView, RefreshControl,TouchableOpacity,Image
} from 'react-native';
import axios from "axios";

//import Image from 'react-native-image-progress';
//import * as Progress from 'react-native-progress';

import { Card, Button } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';

async function getProductData(productUPC) {
    try {
        fetch(
            'https://api.upcitemdb.com/prod/trial/lookup?upc='+productUPC ,
        ).then( function (response) {
            return response.data
        }).then((responseData)=>{
            console.log(responseData)
        })
        //let responseJson = await response.json()

        //return responseJson
    } catch (error) {
        console.error(error)
    }
}

export class productDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productUPC: this.props.navigation.state.params.productUPC,
            productData: ''
        };
        //this.fetchProductData(this.state.productUPC)
        this.cariProduct(this.state.productUPC)
    }

    fetchProductData(productUPC){ //api exceeded
        // this.state.productData = getProductData(this.state.productUPC);
        // console.log(this.state.productData);

        axios.get('https://api.upcitemdb.com/prod/trial/lookup?upc='+productUPC).then(function (response) {
            return response.data;
        }).then((responseData) => {
            console.log(responseData.items[0]);
            this.setState({
                namaProduk : responseData.items[0].title,
                deskripsiProduk : responseData.items[0].description,
                UPCProduk : responseData.items[0].upc,
                gambarProduk : responseData.items[0].images[0],

            })
        }).catch(function (error) {
            console.log(error.response.data);
            return error.response.data;
        })
    }

    cariProduct(productUPC){
        axios.get('https://api.upcdatabase.org/product/'+productUPC+'/3EA942CE57B85492115229DC7D7ACA6B').then(function (response) {
            return response.data;
        }).then((responseData) => {
            console.log(responseData);
            this.setState({
                namaProduk : responseData.title,
                deskripsiProduk : responseData.newupc,
                UPCProduk : responseData.upc,
                hargaProduk : responseData.msrp
                //gambarProduk : responseData.items[0].images[0],

            })
        }).catch(function (error) {
            console.log(error.response.data);
            return error.response.data;
        })
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Card
                    title={this.state.namaProduk}
                >
                    <View style={styles.imageCard}>
                        {/*<Image style={{width: 128}}*/}
                               {/*source={{ uri: this.state.gambarProduk }}*/}
                        {/*/>*/}
                        <Image
                            source={require('../../app/assets/images.png')}
                            style={{
                                width: 128,
                                height: 128,
                                padding: 8
                            }}/>
                    </View>
                    <Text>
                        {this.state.deskripsiProduk}
                    </Text>
                    <Text>
                        {this.state.UPCProduk}
                        </Text>
                    <Text style={{marginBottom: 10}}>
                        Price : $ {this.state.hargaProduk}
                        </Text>
                    <Button
                        icon={<Icon name='dollar' color='#ffffff' size={18}/>}
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title=' Buy Now!' />
                </Card>
                <View style={styles.container}>
                    <View style={{flex:1}}>

                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    imageCard :{
        justifyContent: 'center',
        alignItems: 'center',
        padding :8},
    contentContainer: {
        paddingVertical: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff5a3',
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