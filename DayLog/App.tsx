import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogContextProvider} from './screens/contexts/LogContext';
import RootStack from './screens/RootStack';

function App() {
  return (
    <NavigationContainer>
      <LogContextProvider>
        <RootStack />
      </LogContextProvider>
    </NavigationContainer>
  );
}

export default App;
