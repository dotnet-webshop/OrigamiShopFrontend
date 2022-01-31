import {Button, Input, Label, Col} from "reactstrap";
import {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {login} from '../../services/api';
import {userActions} from '../../state/actions/index'
import {bindActionCreators} from "redux";
import {useDispatch, useSelector} from "react-redux";
import Form from 'react-bootstrap/Form'

function LoginPage(){
    const [loginCredentials,setLoginCredentials] = useState({
        Password:"",
        Email:""

    })

    const [errorMessage, setErrorMessage] = useState("")
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const {onLogin} = bindActionCreators(userActions,dispatch)
    const [validated, setValidated] = useState(false);
    function  onHandleLogin (e){

  
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

        let pw = loginCredentials.Password
        let mail = loginCredentials.Email
        setLoginCredentials({
            Password:"",
            Email:"",
        }); 
        setValidated(false);
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
        <div >
           <h2 className="text-muted "> &emsp;Login</h2>
            <div className="container px-4 " >
                <div className="row gx-5 " >
                    <div className="col-6" >
                        <div className="p-3 border bg-success p-2 text-dark bg-opacity-10" >
                            <Form  noValidate validated={validated} onSubmit={onHandleLogin}>
                                <Form.Group as={Col} md="6" controlId="validationCustom02">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        aria-describedby="inputGroupPrepend"
                                        value={loginCredentials.Email} name="email" 
                                        onChange={(e)=>setLoginCredentials({...loginCredentials, Email: e.target.value})}
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
                                        value={loginCredentials.Password}
                                        name="password"
                                        onChange={(e)=>setLoginCredentials({...loginCredentials, Password: e.target.value})} />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid Password.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <br />
                                <small><Link to="/register">Register account</Link></small>
                                <h5 className="text-danger">{errorMessage}</h5>
                                <Button className="btn btn-secondary mt-2"  type="submit">Login</Button>
                            </Form>
                           
                        </div>
                    </div>
                    
                </div>
            </div>
            <br />
            <div className="container px-4 " >
                <div className="row gx-5 " >
                    <div className="col-6" >
                        <div className="p-3 border bg-success p-2 text-dark bg-opacity-10" >
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
                                
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
    return (
        (!user.isLoggedIn) ? loginForm() : <Redirect to='/'/>
    )
}
export default LoginPage;
