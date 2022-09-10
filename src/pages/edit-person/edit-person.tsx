import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PersonForm from "../../components/person-form";
import { People } from "../../interfaces/people.interface";


interface LocationState {
    person: People
}

const EditPerson = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { person } = location.state as LocationState;

    const [isFormValid, setIsFormValid] = useState(false);

    const onSaveClick = () => {

    }

    return <>
        <button onClick={() => navigate(-1)}>Go back</button>
        <div className="form-container">
            <PersonForm />
        </div>
        <button disabled={!isFormValid} onClick={onSaveClick}>Save</button>
    </>
}

export default EditPerson;