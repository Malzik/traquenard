import React from 'react';
import {GameManager} from "./src/components/GameManagerComponent";
import { Provider } from 'react-redux'
import { store } from './src/store/store';
import {GameManagerComponent} from "./src/components/GameManagerComponent";

class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <GameManager />
        </Provider>
    );
  }
}

export default App;
