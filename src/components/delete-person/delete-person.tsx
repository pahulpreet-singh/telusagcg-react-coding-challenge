import "./delete-person.css"
import { Button, Modal } from "react-bootstrap";

const DeletePersonModal = (props: DeletePersonModalProps) => {

    const { show, handleClose, deletePerson } = props;

    return <>
        <Modal show={show} onHide={(handleClose)}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body className="delete-body">
                <div>Are you sure want to delete this person?</div>
                <div><b>Warning! This action is permanent</b></div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleClose}>
                    No
                </Button>
                <Button variant="danger" onClick={deletePerson}>
                    Yes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

interface DeletePersonModalProps {
    show: boolean,
    handleClose: () => void,
    deletePerson: () => void,
}

export default DeletePersonModal;
