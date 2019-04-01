import React from 'react';
import index from './store'
import './index.scss';
import App from './containers/App/App';
import {render} from 'react-dom';
import {Provider} from "react-redux";

const store = index();

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

render(<Root />, document.getElementById("root"));
