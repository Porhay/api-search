import React, { Component } from 'react'
import { SafeAreaView, Image, ActivityIndicator, View, ScrollView, FlatList, Text, Dimensions, TouchableOpacity } from "react-native"
import styles from "./styles";
import axios from "axios";
import { SearchBar, Input, Button } from "react-native-elements";
import { faAngleLeft, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'


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
                source={{ uri: image }}
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
            search: "",
            isLoading: false,
            isOpenDetails: false,
            currentCocktail: "",
            isOpenNewItem: false,
            newCocktailName: "",
            newCocktailCategory: ""
        }

    }

    renderItem = ({ item }) => (
        <TouchableOpacity onPress={
            () => {
                this.setState({ isOpenDetails: true })
                this.openDetails(item.idDrink)
            }
            
        }>
            <Item 
                title={item.strDrink} image={item.strDrinkThumb}
                category={item.strCategory} price={item.price}
                idDrink={item.idDrink} />
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
                .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search.trim()}`)
                .then((result) => {
                    // this.setState({ cocktails: [], isLoading: false })
                    this.setState({ cocktails: result.data.drinks, isLoading: false })
                })

        } else {
            this.setState({ cocktails: []})
        }
        this.setState({ search });
    }


    openDetails = (idDrink) => {
        this.setState({ isLoading: true });
        axios
            .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
            .then((res) => {
                const Details = res.data.drinks[0];
                this.setState({
                    currentCocktail: Details,
                    isLoading: false,
                });
            });
    };

    newItem = () => {
        console.log(this.state.newCocktailName)
        console.log(this.state.newCocktailCategory)

        
    }

    render() {
        const { isOpenDetails, newCocktailName, newCocktailCategory, isOpenNewItem, isLoading, currentCocktail: currentCocktail, search } = this.state;
        
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
                                                source={{ uri: currentCocktail.strDrinkThumb }}
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

                                <View style={{marginTop: 20, marginHorizontal: 10}}>
                                    
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
                            <View style={{ flexDirection: 'row'}}>
                                {/* borderColor: '#EEE', borderWidth: 1 */}
                                
                                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ isOpenNewItem: true })
                                        
                                    }}>
                                        <FontAwesomeIcon icon={faPlusSquare} size={54} color={'green'} />
                                    </TouchableOpacity>
                                </View>
                                
                                <View style={{flex: 12}}>
                                    <SearchBar
                                        placeholder="Type Here..."
                                        onChangeText={this.updateSearch}
                                        value={search}
                                        platform={'ios'}

                                    />
                                </View>
                                
                            </View>


                            <FlatList
                                data={this.state.cocktails}
                                renderItem={this.renderItem}
                                keyExtractor={item => item.idDrink}
                                ItemSeparatorComponent={this.renderSeparator}
                            />
                        </View>

                }
            </SafeAreaView>
        )
        
        
    }
} 


