import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogContextProvider} from './screens/contexts/LogContext';
import {SearchContextProvider} from './screens/contexts/SearchContext';
import RootStack from './screens/RootStack';

function App() {
  return (
    <NavigationContainer>
      <SearchContextProvider>
        <LogContextProvider>
          <RootStack />
        </LogContextProvider>
      </SearchContextProvider>
    </NavigationContainer>
  );
}

export default App;
