import "./edit-person.css"
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import PersonForm from "../../components/person-form/person-form";
import { People } from "../../interfaces/people.interface";
import { useState } from "react";
import DeletePersonModal from "../../components/delete-person/delete-person";

interface LocationState {
    person: People
}

const EditPerson = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { person } = location.state as LocationState;

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const onFormSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            return;
        }
        const formData = Object.fromEntries(new FormData(form).entries())
        const processedFormData = {...formData, isActive: formData.isActive ? true : false};
        const newData = {...person, ...processedFormData};
        
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newData)
        };
    
        fetch(`http://localhost:4500/people/${newData.id}`, requestOptions)
            .then(response => response.json())
            .then(
                (result) => {
                    navigate(`/people/${result.id}`)
            }, (error) => {
                console.log("error updating", error);
            });
    }

    const onDeletePerson = () => {
        const requestOptions = {
            method: 'DELETE'
        }
        fetch(`http://localhost:4500/people/${person.id}`, requestOptions)
            .then(() => {
                navigate("/people")
            })
            .catch(error => {
                console.log("error deleting person", error.message)
            })
    }

    const toggleShowDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    }

    return <>
        <Button onClick={() => navigate(-1)} variant="dark">Back</Button>
        {person && (
            <>
                <Button className="delete-btn" onClick={toggleShowDeleteModal} variant="danger">Delete person</Button>
                <DeletePersonModal show={showDeleteModal} handleClose={toggleShowDeleteModal} deletePerson={onDeletePerson} />
            </>
        )}
        <div className="edit-form-container">
            <h3>Edit person: {person.name}</h3>
            <div className="form-container">
                <PersonForm person={person} onFormSubmit={onFormSubmit} />
            </div>
        </div>
    </>
}

export default EditPerson;
