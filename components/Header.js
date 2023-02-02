import React from 'react'
import { Platform, StyleSheet, Text } from 'react-native';

export const Header = () => (
    <Text style={styles.encabezado}>Criptomonedas</Text>
);

const styles = StyleSheet.create({
    encabezado: {
        // esta linea dice si la plataforma es ios agrega 50 sino agrega 10
        paddingTop: Platform.OS === 'ios' ? 50 : 10,
        //   especificamos el tipo de letra personalizada que queremos pagina de config (react-native.config.js)
        // tiene que ser el nombre igual
        fontFamily: 'Lato-Black',
        backgroundColor: '#5E49E2',
        paddingBottom: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
        color: '#FFF',
        marginBottom: 30
    },
});