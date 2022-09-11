import { RefObject, useContext, useEffect, useRef, useState } from "react";
import "./landing-page.css"
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { People } from "../../interfaces/people.interface";
import AddPerson from "../../components/add-person/add-person";
import Notification from "../../components/toast-notification/toast-notification";
import SearchBar from "../../components/search-form/searchForm";
import { searchQueryContext } from "../../contexts/search-query.provider";

const LandingPageComponent = () => {

    // TODO: add pagination

    const navigate = useNavigate();
    const location = useLocation();
    const locationState = location.state as LocationState ?? {}
    const { showToastMessage, toastMessage } = locationState;

    const { query, list} = useContext(searchQueryContext);
    const [searchQuery, setSearchQuery] = query;
    const [savedPeopleList, setSavedPeopleList] = list;

    const [people, setPeople] = useState<People[]>([]);
    const [filteredPeople, setFilteredPeople] = useState<People[]>([]);
    const [showAddPerson, setShowAddPerson] = useState(false);
    const [showToast, setShowToast] = useState(showToastMessage);

    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch("http://localhost:4500/people")
            .then(res => res.json())
            .then(result => {
                setPeople(result)
                if (searchQuery && savedPeopleList.length && searchRef.current) {
                    searchRef.current.value = searchQuery;
                    setFilteredPeople(savedPeopleList)
                } else
                    setFilteredPeople(result);
            });
    }, [savedPeopleList, searchQuery])

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

    const onInputChangeHandler = (event: any) => {
        const query = event.target.value;
        setFilteredPeople(people.filter(person => person.name.toLowerCase().includes(query.toLowerCase())))
    }

    const onClearSearchInputHandler = (searchRef: RefObject<HTMLInputElement>) => {
        if (searchRef.current) {
            searchRef.current.value = "";
        }
        setFilteredPeople(people);
    }

    const storeQueryInContext = () => {
        setSavedPeopleList(filteredPeople);
        searchRef.current && setSearchQuery(searchRef.current.value);
    }

    const goToPerson = (id: string) => {
        navigate(`/people/${id}`);
        storeQueryInContext();
    }

    return <>
        <div className="utilities-container">
            <Button onClick={toggleAddPersonModal} className="add-btn" variant="primary">Add Person</Button>
            <SearchBar
                searchRef={searchRef} 
                onClearSearchInputHandler={onClearSearchInputHandler} 
                onInputChangeHandler={onInputChangeHandler} />
        </div>
        <AddPerson show={showAddPerson} handleClose={toggleAddPersonModal} />
        {!filteredPeople.length && <h4>No data found</h4>}
        {(filteredPeople.length > 0) && <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Date Registered</th>
                    <th>Active Status</th>
                </tr>
            </thead>
            <tbody>
                {filteredPeople && filteredPeople.map((person, index) => {
                    return <tr key={person.id}>
                        <td>{index + 1}</td>
                        <td className="person-name-table" onClick={() => goToPerson(person.id)}>{person.name}</td>
                        <td>{getRegisteredDate(person.registered)}</td>
                        <td>{getActiveStatus(person.isActive)}</td>
                        <td>
                            <Link onClick={storeQueryInContext} to={`/people/${person.id}/edit`} state={{ person: person }}>Edit</Link>
                        </td>
                    </tr>
                })}
            </tbody>
        </Table>}
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
