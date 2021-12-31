const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    priceCard_Container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#78909C',
        padding: 15

    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
    },

    price: {
        fontSize: 29,
        fontWeight: 'bold',
    },

    price_Info: {
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
        color: '#B0BEC5'
    },

    price_Button: {

        width: '90%',
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: '#AA00FF',
        borderRadius: 4,
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'center',

    },

    iconStyle: {

        width: 25,
        height: 25,
        justifyContent: 'flex-start',
        alignItems: 'center',
        tintColor: '#fff'

    },

    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15
    }


});