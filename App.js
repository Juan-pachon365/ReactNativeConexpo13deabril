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

  // ✅ estados para la función original
  const [comidaRandom, setComidaRandom] = useState(null);
  const [cargandoRandom, setCargandoRandom] = useState(false);
  const [reto, setReto] = useState(null);
  const [retoCompletado, setRetoCompletado] = useState(false);
  const [puntos, setPuntos] = useState(0);

  const retos = [
    '⏱ Prepara esta comida en menos de 30 minutos',
    '🙈 Hazla sin ver la receta completa',
    '🌶 Agrégale un ingrediente picante que no tenga',
    '🤝 Cocínala con otra persona sin hablar',
    '🔄 Cambia un ingrediente principal por otro',
    '📸 Toma una foto del plato terminado',
    '🌍 Busca de qué país es y aprende algo de su cultura',
    '⭐ Califícala del 1 al 10 y justifica tu nota',
  ];

  // ✅ función para obtener comida random
  const obtenerComidaRandom = () => {
    setCargandoRandom(true);
    setRetoCompletado(false);
    setReto(retos[Math.floor(Math.random() * retos.length)]);
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
      .then(res => res.json())
      .then(data => {
        setComidaRandom(data.meals[0]);
        setCargandoRandom(false);
      })
      .catch(err => {
        console.log(err);
        setCargandoRandom(false);
      });
  };

  const completarReto = () => {
    setRetoCompletado(true);
    setPuntos(prev => prev + 10);
  };

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
      <FlatList
        contentContainerStyle={styles.containerScroll}
        data={[1]}
        keyExtractor={() => 'funcion'}
        renderItem={() => (
          <>
            <Text style={styles.titulo}>🍽 Función Original</Text>

            {/* Puntos acumulados */}
            <View style={styles.puntosContainer}>
              <Text style={styles.puntosTexto}>⭐ Puntos: {puntos}</Text>
            </View>

            <Text style={{ marginBottom: 15, textAlign: 'center' }}>
              Genera una comida y completa el reto para ganar puntos
            </Text>

            <TouchableOpacity
              style={styles.boton}
              onPress={obtenerComidaRandom}
            >
              <Text style={styles.textoBoton}>🎲 Generar comida y reto</Text>
            </TouchableOpacity>

            {cargandoRandom && <Text style={{ marginTop: 10 }}>Cargando...</Text>}

            {comidaRandom && (
              <View style={styles.cardComida}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
                  {comidaRandom.strMeal}
                </Text>

                <Image
                  source={{ uri: comidaRandom.strMealThumb }}
                  style={{ width: 150, height: 150, borderRadius: 10, marginVertical: 10 }}
                />

                <Text>🌎 {comidaRandom.strArea}</Text>
                <Text>🍴 {comidaRandom.strCategory}</Text>

                {/* Reto */}
                {reto && (
                  <View style={styles.retoContainer}>
                    <Text style={styles.retoTitulo}>🎯 Tu reto:</Text>
                    <Text style={styles.retoTexto}>{reto}</Text>

                    {!retoCompletado ? (
                      <TouchableOpacity
                        style={styles.botonReto}
                        onPress={completarReto}
                      >
                        <Text style={styles.textoBoton}>✅ ¡Completé el reto! +10 pts</Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={styles.retoCompletado}>
                        <Text style={{ color: '#27ae60', fontWeight: 'bold', fontSize: 16 }}>
                          🏆 ¡Reto completado!
                        </Text>
                      </View>
                    )}
                  </View>
                )}
              </View>
            )}

            <TouchableOpacity
              style={[styles.botonVolver, { marginBottom: 30 }]}
              onPress={() => setPantalla('menu')}>
              <Text style={styles.textoBoton}>Volver</Text>
            </TouchableOpacity>
          </>
        )}
      />
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
  },
  containerScroll: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  puntosContainer: {
    backgroundColor: '#f39c12',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 15,
  },
  puntosTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardComida: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    width: '100%',
  },
  retoContainer: {
    marginTop: 15,
    backgroundColor: '#eaf4fb',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  retoTitulo: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  retoTexto: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
    color: '#2c3e50',
  },
  botonReto: {
    backgroundColor: '#27ae60',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  retoCompletado: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#d5f5e3',
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
});