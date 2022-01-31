import React, { useEffect, useState } from "react"
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import { endpoints, updateById } from "../../services/api"

const EditAdminForm = ({ adminUser }) => {
    const initalUser = {
        Id:"",
        FullName: "",
        PhoneNumber: "",
        Email: ""
    }
    const [editedAdmin, setEditedAdmin] = useState(initalUser)
    const [validated, setValidated] = useState(false)

    useEffect(() => {
        delete adminUser.Orders
        setEditedAdmin({...adminUser})
    }, [adminUser])


    const onFormSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const form = e.currentTarget;
        const isValid = form.checkValidity() ?? false
        setValidated(true)
        if (!isValid) {
            e.preventDefault()
            e.stopPropagation()
            return
        }
        
        if(isValid)
        {
            console.log(editedAdmin)
            updateById(endpoints.customers,adminUser.Id , editedAdmin )
            .then(updatedUser => {
                console.log(updatedUser)
                if (updatedUser !== null)
                {
                    setEditedAdmin(updatedUser)
                    return
                }
                setEditedAdmin(adminUser)
            })
        }
    }

    const isEqual = () => {
        return editedAdmin.FullName === adminUser.FullName &&
            editedAdmin.PhoneNumber === adminUser.PhoneNumber &&
            editedAdmin.Email === adminUser.Email
    }

    return (

        <div className="container px-4 " >
                <div className="row gx-5 " >
                    <div className="col-7" >
                        <div className="p-3 border bg-success p-2 text-dark bg-opacity-10" >
                            <Form noValidate validated={validated} onSubmit={onFormSubmit} style={{ maxWidth: "30em" }}>
                                <Form.Group>
                                    <Form.Label htmlFor="FullName"> Full Name</Form.Label>
                                    <Form.Control 
                                    required name="FullName"
                                    defaultValue={editedAdmin.FullName} 
                                    type="text"
                                    onChange={(e) => setEditedAdmin({ ...editedAdmin, FullName: e.target.value })} />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label 
                                    htmlFor="Email"> Email</Form.Label>
                                    <Form.Control 
                                        required 
                                        name="Email"
                                        defaultValue={editedAdmin.Email} type="email"
                                        onChange={(e) => setEditedAdmin({ ...editedAdmin, Email: e.target.value })} />
                                        <Form.Control.Feedback type="invalid">Enter a valid Email Address</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="PhoneNumber"> Phone</Form.Label>
                                    <Form.Control 
                                        required name="PhoneNumber"
                                        defaultValue={editedAdmin.PhoneNumber} 
                                        type="text"
                                        onChange={(e) => setEditedAdmin({ ...editedAdmin, PhoneNumber: e.target.value })} />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Button type="submit" variant="outline-secondary" className="mt-2 ml-a">Save</Button>
                                </Form.Group>
                            </Form> 
                           
                        </div>
                    </div>
                    
                </div>
            </div>
            
        
    )
}

export default EditAdminForm;