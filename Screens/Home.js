import React, {useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchProducts} from '../redux/ProductSlice';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  console.log(JSON.stringify(products));

  useEffect(() => {
    // Fetch products when the component mounts
    dispatch(fetchProducts());
  }, [dispatch]);

  const renderProductItem = ({item}) => (
    <View>
      <Text>{item.title}</Text>
      {/* You can display other product details as well */}
    </View>
  );

  return (
    <View>
      {products.data ? (
        <FlatList
          data={products.data}
          renderItem={renderProductItem}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <Text>No products available.</Text>
      )}
    </View>
  );
};

export default Home;
