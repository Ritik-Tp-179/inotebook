import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    // let history = useHistory()
    let navigate = useNavigate()
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handlesummit = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json)

        if (json.success) {
            localStorage.setItem("token", json.authToken)
            props.showalert("Logged in successfully ", "success")
            navigate("/")
            // redirect
        }
        else {
            // alert("Invalid creentials")
            props.showalert("Invalid credentials", "danger")
        }
    }

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <h2>Login to use iNotebook</h2>
            {/* <form onSubmit={handlesummit} className='container'>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onchange} aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onchange} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form> */}
            <form  onSubmit={handlesummit} className='container'>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email"  name="email" value={credentials.email} onChange={onchange}  placeholder="Enter email"  aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onchange} placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
