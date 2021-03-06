import React, {useState} from "react";
import {Button, Input, Label, Col} from "reactstrap";
import {Link} from "react-router-dom";
import {register} from "../../services/api";
import Form from 'react-bootstrap/Form'
import { useHistory } from "react-router-dom";

function Register(){
    const [confirmPassword,setConfirmPassword] = useState("")
    const initialState = {
        FullName:"",
        Email:"",
        Password:"",
        BillingAddress:"",
        ZipCode:"",
        Country:"",
        UserName:"",
    }

    const [newUser,setNewUser] = useState(initialState)
    const [validated, setValidated] = useState(false);
    const [message, setMessage] = useState();
    const history = useHistory();


    function  onHandleRegister (e){
        newUser.UserName = newUser.Email
        setValidated(true);
        e.preventDefault();
        e.stopPropagation();
        const form = e.currentTarget;
        console.log(form.checkValidity())
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
            return
        }
        setValidated(false);
        register({
            Username:newUser.UserName,
            Password:newUser.Password,
            FullName:newUser.FullName,
            Email:newUser.Email,
            BillingAddress:newUser.BillingAddress,
            Country:newUser.Country,
            ZipCode:newUser.ZipCode

        }).then( res => {
            if(res.status === 200)
            {
                setMessage("Successfuly registered user!");
                console.log("success register")

                history.push('/login')
            }
            else {
                setMessage("Failed to register!");
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
            <h2 className="text-muted "> &emsp;Register User</h2>
            <div className="container px-4 " >
                <div className="row gx-5 " >
                    <div className="col-10" >
                        <div className="p-3 border bg-success p-2 text-dark bg-opacity-10" >

                            <Form  className="row g-3" noValidate validated={validated} onSubmit={onHandleRegister}>
                                {/* <Label for="fullName">Full Name</Label> */}
                                {/* <Input value={newUser.FullName} name="fullName"
                                    type="text"
                                    onChange={(e)=>setNewUser({...newUser,FullName: e.target.value})}
                                /> */}

                                <Form.Group as={Col} md="6" controlId="validationCustom01">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        required
                                        placeholder="Enter your Name"
                                        type="text"
                                        value={newUser.FullName} name="fullName"
                                        onChange={(e)=>setNewUser({...newUser,FullName: e.target.value})}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Empty field or Username already in use!
                                        </Form.Control.Feedback>
                                </Form.Group>
                                <br />

                                {/* <Label for="email">Email</Label>
                                <Input value={newUser.Email} name="email"
                                    onChange={(e)=>setNewUser({...newUser,Email:e.target.value})}
                                    type={"email"}
                                /> */}

                                <Form.Group as={Col} md="6" controlId="validationCustom02">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="test@example.com"
                                        aria-describedby="inputGroupPrepend"
                                        value={newUser.Email} name="email"
                                        onChange={(e)=>setNewUser({...newUser,Email:e.target.value})}
                                        required
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                        Please provide a valid Email.
                                        </Form.Control.Feedback>
                                </Form.Group>
                                <br />

                                {/* <Label for="billingAddress">Billing Address</Label>
                                <Input value={newUser.BillingAddress}
                                    name="billingAddress"
                                    onChange={(e)=>setNewUser({...newUser,BillingAddress:e.target.value})}
                                    type={"text"}/> */}

                                <Form.Group as={Col} md="6" controlId="validationCustom03">
                                    <Form.Label>Billing Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={newUser.BillingAddress}
                                        name="billingAddress"
                                        required
                                        onChange={(e)=>setNewUser({...newUser,BillingAddress:e.target.value})} />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your Address.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <br />

                                {/* <Label for="country">Country</Label>
                                <Input value={newUser.Country} name="country" onChange={(e)=>setNewUser({...newUser,Country:e.target.value})}
                                    type={"text"}/> */}
                                <Form.Group as={Col} md="6" controlId="validationCustom05">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        value={newUser.Country} name="country"
                                        onChange={(e)=>setNewUser({...newUser,Country:e.target.value})} />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your Country.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <br />

                                {/* <Label for="password">Password</Label>
                                <Input value={newUser.Password} name="password"
                                    type="password"
                                    onChange={(e)=>setNewUser({...newUser,Password:e.target.value})}/> */}
                                <Form.Group as={Col} md="6" controlId="validationCustom06">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                    type="password"
                                    required
                                    placeholder="Enter password"
                                    value={newUser.Password}
                                    name="password"
                                    onChange={(e)=>setNewUser({...newUser,Password:e.target.value})} />
                                    <Form.Control.Feedback type="invalid">
                                    Passwords must be at least 6 characters that include at least one uppercase ('A'-'Z'),<br />
                                    one digit ('0'-'9'),non alphanumeric character,

                                    </Form.Control.Feedback>
                                </Form.Group>
                                <br />
                                {/* <Label for="confirmPassword">Confirm Password</Label>
                                <Input value={confirmPassword} name="confirmPassword" type="password"
                                    onChange={(e)=>setConfirmPassword(e.target.value)}/> */}
                                <Form.Group as={Col} md="6" controlId="validationCustom07">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password"  placeholder="Confirm password" required value={confirmPassword} name="confirmPassword"
                                    onChange={(e)=>setConfirmPassword(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    Confirmed password must match the password you entered!
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <br />
                                {/* <Label for="zipCode">Zip Code</Label>
                                <Input value={newUser.ZipCode} name="zipCode" onChange={(e)=>setNewUser({...newUser,ZipCode:e.target.value})}
                                    type={"text"}/> */}
                                <Form.Group as={Col} md="3" controlId="validationCustom04">
                                    <Form.Label>Zip Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        value={newUser.ZipCode} name="zipCode"
                                        onChange={(e)=>setNewUser({...newUser,ZipCode:e.target.value})}/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid Zip Code.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <br />

                                <br />
                                <Form.Group className="mb-3">
                                    <Form.Check
                                    required
                                    label="Agree to terms and conditions"
                                    feedback="You must agree before submitting."
                                    feedbackType="invalid"
                                    />
                                </Form.Group>
                                <Button disabled={confirmPassword !== newUser.Password || newUser.Password === ""}
                                    className="btn btn-secondary mt-2 btn-sm" type="submit">
                                Register
                                </Button>
                                {/* <Button disabled={confirmPassword !== newUser.Password || newUser.Password === ""}
                                    className="btn btn-primary mt-2"
                                    onClick={(e) => onHandleRegister(e)}>
                                Register
                                </Button> */}
                                 <br />
                                <small><Link to="/login">Sign in</Link></small>
                            </Form>
                        </div>
                    </div>

                </div>
                <p className="text-danger">{message}</p>

            </div>


        </div>
    )
}
export default Register;
