import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import firebase from '../config/config';

const rrfConfig = {
    userProfile: 'users',
    attachAuthIsReady: true,
    useFirestoreForProfile: true,
    updateProfileOnLogin: false
};

const configureStore = preloadedState => {
    const middleWares = [
        thunk.withExtraArgument({ getFirebase, getFirestore })
    ];
    const middlewareEnhancer = applyMiddleware(...middleWares);

    const storeEnhancers = [middlewareEnhancer];

    const composedEnhancer = composeWithDevTools(
        ...storeEnhancers,
        reactReduxFirebase(firebase, rrfConfig),
        reduxFirestore(firebase)
    );

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
