import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';

export default function App(){
  const [pantalla, setPantalla] = useState('menu');

  // estados para la API
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lista Api
  useEffect(() => {
    if (pantalla === 'api') {
      setLoading(true);
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken')
        .then(res => res.json())
        .then(data => {
          setDatos(data.meals); 
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [pantalla]);

  //menu 
  if(pantalla ==='menu'){
    return(
      <View style={styles.container}>
        <Text style={styles.titulo}>AplicacionConExpo</Text>

        <TouchableOpacity
        style={styles.boton}
        onPress={()=> setPantalla('inicio')}
        >
          <Text style={styles.textoBoton}>inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.boton}
        onPress={() => setPantalla('api')}
        >
          <Text style={styles.textoBoton}>Lista API</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.boton}
        onPress={() =>setPantalla('funcion')}>
          <Text style={styles.textoBoton}>Funcion Original</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //Pantalla inicio
  if(pantalla === 'inicio'){
    return(
      <View style={styles.container}>
        <Text style={styles.titulo}>Pantalla Inicio</Text>
        <Text>Bienvenidos a nuestra aplicacion explora nuestro menu y observa lo que tenemos para ofrecerte</Text>
      
        <TouchableOpacity
        style={styles.botonVolver}
        onPress={()=>setPantalla('menu')}
        >
          <Text style={styles.textoBoton}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //Pantalla API
  if(pantalla ==='api'){
    return(
      <View style={styles.container}>
        <Text style={styles.titulo}>Pantalla Lista Api</Text>

        {loading ? (
          <Text>Cargando...</Text>
        ) : (
          <FlatList
            data={datos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={{ backgroundColor: '#ddd', padding: 10, margin: 5, borderRadius: 5 }}>
                <Text>Comida: {item.strMeal}</Text>
                <Text>Categoria: {item.strCategory}</Text>
                <Text>Pais: {item.strArea}</Text>
                <Text>Receta: {item.strInstructions}</Text>
                <Image source={{ uri: item.strMealThumb }}
                style={{ width: 120, height: 120, borderRadius: 10 }}
                />
              </View>
            )}
          />
        )}

        <TouchableOpacity
        style={styles.botonVolver}
        onPress={()=>setPantalla('menu')}>
          <Text style={styles.textoBoton}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //Pantalla Funcion Original
  if(pantalla === 'funcion'){
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Pantalla Funcion Original</Text>
        <Text>Aqui trabajara El nene</Text>
        <TouchableOpacity
        style={styles.botonVolver}
        onPress={()=>setPantalla('menu')}>
          <Text style={styles.textoBoton}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  boton: {
    backgroundColor: '#3498db',
    padding: 15,
    width: 200,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  botonVolver: {
    backgroundColor: '#2ecc71',
    padding: 15,
    width: 150,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center'
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold'
  }
})