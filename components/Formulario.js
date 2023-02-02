import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
// import axios from 'axios';



export const Formulario = ({
     moneda, 
     criptomoneda, 
     setMoneda, 
     setCriptomoneda,
     setConsultarAPI
     }) => {


    const [criptomonedas, setCriptomonedas] = useState([]);


    // para consultar una api siempre usar un useEffect
    // un Endpoint no es nada mas que el link del api
    useEffect(() => {
        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await axios.get(url)
            // console.log(resultado.data.Data);
            setCriptomonedas(resultado.data.Data);
        }
        consultarApi();
    }, [])

    // almacena lo que el usuario manda
    const obtenerMoneda = moneda => {
        setMoneda(moneda);
    }

    // almacena lo que el usuario manda
    const obtenerCriptomoneda = cripto => {
        setCriptomoneda(cripto);
    }


    const cotizarPrecio = cripto => {
        // El método trim( ) elimina los espacios en blanco en ambos extremos del string.
        if (moneda.trim() === '' || criptomoneda.trim() === '') {
            mostrarAlerta();
            return;
        }
        // ya pasando la validacion
        // console.log('cotizandooo');
        setConsultarAPI(true)
    }

    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Ambos campos son obligatorios',
            [
                { text: 'OK' }
            ]
        )
    }




    return (
        <View>
            <Text style={styles.label} >Formulario</Text>
            <Picker
                itemStyle={{ height: 120 }}
                selectedValue={moneda}
                onValueChange={moneda =>
                    obtenerMoneda(moneda)
                }>
                <Picker.Item label="-- Seleccione -- " value="" />
                <Picker.Item label="Dolar Estadounidense" value="USD" />
                <Picker.Item label="Peso Mexicano" value="MXN" />
                <Picker.Item label="Euro" value="EUR" />
                <Picker.Item label="Libra Esterlina" value="GBP" />
                <Picker.Item label="Lempira Hondureño" value="HNL" />
            </Picker>

            <Text style={styles.label}>Criptomoneda</Text>

            <Picker
                itemStyle={{ height: 120 }}
                selectedValue={criptomoneda}
                onValueChange={cripto =>
                    obtenerCriptomoneda(cripto)

                }>
                <Picker.Item label="-- Seleccione -- " value="" />
                {criptomonedas.map(cripto => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
                ))}
            </Picker>

            <TouchableHighlight
                style={styles.btnCotizar}
                onPress={() => cotizarPrecio()}
            >
                <Text style={styles.textoCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>

    )
}


const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        fontSize: 22,
        marginVertical: 20,
        textTransform: 'uppercase'
    },
    btnCotizar: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20,
        // borderRadius: 20
    },
    textoCotizar: {
        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Lato-Black',
        fontSize: 18,
        textTransform: 'uppercase',

    },
});
