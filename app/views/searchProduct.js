import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import axios from "axios";

let notif = [
    {
        typeKamar: 'Single',
        keterangan: 'A room assigned to one person. May have one or more beds.',
        harga:'350000',
        uriGambar: 'http://ct.mywebgrocer.com/legacy/productimagesroot/DJ/6/12346.jpg',
    },
    {
        typeKamar: 'Double',
        keterangan: 'A room assigned to two people. May have one or more beds.',
        harga:'600000',
        uriGambar: "https://setupmyhotel.com/images/Room-Type-Double-Room.jpg",
    },
    {
        typeKamar: 'Suite',
        keterangan: 'A parlour or living room connected with to one or more bedrooms. (A room with one or more bedrooms and a separate living space',
        harga:'1200000',
        uriGambar: "https://setupmyhotel.com/images/Room-Type-suite-Room.jpg",
    },
    {
        typeKamar: 'Cabana',
        keterangan: 'This type of room is always adjoining to the swimming pool or have a private pool attached to the room.',
        harga:'1800000',
        uriGambar: "https://setupmyhotel.com/images/Room-Type-Cabana-Room.jpg",
    },
    {
        typeKamar: 'Villa',
        keterangan: 'A special form of accommodation which can be found in some resort hotels. It is a kind of stand-alone house which gives extra privacy and space to hotel guests. A fully equipped villa contains not only bedrooms and a living room but a private swimming pool, Jacuzzi and balcony. It is suitable for couples, families and large groups.',
        harga:'2500000',
        uriGambar: "https://setupmyhotel.com/images/Room-Type-Villas.jpg",
    }
]

let hasilCari = []

export class searchProduct extends Component {

    updateSearch = search => {
        this.setState({ search });
        this.cariProduct(search)
    };

    constructor(props) {
        super(props);
        this.state = {
            productData: '',
            isLoading : false
        };
        //this.searchProduct('pepsi')
    }

    searchProduct(keyword){ //Api Exceeded
        axios.post('https://api.upcitemdb.com/prod/trial/search',{
            s : keyword
        }).then(function (response) {
            return response.data;
        }).then((responseData) => {
            console.log(responseData);
            this.setState({
                hasilCari : responseData.items,
            })

            for (i = 0 ; i <= this.state.hasilCari.length ; i++) {
                    hasilCari[i].brand = this.state.hasilCari[i].brand
            }

            console.log(hasilCari[0])

        }).catch(function (error) {
            console.log(error.response.data);
            return error.response.data;
        })
    }

    cariProduct(key){
        axios.get('https://api.upcdatabase.org/search/'+key+'/3EA942CE57B85492115229DC7D7ACA6B').then(function (response) {
            this.setState({
                isLoading : true
            })
            return response.data;
        }).then((responseData) => {
            console.log(responseData);

            for (i = 0 ; i <= this.state.hasilCari.length ; i++) {
                hasilCari[i] = this.state.hasilCari[i].title
            }

            this.setState({
                isLoading : false
            })

            console.log(hasilCari[0])
        }).catch(function (error) {
            console.log(error.response.data);
            return error.response.data;
        })
    }

    renderItem = ({ item }) => (
        <View style={{padding:8}}>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('detailKamar',{
                    typeKamar: item.typeKamar,
                    keterangan: item.keterangan,
                    harga: item.harga,
                    gambar : item.uriGambar
                })}
                style={{alignItems:'center',padding:8,backgroundColor: '#ffffff'}}
            >
                <Image style={{width: 128, height: 128}}
                       source={{ uri: item.uriGambar }}
                />
                <View style={{flex:2,padding:4,flexDirection: 'column'}}>
                    <Text style={{fontSize:18,fontWeight: 'bold'}}>{item.typeKamar} </Text>
                    <Text numberOfLines={1} style={{fontSize:18,fontWeight: ''}}>{item.keterangan}</Text>
                    <Text style={{fontSize:18,fontWeight: ''}}>IDR {item.harga}</Text>
                </View>

            </TouchableOpacity>
        </View>
    );

    render() {
        const { search } = this.state;

        return (
            <View style={styles.container}>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={search}
                    platform={"ios"}
                    showLoading={this.state.isLoading}
                />
                {/*<FlatList*/}
                    {/*data={notif}*/}
                    {/*renderItem={this.renderItem}*/}
                    {/*style={{flex:1}}*/}
                {/*/>*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#e1e1e1',
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