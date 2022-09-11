import "./edit-person.css"
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import PersonForm from "../../components/person-form/person-form";
import { People } from "../../interfaces/people.interface";
import { useContext, useState } from "react";
import DeletePersonModal from "../../components/delete-person/delete-person";
import Notification from "../../components/toast-notification/toast-notification";
import { searchQueryContext } from "../../contexts/search-query.provider";

interface LocationState {
    person: People
}

const EditPerson = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { person } = location.state as LocationState;

    const { query, list, page} = useContext(searchQueryContext);
    const [searchQuery, setSearchQuery] = query;
    const [savedPeopleList, setSavedPeopleList] = list;
    const [currentPage, setCurrentPage] = page;

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

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
                    navigate(`/people/${result.id}`,
                        { state: { showToastMessage: true, toastMessage: "Person info updated" } })
                }, (error) => {
                    setToastMessage("Error updating person info")
                    setShowToast(true);
                    console.log("error updating", error);
                });
    }

    const onDeletePerson = () => {
        const requestOptions = {
            method: 'DELETE'
        }
        fetch(`http://localhost:4500/people/${person.id}`, requestOptions)
            .then(() => {
                setSavedPeopleList(null);
                setSearchQuery(null);
                setCurrentPage(1);
                navigate("/people",
                    { state: { showToastMessage: true, toastMessage: "Person has been deleted" } })
            }, (error) => {
                setToastMessage("Error deleting person")
                setShowToast(true);
                console.log("error deleting person", error.message)
            })
    }

    const toggleShowDeleteModal = () => {
        setShowDeleteModal(!showDeleteModal);
    }

    const closeNotification = () => {
        setShowToast(false);
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
        {showToast && (
            <div className="notification-toast m-4">
                <Notification
                    showToast={showToast}
                    closeNotification={closeNotification}
                    toastMessage={toastMessage ?? ""}
                />
            </div>
        )}
    </>
}

export default EditPerson;
