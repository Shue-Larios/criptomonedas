import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { Formulario } from './components/Formulario';
import { Header } from './components/Header';
import { Cotizacion } from './components/Cotizacion';



const App = () => {

  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [consultarAPI, setConsultarAPI] = useState(false);
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false)


  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      // evaluamos si consultarAPI esta en true
      if (consultarAPI) {
        // consultar la api para obtener la cotizacion
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const resultado = await axios.get(url);

        // ocultar el spinner y mostrar el resultado
        setCargando(true);
        setTimeout(() => {
          setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
          setConsultarAPI(false);
          setCargando(false);

        }, 2000);


      }
    }
    cotizarCriptomoneda();
  }, [consultarAPI])


  // mostrar el spinner o el resultado
  // ActivityIndicator es el spinner
  const componente = cargando
    ? <ActivityIndicator size='large' color='#5E49E2' />
    : <Cotizacion
      resultado={resultado}
    />



  return (
    <>
      <ScrollView>
        <Header />
        <Image
          style={styles.imagen}
          source={require('./assets/img/cryptomonedas.png')}
        />
        <View style={styles.contenido}>
          <Formulario
            moneda={moneda}
            setMoneda={setMoneda}
            criptomoneda={criptomoneda}
            setCriptomoneda={setCriptomoneda}
            setConsultarAPI={setConsultarAPI}
          />


        </View>
        <View style={{marginTop: 40}}>
          {componente}
        </View>
      </ScrollView>
    </>
  )
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%',
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
