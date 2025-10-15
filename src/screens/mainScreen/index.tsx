import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { useState } from 'react';

function MainScreen() {
  const [imageUrl, setImageUrl] = useState('');

  const getUrlPhoto = () => {
    axios
      .get('https://api.thedogapi.com/v1/images/search')
      .then(res => {
        if (res?.data && res.data.length > 0) {
          setImageUrl(res.data[0]?.url);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          imageUrl ? { uri: imageUrl } : require('./assets/defaultImage.jpg')
        }
      />
      <TouchableOpacity onPress={getUrlPhoto} style={styles.button}>
        <Text>Получить картинку</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: '80%',
    aspectRatio: 1,
    borderRadius: 10,
    marginTop: 150,
  },
  button: {
    backgroundColor: 'red',
    alignItems: 'center',
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
});

export default MainScreen;
