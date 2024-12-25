import React from 'react'
import { enableScreens } from 'react-native-screens';

import { Provider } from 'react-redux'; 
import { store } from './redux/store';

import SocialFinderApp from './SocialFinderApp';

enableScreens();


export default function App() {
  return (
    <Provider store={store}>
      <SocialFinderApp/>
    </Provider>
  );
}

