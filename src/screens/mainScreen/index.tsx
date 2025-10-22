import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import { useCallback, useState } from 'react';

const { width, height } = Dimensions.get('window');

function MainScreen() {
  const token = 'live_xV34R18tgcXlxQAI4z7wZG0WswJuCQwP3bQFTyQCWpofejlvhcxob0Arj86SCmQA';
  const [imageId, setImageId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [breedName, setBreedName] = useState('');
  const [breedTemperament, setBreedTemperament] = useState('');

  const getInfoBreed = useCallback(async (imageId: string) => {
    try {
      const response = await axios.get(
        `https://api.thedogapi.com/v1/images/${imageId}`,
        {
          headers: {
            'x-api-key': token,
          },
        },
      );
      if (response?.data && response?.data?.breeds?.length > 0) {
        setBreedName(response?.data?.breeds[0]?.name);
        setBreedTemperament(response?.data?.breeds[0]?.temperament);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getUrlPhoto = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://api.thedogapi.com/v1/images/search',
      );
      if (response?.data && response.data.length > 0) {
        setImageUrl(response.data[0]?.url);
        await getInfoBreed(response.data[0]?.id);
        setImageId(response.data[0]?.id);
      }
    } catch (error) {
      console.log(error);
    }
  }, [getInfoBreed]);

  const addImageFavourite = useCallback(async () => {
    try {
      const response = await axios.post(
        'https://api.thedogapi.com/v1/favourites',
        {
          image_id: imageId
        },
        {
          headers: {
            'x-api-key': token,
          }
        }
      )
      console.log(response?.data);
    } catch (error) {
      console.log(error);
    }
  }, [imageId])

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          imageUrl ? { uri: imageUrl } : require('./assets/defaultImage.jpg')
        }
      />
      <View style={styles.infoContainer}>
        {breedName ? (
          <View>
            <Text style={styles.infoHeaderText}>{breedName}</Text>
            <Text style={styles.infoBodyText}>{breedTemperament}</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.infoHeaderText}>Pugs</Text>
            <Text style={styles.infoBodyText}>Info pugs</Text>
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={getUrlPhoto} style={styles.button}>
          <Text>Другое фото</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={addImageFavourite} style={styles.button}>
          <Text>Добавить в избранное</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F8',
  },
  image: {
    alignSelf: 'center',
    width: width * 0.8,
    height: height * 0.4,
    borderRadius: 10,
    marginTop: 100,
  },
  infoContainer: {
    marginTop: 42,
    marginLeft: 36,
    marginRight: 36,
  },
  infoHeaderText: {
    fontSize: 20,
    fontWeight: 700,
  },
  infoBodyText: {
    marginTop: 24,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 36,
    marginRight: 36,
  },
  button: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
});

export default MainScreen;
