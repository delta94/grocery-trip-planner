import {observable, action} from 'mobx';
import firestore from '@react-native-firebase/firestore';
import {Product} from '../../types/Product';

export interface ProductStore {
  products: Product[];
  subscriber: any;

  subscribe: () => void;
  getProductByKey: (key: string) => Product | undefined;
  addProduct: (name: string) => void;
  editProduct: (key: string, name: string) => void;
  deleteProduct: (key: string) => void;
}

export const productStore = observable<ProductStore>(
  {
    products: [],
    subscriber: null,

    addProduct: async (name: string) => {
      firestore().collection('Products').add({
        name,
      });
    },

    editProduct: async (key: string, name: string) => {
      firestore().collection('Products').doc(key).update({
        name,
      });
    },

    deleteProduct: async (key: string) => {
      firestore().collection('Products').doc(key).delete();
    },

    getProductByKey(key: string) {
      return this.products.find((item: Product) => item.key === key);
    },

    subscribe() {
      this.subscriber = firestore()
        .collection('Products')
        .onSnapshot((querySnapshot) => {
          const result: any[] = [];

          querySnapshot.forEach((documentSnapshot) => {
            result.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          this.products = result;
        });
    },
  },
  {
    addProduct: action.bound,
  },
);
