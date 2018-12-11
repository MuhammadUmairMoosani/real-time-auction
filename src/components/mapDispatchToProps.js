import AuctionMiddleWare from './middleWare/middleWare';

export default function mapDispatchToProps(dispatch) {
     return {
         SignInDispatch: (email,pass) => dispatch(AuctionMiddleWare.userLogIn(email,pass)),
         SignUpDispatch: (email,pass,name) => dispatch(AuctionMiddleWare.userSignUp(email,pass,name)),   
         AuctionDispatch: (data) => dispatch(AuctionMiddleWare.auctionMiddle(data)),
         CategoryDispatch: (value) => dispatch(AuctionMiddleWare.categoryMiddle(value)),
         logOut: () => dispatch({type:'LOGOUT'})
     }
        
        }