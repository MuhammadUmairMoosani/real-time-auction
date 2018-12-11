import { createStore , applyMiddleware,combineReducers} from 'redux';
import { userLogInReducer,auctionReducer,categoryReducer } from '../reducers/reducers';

import  thunk  from 'redux-thunk';

const rootReducer = combineReducers({
    userLogInReducer,
    auctionReducer,
    categoryReducer
})

const middleWare = applyMiddleware(thunk)

const store = createStore(rootReducer,middleWare);


// store.subscribe(() => console.log(store.getState()))

export default store;