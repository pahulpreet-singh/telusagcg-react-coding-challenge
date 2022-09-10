import React, { useState } from "react";
import "./person-form.css"
import { People } from "../../interfaces/people.interface";
import { Button, Form } from "react-bootstrap";

const PersonForm = (props: PersonFormProps) => {

    const { person, onFormSubmit } = props;

    const [isFormValid, setIsFormValid] = useState(person ? true : false);
    const [name, setName] = useState(person ? person.name : undefined);
    const [age, setAge] = useState(person ? person.age : undefined);
    const [isActive, setIsActive] = useState(person ? person.isActive : undefined);
    const [about, setAbout] = useState(person ? person.about : undefined);
    const [gender, setGender] = useState(person ? person.gender : undefined);

    const validateForm = () => {
        if (name && age && gender) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }

    const onNameChange = (event: any) => {
        if (event.target.value) {
            setName(event.target.value)
            validateForm();
        } else {
            setName("");
            setIsFormValid(false);
        }
    }

    const onActiveStatusChange = (event: any) => {
        setIsActive(event.target.checked);
    }

    const onAgeChange = (event: any) => {
        if (event.target.value) {
            setAge(event.target.value);
            validateForm();
        } else {
            setAge(undefined);
            setIsFormValid(false);
        }
    }

    const onAboutChange = (event: any) => {
        setAbout(event.target.value);
    }

    const onGenderChange = (event: any) => {
        const gender = event.target.value
        if (gender === "male" || gender === "female") {
            setGender(event.target.value);
            validateForm();
        }
    }

    return <div className="form-container">
        <Form onSubmit={onFormSubmit} >
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="text" 
                    required 
                    maxLength={70}
                    value={name}
                    onChange={onNameChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="isActive">
                <Form.Label>Is Active</Form.Label>
                <Form.Check
                    type="switch"
                    id="isActive"
                    checked={isActive}
                    onChange={onActiveStatusChange}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control 
                    type="number" 
                    min={18} 
                    max={110} 
                    placeholder="Minimum age 18" 
                    required
                    value={age}
                    onChange={onAgeChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="about">
                <Form.Label>About</Form.Label>
                <Form.Control 
                    as="textarea" 
                    placeholder="Tell us a little about yourself" 
                    maxLength={250}
                    value={about}
                    onChange={onAboutChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select 
                    required
                    value={gender}
                    onChange={onGenderChange} >
                    {!gender && <option value={0}>Open this select menu</option>}
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Form.Select>
            </Form.Group>
            <Button disabled={!isFormValid} type="submit">Save Person</Button>
        </Form>
    </div>
}

interface PersonFormProps {
    person?: People,
    onFormSubmit?: (event: any) => void,
    children?: React.ReactNode
}

export default PersonForm;
