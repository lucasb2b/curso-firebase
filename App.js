import { useState, useEffect } from 'react';
import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicator } from 'react-native';
import firebase from './src/firebaseConnection';


export default function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');

  async function logar(){
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then( (value) => {
      alert('Bem-vindo: ' + value.user.email);
      setUser(value.user.email);
    })
    .catch( (error) => {
        alert('Ops! Algo deu errado!');
        return;
    })

    setEmail('');
    setPassword('');
  }

  async function logout(){
    await firebase.auth().signOut();
    setUser("");
    alert("Deslogado com sucesso!");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto1}>Email</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(texto) => setEmail(texto)}
        value={email}
      />
      <Text style={styles.texto}>Senha</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={(texto) => setPassword(texto)}
        value={password}
      />

      <Button
        title="Acessar"
        onPress={logar}
      />

      
      {user.length > 0 ?
      (
        <>
        <Text style={{marginTop: 20, marginBottom: 20, fontSize: 23, textAlign: 'center'}}>
          {user}
        </Text>
        <Button
          title="Deslogar"
          onPress={logout}
        />
        </>
      )  :
      (
        <Text style={{marginTop: 20, marginBottom: 20, fontSize: 23, textAlign: 'center'}}>Nenhum usuário está logado!</Text>
      )}
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    margin: 10
  },
  texto:{
    fontSize: 20
  },
  texto1:{
    fontSize: 20,
    marginTop: 30
  },
  input:{
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#121212',
    height: 45,
    fontSize: 17
  }
})