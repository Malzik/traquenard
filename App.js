import React from 'react';
import {GameManager} from "./src/components/GameManagerComponent";
import { Provider } from 'react-redux'
import { store } from './src/store/store';
import {GameManagerComponent} from "./src/components/GameManagerComponent";
import SelectPlayerComponent from "./src/components/SelectPlayerComponent";
import SelectDifficultyComponent from "./src/components/SelectDifficultyComponent";
import { SelectDifficulty} from "./src/components/SelectDifficultyComponent";


class App extends React.Component {


  render() {
    return (
        <Provider store={store}>
          <SelectDifficulty />
        </Provider>
    );
  }
}

export default App;
