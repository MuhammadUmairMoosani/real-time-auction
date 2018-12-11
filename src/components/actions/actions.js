
export default class AuctionAction {
  
    static userLogInAction() {
        return {
            type:'SIGNIN'
        }
    }
    static auctionAction() {     
        return {
            type:'AUCTION',
        }
    }
    static categoryAction(a,b,c,d,e) {
        // console.log("a",a)
        // console.log("b",b)
        // console.log("c",c)  
        // console.log("d",d)
        // console.log("e",e)      
        return {
            type:'CATEGORY',
            value: a,
            auctionWhichState: b,
            userUid: c,
            productId:d,
            image:e,

        }
    }
}