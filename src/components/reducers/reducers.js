import * as firebase from 'firebase';
import  '../../firebase/firebase'


const userLogInReducerINITIAL_STATE = {
    signin:false,
}

function userLogInReducer(state = userLogInReducerINITIAL_STATE,action) {
    switch(action.type) {
        case 'SIGNIN':
        return Object.assign({},state,{signin:true});
        case 'LOGOUT':
        return Object.assign({},state,{signin:false});
        default:
        return state;
    }

}

const auctionReducerINITIAL_STATE = {
    auction:false
}
function auctionReducer(state = auctionReducerINITIAL_STATE,action) {
    switch(action.type) {
        case 'AUCTION':
        return Object.assign({},state,{auction:true})
        default:
        return state;
    }
}

const categoryReducerINITIAL_STATE = {
    category:false
}
function categoryReducer(state = categoryReducerINITIAL_STATE,action) {
   // console.log("action",action)
    switch(action.type) {
        case 'CATEGORY':
        return Object.assign({},state,{
            category:true,
            value:action.value,
            auctionWhichState:action.auctionWhichState,
            userUid:action.userUid,
            producId:action.productId,
            image:action.image
        })
        default:
        return state;
    }
}

export {userLogInReducer,auctionReducer,categoryReducer}