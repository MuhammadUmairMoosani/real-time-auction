import AuctionAction from '../actions/actions';
import * as firebase from 'firebase'; 

export default class AuctionMiddleWare {
    static userSignUp(email,pass,name) {
        return (dispatch) => {
            firebase.auth().createUserWithEmailAndPassword(email,pass).then( () => {
                firebase.database().ref(`user/${firebase.auth().currentUser.uid}`).set({
                    UserName:name,
                    UserPass:pass,
                    UserEmail:email,
                    UserUid:firebase.auth().currentUser.uid
                })
                dispatch(AuctionAction.userLogInAction())
            }).catch((message) => alert(message));
        }
    }
    
    static userLogIn(email,pass) {
        return (dispatch) => {
            firebase.auth().signInWithEmailAndPassword(email,pass).then( () => {
                dispatch(AuctionAction.userLogInAction())  
            }).catch((message) => alert(message))
        }
        
    }
    static auctionMiddle(data) {
       return (dispatch) => {
         console.log('data',data)
        firebase.database().ref(`AuctionItems/${data.useruid}/${data.productId}`).set(data);
        firebase.storage().ref(`AuctionItems/${data.useruid}/${data.productId}`).put(data.image).then((a)=> {
            firebase.database().ref(`AuctionItems/${data.useruid}/${data.productId}`).update({imageurl:a.downloadURL});
            firebase.database().ref(`AuctionItems/${data.useruid}/${data.productId}/bid`).push({bidAmound:data.firstBidAmount,userUid:data.useruid});
        });        
           dispatch(AuctionAction.auctionAction())
       }
    }
    static categoryMiddle(value) {
        return (dispatch) => { 
            var getUserUid = [];
            var getProducId = []; 
            firebase.database().ref('AuctionItems').on(
                 'value',snap => {
                  let auctionAllValue = [];
                  let whichNumberAuction = [];
                  let UserUidArray = [];
                  let productId = [];
                  let ImageUrl = [];
                  let val = snap.val();
                  for(let i in val) {
                    Object.values(val[i]).map((values) => { 
                        if(values.category === value ) {
                            auctionAllValue.push(values);
                            whichNumberAuction.push(Object.keys(val[i]));
                            UserUidArray.push(i);
                            productId.push(values.productId)
                            ImageUrl.push(values.imageurl)
                         //   getUserUid.push(i);
                          //  getProducId.push(values.productId)
                          //  console.log(values.productId)
                        } else {
                            auctionAllValue.push(undefined);
                            whichNumberAuction.push(undefined);
                            UserUidArray.push(undefined);
                        }
                        // console.log("A",auctionAllValue);
                        // console.log('B',whichNumberAuction);
                        // console.log('C',UserUidArray)
                        // console.log(values)
                        // console.log(val[i])
                        // console.log(i)
                    })
                }
                dispatch(AuctionAction.categoryAction(auctionAllValue,whichNumberAuction,UserUidArray,productId,ImageUrl))
                     
                 }
            )
        }
    }
}