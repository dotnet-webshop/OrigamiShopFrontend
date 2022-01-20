import React, {useState} from "react";
import {Button, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";
import {register} from "../../services/api";

function Register(){
    const [confirmPassword,setConfirmPassword] = useState("")
    const initialState = {
        FullName:"",
        Email:"",
        Password:"",
        BillingAddress:"",
        ZipCode:"",
        Country:"",
        Username:"",
    }
    const [newUser,setNewUser] = useState(initialState)
    function  onHandleRegister (e){
        newUser.Username = newUser.Email
        console.log(newUser)
        register({
            Username:newUser.Username,
            Password:newUser.Password
        }).then( res => {
            console.log(res.data)
            if(res.data.success === true)
            {
                console.log("success register")
            }
            else {
                console.log("failed to register")
            }
        }).catch(err => console.log(err))
        clearFields();
        
    }
    const clearFields = () => {
        setNewUser(initialState)
    }
    return (
        <div className="">
            <h2>Register User</h2>
            <div>
                <Label for="fullName">Full Name</Label>
                <Input value={newUser.FullName} name="fullName" 
                       type="text" 
                       onChange={(e)=>setNewUser({...newUser,FullName: e.target.value})}/>
               
                <Label for="email">Email</Label>
                <Input value={newUser.Email} name="email" 
                       onChange={(e)=>setNewUser({...newUser,Email:e.target.value})} 
                       type={"email"}/>
                
                <Label for="billingAddress">Billing Address</Label>
                <Input value={newUser.BillingAddress} 
                       name="billingAddress" 
                       onChange={(e)=>setNewUser({...newUser,BillingAddress:e.target.value})} 
                       type={"text"}/>
                
                <Label for="zipCode">Zip Code</Label>
                <Input value={newUser.ZipCode} name="zipCode" onChange={(e)=>setNewUser({...newUser,ZipCode:e.target.value})} 
                       type={"text"}/>
               
                <Label for="country">Country</Label>
                <Input value={newUser.Country} name="country" onChange={(e)=>setNewUser({...newUser,Country:e.target.value})} 
                       type={"text"}/>

                <Label for="password">Password</Label>
                <Input value={newUser.Password} name="password" 
                       type="password" 
                       onChange={(e)=>setNewUser({...newUser,Password:e.target.value})}/>

                <Label for="confirmPassword">Confirm Password</Label>
                <Input value={confirmPassword} name="confirmPassword" type="password" 
                       onChange={(e)=>setConfirmPassword(e.target.value)}/>

                <small><Link to="/login">Sign in</Link></small>
            </div>
            <Button disabled={confirmPassword !== newUser.Password || newUser.Password === ""} 
                    className="btn btn-primary mt-2" 
                    onClick={(e) => onHandleRegister(e)}>
                Register
            </Button>
        </div>
    )
}
export default Register;