import { useEffect, useState } from "react";
import "./landing-page.css"
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link, useLocation } from "react-router-dom";
import { People } from "../../interfaces/people.interface";
import AddPerson from "../../components/add-person/add-person";
import Notification from "../../components/toast-notification/toast-notification";

const LandingPageComponent = () => {

    // TODO: add pagination

    const location = useLocation();
    const locationState = location.state as LocationState ?? {}
    const { showToastMessage, toastMessage } = locationState;

    const [people, setPeople] = useState<People[]>([]);
    const [showAddPerson, setShowAddPerson] = useState(false);
    const [showToast, setShowToast] = useState(showToastMessage);

    useEffect(() => {
        fetch("http://localhost:4500/people")
            .then(res => res.json())
            .then(result => {
                setPeople(result)
            });
    }, [])

    const getRegisteredDate = (registeredDate: string) => {
        const dateInUTC = registeredDate.split(" ");
        return new Date(dateInUTC[0]).toDateString().slice(4);
    }

    const getActiveStatus = (isActive: boolean) => {
        return isActive ? "Is Active" : "Disabled";
    }

    const toggleAddPersonModal = () => {
        setShowAddPerson(!showAddPerson);
    }

    const closeNotification = () => {
        setShowToast(false);
        window.history.replaceState({}, document.title)
    };

    return <>
        <Button onClick={toggleAddPersonModal} className="add-btn" variant="primary">Add Person</Button>
        <AddPerson show={showAddPerson} handleClose={toggleAddPersonModal} />
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Date Registered</th>
                    <th>Active Status</th>
                </tr>
            </thead>
            <tbody>
                {people && people.map((person, index) => {
                    return <tr key={person.id}>
                        <td>{index+1}</td>
                        <td>{person.name}</td>
                        <td>{getRegisteredDate(person.registered)}</td>
                        <td>{getActiveStatus(person.isActive)}</td>
                        <td>
                            <Link to={`/people/${person.id}/edit`} state={{ person: person }}>Edit</Link>
                        </td>
                    </tr>
                })}
            </tbody>
        </Table>
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

interface LocationState {
    showToastMessage?: boolean,
    toastMessage?: String,
}

export default LandingPageComponent;