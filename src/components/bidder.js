import React, { Component } from 'react';
import * as firebase from 'firebase';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import { RaisedButton, TextField } from 'material-ui';


class Bidder extends Component {
    constructor() {
        super();
        this.state = {
            displayFlag: false,
            categoryInputValue: "",
            detailData: '',
            bidAmound: '',
            userUid: '',
            userEmail: '',
            bidArray: []
        }
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ userUid: user.uid, userEmail: user.email });
        })
    }
    category() {
        return (
            <div className="bidderMainDiv">
                {/* <div>{firebase.database().ref('AuctionItems').on(
                 'value',snap => {
                  let val = snap.val();
                  for(let i in val) {
                    Object.values(val[i]).map((value) => {
                        console.log(value.category)
                    })
                  }
                     
                 }
            )}</div> */}
                <h1 className="bidderHead">SELECT CATEGORY</h1>
                <p onClick={() => this.onClickCategory('bikes')}><img src={require('./image/bike.png')} /><h2>Bike</h2></p>
                <p onClick={() => this.onClickCategory('Electronics and home appliances')}><img src={require('./image/electronics.png')} className="eleImg" /><h2>Electronics & <br /> Home appliances</h2></p>
                <p onClick={() => this.onClickCategory('furniture')}><img src={require('./image/furniture.png')} /><h2>Furniture</h2></p>
                <p onClick={() => this.onClickCategory('mobiles')}><img src={require('./image/mobile.png')} /><h2>Mobile</h2></p>
                <p onClick={() => this.onClickCategory('vehicles')}><img src={require('./image/vahecal.png')} /><h2>Vehicle</h2></p>
            </div>
        )
    }
    onClickCategory(value) {
        this.props.sendProps.sendProps.sendProps.CategoryDispatch(value)

        this.setState({ displayFlag: true, categoryInputValue: value })
    }
    onBidHandler() {
        let bidding = {
            userEmail: this.state.userEmail,
            userUid: this.state.userUid,
            bidAmound: this.state.bidAmound
        }
        if (this.state.bidAmound === "") {
            alert('Please fill amount of bid')
        } else {
            // firebase.database().ref(`AuctionItems/${this.state.userUid}/${this.state.detailData.productId}/bid`).push(bidding)

            firebase.database().ref(`AuctionItems/${this.state.detailData.useruid}/${this.state.detailData.productId}/bid`).once(
                'value', snap => {
                    var bidArray = [];
                    let value = snap.val()
                    for (let i in value) {
                        bidArray.push(value[i].bidAmound)
                    }
                    
                    if (this.state.bidAmound <= Math.max(...bidArray)) {
                        alert('Please enter greater amount of highest bid')
                        //  this.setState({bidAmound:""});
                    } else {
                        this.setState({ bidAmound: "" })
                        firebase.database().ref(`AuctionItems/${this.state.userUid}/${this.state.detailData.productId}/bid`).push(bidding)
                    }
                }
            )
        }
    }
    detailOFItems(data) {
        let bidTemArray = [];
        let heighestBid = '';
        let DetailData = this.state.detailData;
        // for(let i in DetailData.bid) {
        //     bidTemArray.push(DetailData.bid[i].bidAmound)
        // }
        {
            
            let setInter = setInterval(() => {
                let curTime = new Date().getTime();
                console.log("b",DetailData.timeUntilBid)
                console.log("c",curTime)
                if (DetailData.timeUntilBid > curTime) {
                    console.log('hello')        
                } else {
                    firebase.database().ref(`buySale${this.state.detailData.productId}`).set(this.state.detailData);
                    this.setState({detailData:this.state.detailData})
                  //  firebase.database().ref(`buy/${this.state.detailData.useruid}`).push(this.state.detailData);
                    firebase.database().ref(`AuctionItems/${this.state.detailData.useruid}/${this.state.detailData.productId}`).remove()
                    clearInterval(setInter)
                }
            }, 1000)
            //   if(DetailData.timeUntilBid < curTime) {
            //       console.log('Now time to go action')

            //   }    
            var a = new Date(DetailData.timeUntilBid); console.log("detail data", a)


        }
        firebase.database().ref(`/AuctionItems/${DetailData.useruid}/${DetailData.productId}/bid`).on(
            'value', snap => {
                let value = snap.val();
                for (let i in value) {
                    bidTemArray.push(value[i].bidAmound);
                }
                heighestBid = bidTemArray[bidTemArray.length - 1];
            }
        )

        return (
            // 
            <div>
                <div>
                    <div className="DimageDiv">
                        <h1>IMAGE</h1>
                        <img width="80%" height='80%' src={DetailData.imageurl} /></div>
                    <div className="DTextFeild">$
                  <TextField hintText="Bid" type="number" value={this.state.bidAmound} onChange={(text) => this.setState({ bidAmound: text.target.value })} />
                        <RaisedButton label="bid" primary={true} onClick={this.onBidHandler.bind(this)} />
                        <RaisedButton label="back" style={{ marginLeft: '5px' }} primary={true} onClick={() => this.setState({ displayFlag: true })} />
                    </div>
                </div>
                <div className="DListDiv">
                    <div className="timeDiv">End time of biding {DetailData.EndTime}</div>
                    <div className="firstBidDiv">Starting Bid ${DetailData.firstBidAmount}</div>
                    <div className="bidsDiv">{bidTemArray.map((value, index) => {
                        if (index !== 0) {
                            console.log(DetailData.bid)
                            return <div className="bidValue">$ {value}</div>
                        }
                    })}</div>
                    {console.log(DetailData)}
                    <div className="heigestBid">Heighest bid<b style={{ color: '#ffffff' }}> ${heighestBid}</b></div>
                </div>
            </div>
        )
    }
    listOfItems() {
        return this.props.sendProps.sendProps.sendProps.categoryState ?
            (
                <Table allRowsSelected={false} multiSelectable={false} >
                    <TableHeader displaySelectAll={false} style={{ textAlign: 'center' }} enableSelectAll={false} adjustForCheckbox={false}>
                        <TableRow >
                            <TableHeaderColumn>No</TableHeaderColumn>
                            <TableHeaderColumn>IMAGE</TableHeaderColumn>
                            <TableHeaderColumn>ITEM NAME</TableHeaderColumn>
                            <TableHeaderColumn>FIRST AMOUNT</TableHeaderColumn>
                            <TableHeaderColumn>LAST BID AMOUNT</TableHeaderColumn>
                            <TableHeaderColumn>BIT</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>

                    {this.props.sendProps.sendProps.sendProps.categoryState.category ?
                        <TableBody displayRowCheckbox={false}>
                            {/* {console.log('this is a game',this.props.sendProps.sendProps.sendProps.categoryState.image)} */}
                            {/* {console.log(this.props.sendProps.sendProps.sendProps.categoryState.auctionWhichState)}
              {console.log(this.props.sendProps.sendProps.sendProps.categoryState.userUid)}
              {console.log(this.props.sendProps.sendProps.sendProps.categoryState.value)} */}
                            {this.props.sendProps.sendProps.sendProps.categoryState.value.map((getValue, index) => {
                                // let heighestbid = '';

                                // let  heighestbid = Object.values(getValue.bid).length-1;
                                if (getValue) {
                                    if (getValue.category === this.state.categoryInputValue) {
                                        return <TableRow key={index} style={{ textAlign: 'center' }}>
                                            <TableRowColumn>{index}</TableRowColumn>
                                            <TableRowColumn><img width="80px" height="80px" src={getValue.imageurl} /></TableRowColumn>
                                            <TableRowColumn>{getValue.itemName}</TableRowColumn>
                                            <TableRowColumn>$ {getValue.firstBidAmount}</TableRowColumn>
                                            {/* <TableRowColumn>$ {Object.values(getValue.bid)[heighestbid].bidAmound}</TableRowColumn> */}
                                            <TableRowColumn><RaisedButton onClick={() => this.setState({ displayFlag: 'detail', detailData: getValue })} label="Go to bid" /></TableRowColumn>
                                        </TableRow>
                                    }
                                } else {
                                    console.log('no')
                                }
                            })}
                            <RaisedButton label="Back" primary={true} style={{ marginLeft: '280%', marginTop: 20 }} onClick={() => this.setState({ displayFlag: false })} />
                        </TableBody>
                        : ""}


                </Table>
            ) : <div>No item to bid</div>
    }
    render() {
        return this.state.displayFlag === true ? this.listOfItems() : this.state.displayFlag === false ? this.category() : this.state.displayFlag === 'detail' ? this.detailOFItems() : ""
    }
}


export default Bidder;