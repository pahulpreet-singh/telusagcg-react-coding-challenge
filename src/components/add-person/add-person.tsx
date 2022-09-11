import { Modal } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import PersonForm from "../person-form/person-form"

const AddPerson = (props: AddPersonProps) => {

    const navigate = useNavigate();

    const onFormSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            return;
        }
        const formData = Object.fromEntries(new FormData(form).entries())

        const processedFormData = {...formData, isActive: formData.isActive ? true : false, registered: new Date().toISOString()};

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(processedFormData)
        };

        fetch(`http://localhost:4500/people/`, requestOptions)
            .then(response => response.json())
            .then(
                (result) => {
                    navigate(`/people/${result.id}`,
                        { state: { showToastMessage: true, toastMessage: "New Person Added" } })
                }, (error) => {
                    console.log("error updating", error);
                });
    }

    return <>
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Person</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PersonForm onFormSubmit={onFormSubmit} />
            </Modal.Body>
        </Modal>
    </>
}

interface AddPersonProps {
    show: boolean,
    handleClose: () => void,
}

export default AddPerson
