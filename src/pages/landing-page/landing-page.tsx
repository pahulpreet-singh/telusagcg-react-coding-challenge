import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { People } from "../../interfaces/people.interface";

const LandingPageComponent = () => {

    // TODO: add pagination

    const [people, setPeople] = useState<People[]>([]);

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

    return <>
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
    </>
}

export default LandingPageComponent;