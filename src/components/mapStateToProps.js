
export default function mapStateToProps(state) {
   // console.log(state.auctionReducer)
    return{
        signInState:state.userLogInReducer,
        auctionFormState:state.auctionReducer,
        categoryState:state.categoryReducer
    }

}