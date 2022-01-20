import {Button, Input, Label} from "reactstrap";
import {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {login} from '../../services/api';
import {userActions} from '../../state/actions/index'
import {bindActionCreators} from "redux";
import {useDispatch, useSelector} from "react-redux";

function LoginPage(){
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [Username,SetUserName] = useState("")
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const {onLogin} = bindActionCreators(userActions,dispatch)
    function  onHandleLogin (e){
        let pw = password
        let mail = email
        setPassword("")
        setEmail("")
        login(pw,mail).then(
            res => {
                if(res !== undefined)
                {
                    console.log(res.Token)
                    onLogin(res.Token)
                }
            }
        )
    }
    
    const loginForm  = () => (
        <div className="">
            <h2>Login</h2>
            <div>
                <Label for="email">Email</Label>
                <Input value={email} name="email" onChange={(e)=>setEmail(e.target.value)} type={"email"}/>
                <Label for="password">Password</Label>
                <Input value={password} name="password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
                <small><Link to="/register">Register account</Link></small>
            </div>
            <Button className="btn btn-primary mt-2" onClick={(e) => onHandleLogin(e)} >Login</Button>
            <div>
                <small className="mr-2">Admin email: admin@admin.com</small>
                <small>Admin pw: virge3d</small>
            </div>

        </div>
    )
    return (
        (!user.isLoggedIn) ? loginForm() : <Redirect to='/'/>
    )    
}
export default LoginPage;