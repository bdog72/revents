import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers/rootReducer';

const configureStore = preloadedState => {
    const middleWares = [];
    const middlewareEnhancer = applyMiddleware(...middleWares);

    const storeEnhancers = [middlewareEnhancer];

    const composedEnhancer = composeWithDevTools(...storeEnhancers);

    // prettier-ignore
    const store = createStore(
        rootReducer,
        preloadedState,
        composedEnhancer
    )

    if (process.env.NODE_ENV !== 'production') {
        if (module.hotm) {
            module.hot.accept('../reducers/rootReducer.js', () => {
                const newRootReducer = require('../reducers/rootReducer')
                    .default;
                store.replaceReducer(newRootReducer);
            });
        }
    }

    return store;
};

export default configureStore;
