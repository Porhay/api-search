import React, { Component } from 'react'
import { SafeAreaView, Image, ActivityIndicator, View, ScrollView, FlatList, Text, Dimensions, TouchableOpacity } from "react-native"
import styles from "./styles";
import axios from "axios";
import { SearchBar, Input, Button, CheckBox  } from "react-native-elements";
import { faAngleLeft, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { AntDesign } from '@expo/vector-icons'


// `www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
// www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

// idDrink  =  11007
// strDrink   =  Margarita
// strDrinkThumb   =   https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg
// strCategory  =  Ordinary Drink


const Item = ({ title, image, category }) => (
    
    <View style={styles.item}>
            <Image
                style={styles.image}
                // source={{ uri: image }}
                source={image === 'null' ? require('../../../assets/no-poster.jpg') : { uri: image }}
            />

        <View style={styles.generalInfo}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.additionalInfo}>{category}</Text>
        </View>
    </View>
    
);

export default class Cocktails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cocktails: [],
            updatedCocktailsList: [],
            search: "",
            isLoading: false,
            isOpenDetails: false,
            isOpenNewItem: false,
            isOpenApiSelector: false,
            currentCocktail: "",
            newCocktailName: "",
            newCocktailCategory: "",
            cocktailsSelector: true,
            moviesSelector: false,
            recipesSelector: false
        }
    }

    apiSearchPicker = () => {
        this.setState({ isOpenApiSelector: true})
    }

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={
            () => {
                this.setState({ isOpenDetails: true })
                this.openDetails(item.idDrink)
            }
            
        }>
            <Swipeable
                renderRightActions={this.rightActions}
                onSwipeableRightOpen={() => {                  
                    const itemToDelete = this.state.cocktails.findIndex(elem => elem.idDrink === item.idDrink)
                    const cocktailsFromState = this.state.cocktails
                    const updatedCocktails = cocktailsFromState.splice(itemToDelete, 1)
                    this.setState(updatedCocktails)
                }}
            >
                <Item 
                    title={item.strDrink} image={item.strDrinkThumb}
                    category={item.strCategory} price={item.price}
                    idDrink={item.idDrink} />
            </Swipeable>
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
            if (this.state.cocktailsSelector) {
                this.setState({ isLoading: true })
                axios
                    .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search.trim()}`)
                    .then((result) => {
                        // this.setState({ cocktails: [], isLoading: false })
                        this.setState({ cocktails: result.data.drinks, isLoading: false })
                    })
            } else {
                this.setState({ cocktails: [] })
            }
        } else {
            this.setState({ cocktails: []})
        }
        this.setState({ search });
    }

    rightActions = () => {
        return (
            <View style={styles.rightAction}>
                <Text style={styles.actionText}>Delete</Text>
            </View>
        )
    }

    openDetails = (idDrink) => {
        this.setState({ isLoading: true })
        axios
            .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
            .then((res) => {
                const details = res.data.drinks[0];
                this.setState({
                    currentCocktail: details,
                    isLoading: false,
                })
            }).catch((err) => {
                console.log(err)
                this.setState({
                    currentCocktail: {
                        idDrink: this.state.newCocktailName + Math.random().toString(12).substring(0),
                        strDrink: this.state.newCocktailName,
                        strCategory: this.state.newCocktailCategory,
                        strDrinkThumb: 'null',
                    },

                    isLoading: false,
                })
            })
        
    };

    newItem = () => {
        this.setState({ isOpenNewItem: false })

        const newElement = {
            idDrink: this.state.newCocktailName + Math.random().toString(12).substring(0),
            strDrink: this.state.newCocktailName,
            strCategory: this.state.newCocktailCategory,
            strDrinkThumb: 'null',
        }
        
        this.setState({ cocktails: [...this.state.cocktails, newElement] })   
    }

    render() {
        const { isOpenApiSelector, isOpenDetails, isOpenNewItem, isLoading, currentCocktail, search } = this.state;
        
        return (
            <SafeAreaView style={styles.container}>
                {
                    isOpenDetails ?
                        isLoading ? <View style={styles.loading}><ActivityIndicator size='large' /></View> :
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
                                                source={currentCocktail.strDrinkThumb === 'null' ? require('../../../assets/no-poster.jpg') : { uri: currentCocktail.strDrinkThumb }}

                                            />
                                        </View>

                                        <Text>
                                            {'\n'}
                                            <Text style={{ fontWeight: '800' }}>Instructions:</Text>
                                            {'\n'}
                                            {currentCocktail.strInstructions}
                                            {'\n'}
                                            {'\n'}
                                            <Text style={{ fontWeight: '800' }}>Ingredients:</Text>
                                            {'\n'}{currentCocktail.strIngredient1}
                                            {'\n'}amount: {currentCocktail.strMeasure1}
                                            {'\n'}
                                            {'\n'}{currentCocktail.strIngredient2}
                                            {'\n'}amount: {currentCocktail.strMeasure2}
                                            {'\n'}
                                            {'\n'}{currentCocktail.strIngredient3}
                                            {'\n'}amount: {currentCocktail.strMeasure3}
                                            {'\n'}
                                            {'\n'}{currentCocktail.strIngredient3}
                                            {'\n'}amount: {currentCocktail.strMeasure3}

                                        </Text>
                                    </View>
                                </ScrollView>

                            </View> :

                        isOpenApiSelector ?
                            <View>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ isOpenApiSelector: false });
                                }}>
                                    <View>
                                        <Text style={styles.detailsBackButton}>
                                            <FontAwesomeIcon icon={faAngleLeft} size={40} color={'black'} />
                                            Back
                                        </Text>
                                    </View>
                                    
                                </TouchableOpacity>
                                {/* multiple choice picker react native */}
                                <View style={{marginTop: 10}}>
                                    <CheckBox
                                        title='Cocktails'
                                        checked={this.state.cocktailsSelector}
                                        onPress={() => {
                                            this.setState({ cocktailsSelector: !this.state.cocktailsSelector })
                                        }}
                                    />

                                    <CheckBox
                                        title='Recipes'
                                        checked={this.state.recipesSelector}
                                        onPress={() => this.setState({ recipesSelector: !this.state.recipesSelector })}
                                    />

                                    <CheckBox
                                        title='Movies'
                                        checked={this.state.moviesSelector}
                                        onPress={() => this.setState({ moviesSelector: !this.state.moviesSelector })}
                                    />

                                </View>
                                
                            </View> :


                        isOpenNewItem ?
                            <View>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ isOpenNewItem: false });
                                }}>
                                    <View>
                                        <Text style={styles.detailsBackButton}>
                                            <FontAwesomeIcon icon={faAngleLeft} size={40} color={'black'} />
                                            Back
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={{ marginTop: 20, marginHorizontal: 10 }}>

                                    <View style={styles.newItemImputView}>
                                        <View style={styles.newItemImput}>
                                            <Input
                                                label='Cocktail Name'
                                                placeholder='Type here...'
                                                onChangeText={value => this.setState({ newCocktailName: value })}
                                            />
                                        </View>

                                    </View>

                                    <View style={styles.newItemImputView}>
                                        <View style={styles.newItemImput}>
                                            <Input
                                                label='Category'
                                                placeholder='Type here...'
                                                onChangeText={value => this.setState({ newCocktailCategory: value })}
                                            />
                                        </View>

                                    </View>
                                    <View style={styles.newItemButton}>
                                        <Button
                                            title="New Cocktail"
                                            onPress={this.newItem}
                                        />
                                    </View>
                                </View>



                            </View>



                            :
                            
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    {/* borderColor: '#EEE', borderWidth: 1 */}

                                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({ isOpenNewItem: true })

                                        }}>
                                            <FontAwesomeIcon icon={faPlusSquare} size={54} color={'green'} />
                                        </TouchableOpacity>
                                    </View>

                                    {/* temporary button */}
                                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                                        <TouchableOpacity
                                            onPress={this.apiSearchPicker}
                                            style={{ marginRight: 12 }}
                                        >
                                            <AntDesign name="checksquareo" size={54} color="black" />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flex: 8 }}>
                                        <SearchBar
                                            placeholder="Type Here..."
                                            onChangeText={this.updateSearch}
                                            value={search}
                                            platform={'ios'}

                                        />
                                    </View>

                                </View>

                                <View style={{ marginBottom: '34%' }}>
                                    <FlatList
                                        data={this.state.cocktails}
                                        renderItem={this.renderItem}
                                        keyExtractor={item => item.idDrink}
                                        ItemSeparatorComponent={this.renderSeparator}
                                    />
                                </View>
                            </View>

                }
            </SafeAreaView>
        )
        
        
    }
} 


