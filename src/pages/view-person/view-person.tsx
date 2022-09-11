import { useEffect, useState } from "react";
import "./view-person.css"
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { People } from "../../interfaces/people.interface";

const ViewPerson = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const personId = location.pathname.split("/")[2];

    const [person, setPerson] = useState<People>();

    useEffect(() => {
        fetch(`http://localhost:4500/people/${personId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(
                data => {
                    setPerson(data)
                },
                (error) => {
                    console.log("error fetching", error.message)
                }
            )
    }, [personId]);

    const getRegisteredDate = (registeredDate: string) => {
        const dateInUTC = registeredDate.split(" ");
        return new Date(dateInUTC[0]).toDateString().slice(4);
    }

    if (!person?.name) {
        return <>
            <div className="heading">Person not found</div>
        </>
    }

    return <>
        <Container className="button-container">
            <Button variant="dark" onClick={() => navigate("/people")} >Back</Button>
            <Button
                className="edit-button"
                variant="primary"
                onClick={() => navigate(`/people/${person.id}/edit`, { state: { person: person } })}
            >
                Edit
            </Button>
        </Container>
        {person && (
            <Container className="view-container">
                <div className="welcome-container">
                    <span className="welcome-label">{person.name}'s profile</span>
                    <span className="member-label">Member since: {getRegisteredDate(person.registered)}</span>
                </div>
                <div className="heading">
                    Basic Info
                </div>
                <Row className="person-content">
                    <Col className="label">Name: {person.name}</Col>
                    {person.email && <Col className="label">Email: {person.email}</Col>}
                    <Col className="label">Active Status: {person.isActive ? "Is Active" : "Disabled"}</Col>
                </Row>
                {person.about && (
                    <>
                        <div className="heading">
                            About
                        </div>
                        <Row className="person-content">
                            <Col className="label">{person.about}</Col>
                        </Row>
                    </>
                )}
                <div className="heading">
                    Personality traits
                </div>
                <Row className="person-content">
                    <Col className="label">Gender: {person.gender}</Col>
                    <Col className="label">Age: {person.age}</Col>
                    {person.eyeColor && <Col className="label">Eye Color: {person.eyeColor}</Col>}
                </Row>
                {(person.company || person.company || person.company) && (<>
                    <div className="heading">
                        General info
                    </div>
                    <Row className="person-content">
                        {person.company && <Col className="label">Company: {person.company}</Col>}
                        {person.phone && <Col className="label">Phone: {person.phone}</Col>}
                        {person.balance && <Col className="label">Balance: {person.balance}</Col>}
                    </Row></>
                )}
                {(person.latitude && person.longitude) && (
                    <>
                        <div className="heading">
                            Location
                        </div>
                        <Row className="person-content">
                            <a target='_blank' rel="noopener noreferrer" href={`https://maps.google.com/?q=${person.latitude},${person.longitude}`}>Google maps</a>
                        </Row>
                    </>
                )}
                <div className="heading">
                    Tags
                </div>
                <Row className="person-content">
                    <Col className="label">
                        {person.tags && person.tags.map((tag, index, { length }) => {
                            if ((length - 1) === index) {
                                return <>{tag}</>
                            } else {
                                return <>{tag}, {' '}</>
                            }
                        })}
                        {!person.tags && <>No tags</>}
                    </Col>
                </Row>
                <div className="heading">
                    Friends
                </div>
                <Row className="person-content">
                    <Col className="label">
                        {person.friends && person.friends.map((friend, index, { length }) => {
                            if ((length - 1) === index) {
                                return <>{friend.name}</>
                            } else {
                                return <>{friend.name}, {' '}</>
                            }
                        })}
                        {!person.friends && <>No friends</>}
                    </Col>
                </Row>
            </Container>
        )}
    </>
}

export default ViewPerson;
