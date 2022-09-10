import { useLocation } from "react-router-dom";
import { People } from "../../interfaces/people.interface";


interface LocationState {
    person: People
}

const EditPerson = () => {

    const location = useLocation();
    const { person } = location.state as LocationState;

    return <h1>
        Edit person {person.name}
    </h1>
}

export default EditPerson;