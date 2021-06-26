import { StyleSheet, Dimensions } from "react-native"



const colorScheme = {
    bg: 'white',
    color: 'black'
}

export default StyleSheet.create({
    container: {
        
        backgroundColor: colorScheme.bg,        
    },
    
    // item: {
    //     // flex: 1,
    //     padding: 20,
    //     backgroundColor: colorScheme.bg,
    //     flexDirection: 'column',
    //     alignItems: 'center',
    //     transform: [{translateY}],
    // },

    title: {
        fontSize: 28,
    },

    image: {
        width: 190,
        height: 280,
        borderRadius: 10,
    },

    generalInfo: {
        // flex: 10,
        
        marginHorizontal: 10,
        paddingTop: 15,
    },

    additionalInfo: {
        marginTop: 6,
        fontSize: 16,
    },

    detailsBackButton: {
        fontSize: 40,
        fontWeight:'800'
    },

    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorScheme.bg,
        color: colorScheme.color
    },
    
    scrollViewScreen: {
        paddingHorizontal: 13,
        paddingTop: 10,
        paddingBottom: 60,
        backgroundColor: colorScheme.bg
        
    },

    detailsImageSection: {
        alignItems: 'center',
    },

    detailsImage: {
        width: 250,
        height: 340,

    },

    newItemImputView: {
        flexDirection: 'row',
        
    },

    newItemImput: {
        flex: 8, 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingTop: 10,
        
    },

    newItemButton: {
        marginTop: 10,
        marginHorizontal: 8
    },

    
    rightAction: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'red',

    },

    actionText: {
        color: '#fff',
        padding: 20,
        textAlign: 'right'
    },
})