import {Button, Input, Label, Col} from "reactstrap";
import {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {login} from '../../services/api';
import {userActions} from '../../state/actions/index'
import {bindActionCreators} from "redux";
import {useDispatch, useSelector} from "react-redux";
import Form from 'react-bootstrap/Form'

function LoginPage(){
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [Username,SetUserName] = useState("")
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const {onLogin} = bindActionCreators(userActions,dispatch)
    const [validated, setValidated] = useState(false);
    function  onHandleLogin (e){
        let pw = password
        let mail = email
        setPassword("")
        setEmail("")
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
        }
        setValidated(true);
        login(pw,mail).then(
            res => {
                if (res !== undefined) {
                    console.log(res.Token)
                    onLogin(res.Token)
                } else {
                    setErrorMessage('Error logging in!')
                }
            }
        )
    }

    const loginForm  = () => (
        <div className="">
            <h2>Login</h2>
            <div>
                <Form  noValidate validated={validated} >

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            aria-describedby="inputGroupPrepend"
                            value={email} name="email" onChange={(e)=>setEmail(e.target.value)}
                            required
                            />
                            <Form.Control.Feedback type="invalid">
                            Please provide a valid Email.
                            </Form.Control.Feedback>
                    </Form.Group>
                    <br />

                    <Form.Group as={Col} md="6" controlId="validationCustom06">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            required
                            value={password}
                            name="password"
                            onChange={(e)=>setPassword(e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <br />
                    <small><Link to="/register">Register account</Link></small>
                    <h5 className="text-danger">{errorMessage}</h5>
                    <Button className="btn btn-primary mt-2" onClick={(e) => onHandleLogin(e)} >Login</Button>
                </Form>
            </div>
             {/* <div>
                <Label for="email">Email</Label>
                <Input value={email} name="email" onChange={(e)=>setEmail(e.target.value)} type={"email"}/>
                <Label for="password">Password</Label>
                <Input value={password} name="password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
                <small><Link to="/register">Register account</Link></small>
                <h5 className="text-danger">{errorMessage}</h5>
            </div>
            <Button className="btn btn-primary mt-2" onClick={(e) => onHandleLogin(e)} >Login</Button>
            <div className="mt-5">
                <div className="row">
                    <small className="col"><b> Admin email</b> admin@admin.com</small>
                </div>
                <div className="row">
                    <small className="col"> <b> Admin password</b> virge3d</small>
                </div>
                <div className="row mt-2">
                    <small className="col"><b> User email</b> user@user.com</small>
                </div>
                <div className="row">
                    <small className="col"> <b> User password</b> virge3d</small>
                </div>
            </div> */}
        </div>
    )
    return (
        (!user.isLoggedIn) ? loginForm() : <Redirect to='/'/>
    )
}
export default LoginPage;
