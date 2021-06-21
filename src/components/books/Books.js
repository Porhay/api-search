import React, { Component } from 'react'
import { SafeAreaView, Image, ActivityIndicator, View, ScrollView, FlatList, Text, Dimensions, TouchableOpacity } from "react-native"
import styles from "./styles";
import axios from "axios";
import { SearchBar } from "react-native-elements";
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'


const Item = ({ title, image, subtitle, price, isbn13 }) => (
    
        <View style={styles.item}>
            <Image
                style={styles.image}
                source={{ uri: image }}
            />
            <View style={styles.generalInfo}>

                <Text style={styles.title}>{title}</Text>
                <Text style={styles.additionalInfo}>{subtitle}</Text>
                <Text style={styles.additionalInfo}>{price}</Text>
            </View>
        </View>
    
);

export default class Books extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            search: "",
            isLoading: false,
            isOpenDetails: false,
            currentBook: "",
        }

    }

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={
            () => {
                this.setState({ isOpenDetails: true })
                this.openDetails(item.isbn13)
            }
            
        }>
            <Item 
                title={item.title} image={item.image} 
                subtitle={item.subtitle} price={item.price} 
                isbn13={item.isbn13} />
        </TouchableOpacity>
    );



    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: "#CED0CE",
                    marginHorizontal: '5%'
                }}
            />
        );
    };

    updateSearch = (search) => {
        if (search.length >= 3) {
            this.setState({ isLoading: true })
            axios
                .get(`https://api.itbook.store/1.0/search/${search.trim()}`)
                .then((result) => {
                    this.setState({ books: result.data.books, isLoading: false })
                })

        } else {
            this.setState({books: []})
        }
        this.setState({ search });
    }


    

    

    openDetails = (isbn13) => {
        this.setState({ isLoading: true });
        axios
            .get(`https://api.itbook.store/1.0/books/${isbn13}`)
            .then((res) => {
                const Details = res.data;
                this.setState({
                    currentBook: Details,
                    isLoading: false,
                });
            });
    };

    render() {
        const { isOpenDetails, currentBook, search } = this.state;
        
            return (
                <SafeAreaView style={styles.container}>
                    {
                    // isLoading ? <View style={styles.loading}> <ActivityIndicator size='large' /> </View> :
                    isOpenDetails ?
                        
                        <View>

                            <TouchableOpacity onPress={() => {
                                this.setState({ isOpenDetails: false });
                            }}>
                                <View>
                                    <Text style={styles.detailsBackButton}>
                                        <FontAwesomeIcon icon={faAngleLeft} size={40} color={'black'} />
                                        Back

                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <ScrollView>
                                <View style={styles.scrollViewScreen}>
                                        <View style={styles.detailsImageSection}>
                                            <Image
                                                style={styles.detailsImage}
                                                source={{ uri: currentBook.image }}
                                            />
                                        </View>
                                    
                                     <Text>
                                            {'\n'}Title: {currentBook.title}
                                            {'\n'}Subtitle: {currentBook.subtitle}
                                            {'\n'}Description: {currentBook.desc}
                                            {'\n'}
                                            {'\n'}Authors: {currentBook.authors}
                                            {'\n'}Publisher: {currentBook.publisher}
                                            {'\n'}
                                            {'\n'}Pages: {currentBook.pages}
                                            {'\n'}Year: {currentBook.year}
                                            {'\n'}Rating: {currentBook.rating}
                
                                        </Text>
                                    </View>
                                </ScrollView>

                            </View> : 

                            <View>
                                <SearchBar
                                    placeholder="Type Here..."
                                    onChangeText={this.updateSearch}
                                    value={search}
                                    platform={'ios'}
                                />

                                <FlatList
                                    data={this.state.books}
                                    renderItem={this.renderItem}
                                    keyExtractor={item => item.isbn13}
                                    ItemSeparatorComponent={this.renderSeparator}
                                />
                            </View>

                    }


                </SafeAreaView>
            )
        
        
    }
} 


