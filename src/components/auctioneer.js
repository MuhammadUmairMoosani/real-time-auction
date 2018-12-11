import React, {Component} from 'react';
import {TimePicker,TextField,RaisedButton,FlatButton} from 'material-ui';
import { transparent } from 'material-ui/styles/colors';
import * as firebase from 'firebase';


class Auctioneer extends Component {
    constructor() {
        super();
        this.state = {
            itemName:'',
            category:'',
            discription:'',
            image:'',
            firstBidAmount:'',
            timeUntilBid:'',
            phoneNumber:'',
            province:'',
            userUid:''
        }
    }
    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => 
        
        user ? this.setState({userUid:user.uid}) : "")
    }
    onSubmitHandler() {
     if(
        this.state.itemName !== '' &&
        this.state.category !== '' &&
        this.state.discription !== ''  &&
        this.state.image !== '' &&
        this.state.firstBidAmount !== '' &&
        this.state.timeUntilBid !== '' &&
        this.state.phoneNumber !== '' &&
        this.state.province !== '' &&
        this.state.category !== 'selectCategory' &&
        this.state.province !== 'Select province'
    ) {
            let currentTime = new Date()
            if(this.state.timeUntilBid.getTime() >  currentTime.getTime()) {
                let auctionData = {
                    itemName:this.state.itemName ,
                    category:this.state.category ,
                    discription:this.state.discription,
                    image:this.state.image,
                    firstBidAmount:this.state.firstBidAmount,
                    timeUntilBid:this.state.timeUntilBid.getTime(),
                    phoneNumber:this.state.phoneNumber,
                    province:this.state.province,
                    productId:new Date().getUTCMilliseconds(),
                    useruid:this.state.userUid,
                    EndTime:this.state.timeUntilBid.toLocaleTimeString()
                }
           this.props.sendProps.sendProps.sendProps.AuctionDispatch(auctionData)
           this.state.itemName = '';
           this.state.category = 'Select category';
           this.state.discription = '';
           this.state.image = '';
           this.state.firstBidAmount = '';
           this.state.timeUntilBid = '';
           this.state.phoneNumber = '';
           this.state.province = 'Select province';
           this.state.userUid = '' ;
           this.setState({itemName:this.state.itemName})
           alert("Submit successfully")
            } else {
                alert('Current and previous time is not acceptable')
            }         
        } else {
            alert('Please fill out all fields')
        }
    }

    SuccesfullySubmit() {
      //  alert('Your auction is ready to biding');
    }
  
    render() {
       // console.log('hello date',new Date().getUTCMilliseconds())
         //  console.log(this.props.sendProps.sendProps.sendProps.auctionFormState)
        //  console.log(
        //     this.state.itemName,
        //     this.state.category,
        //     this.state.discription,
        //     this.state.image,
        //     this.state.firstBidAmount,
        //     this.state.timeUntilBid,
        //     this.state.phoneNumber,
        //     this.state.province 
        //  )
        return (
            <div className="formDiv">       
            <div>{this.props.sendProps.sendProps.sendProps.auctionFormState.auction ? this.SuccesfullySubmit() : ''}</div>
            <h1 className="fromHead">AUCTION YOUR ITEM</h1>
                <form className="form">
                <table className="table">
                <tbody>
                    <tr>
                        <th>Item name</th>
                        <td><TextField value={this.state.itemName} inputStyle={{textAlign:'center'}} type="text" underlineShow={false} onChange={(value) => this.setState({itemName:value.target.value})}/></td>
                    </tr>
                    <tr>
                        <th>Category</th>
                        <td>
                        <select className="category" value={this.state.category} onChange={(value) => this.setState({category:value.target.value})}>
                        <option value="selectCategory">Select category</option>
                        <option value="mobiles">Mobile</option>
                        <option value="Electronics and home appliances">Electronics & home appliances </option>
                        <option value="vehicles">Vehicle</option>
                        <option value="bikes">Bikes</option>                        
                        <option value="furniture">Furniture</option>                                                                        
                    </select>
                        </td>
                    </tr>
                    <tr>
                        <th>Discription</th>
                        <td><textarea value={this.state.discription} className="textArea" onChange={(value) => this.setState({discription:value.target.value})}></textarea></td>
                    </tr>
                    <tr>
                        <th>Upload Photo</th>
                        <td className="uploadPhotoButton" value={this.state.image} onChange={(value) => this.setState({image:value.target.files[0]})}><FlatButton className="uploadRapperButton" label="Choose an Image" labelPosition="before" containerElement="label"><input type="file" className="uploadPhotoBehind"  /></FlatButton></td>
                    </tr>
                    <tr>
                        <th>First bid amount</th>
                        <td><TextField type="number" value={this.state.firstBidAmount} inputStyle={{textAlign:'center'}} underlineShow={false} onChange={(value) => this.setState({firstBidAmount:value.target.value})}/></td>
                    </tr>
                    <tr>
                        <th>Time until bid</th>
                        <td className="timePicker"><TimePicker autoOk={true} value={this.state.timeUntilBid} underlineShow={false} inputStyle={{textAlign:'center'}} onChange={(empty,value) => this.setState({timeUntilBid:value})}/></td>
                    </tr>
                    <tr>
                        <th>Phone number</th>
                        <td><TextField type="number" underlineShow={false} value={this.state.phoneNumber} inputStyle={{textAlign:'center'}} onChange={(value) => this.setState({phoneNumber:value.target.value})}/></td>
                    </tr>
                    <tr>
                        <th>Province</th>
                        <td>
                        <select className="province" value={this.state.province} onChange={(value) => this.setState({province:value.target.value})}>
                          <option select="province">Select province</option>
                          <option value="karachi">Karachi</option>
                          <option value="lahore">Lahore</option>
                          <option value="islamabad">Islamabad</option>                      
                        </select>
                        </td>
                    </tr>
                    <tr >
                        <td style={{backgroundColor:transparent}}></td>
                        <td  style={{backgroundColor:transparent,float:'right'}} > <RaisedButton  buttonStyle={{backgroundColor:'#f99f2c'}} labelStyle={{color:'#ffffff',fontWeight:'bold'}} onClick={this.onSubmitHandler.bind(this)} label="submit"/></td>
                    </tr>
                    </tbody>
                    </table>      
                </form>
            </div>
        )
    }
}


export default Auctioneer;