import "./edit-person.css"
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import PersonForm from "../../components/person-form/person-form";
import { People } from "../../interfaces/people.interface";


interface LocationState {
    person: People
}

const EditPerson = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { person } = location.state as LocationState;

    const onFormSubmit = (event: any) => {
        event.preventDefault();
    }

    return <>
        <Button onClick={() => navigate(-1)} variant="dark">Back</Button>
        <div className="edit-form-container">
            <h3>Edit person: {person.name}</h3>
            <div className="form-container">
                <PersonForm person={person} onFormSubmit={onFormSubmit} />
            </div>
        </div>
    </>
}

export default EditPerson;