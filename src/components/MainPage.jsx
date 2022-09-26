import './MainPage.css';

import { useState } from "react"

import Button from 'react-bootstrap/Button';

import { Form } from './Form';
import { PersonList } from './PersonList';
import { seedPersons } from '../data/Persons';

let nextUid = 1
function getNextUid() {
    return nextUid++
}


const emptyPerson = {
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    nationality: "",
    age: undefined
}


export function MainPage(props) {
    const [detailId, setDetailId] = useState(undefined)
    const [personList, setPersonList] = useState(props.persons)

    // Returns max(id) + 1 from the list, or 1 if the list is empty
    function getNewIdFor(personList) {
        return personList.length ? Math.max(...personList.map(x => x.id)) + 1 : 1
    }

    // Fills the list with seed data (Discards possible existing data)
    function seedPersonList() {
        setDetailId(undefined)
        setPersonList(() => {
            return [...seedPersons]
        })
    }


    const handleSubmitPerson = newValue => {
        setPersonList(oldList => {
            let newList = [...oldList]
            let ix = newList.findIndex(e => e.id === newValue.id)
            if (ix >= 0) {
                setDetailId(undefined)
                newList[ix] = newValue
            } else {
                newValue.id = newValue.id || getNewIdFor(newList)
                setDetailId(undefined)
                newList.push(newValue)
            }
            return newList
        })
    }

    function openAddForm() {
        setDetailId(-1)
    }

    function handleFormClose() {
        setDetailId(undefined)
    }

    function handleRowClick(personId) {
        setDetailId(personId)
    }

    function getFormPerson(id) {
        if (id === undefined) return undefined
        const person = personList.find(x => x.id === id)
        return person ? ({ ...person, uid: getNextUid() }) : { ...emptyPerson }
    }

    const person = getFormPerson(detailId)

    function clearList() {
        setDetailId(undefined)
        setPersonList(() => {
            return []
        })
    }

    return (
        <div className="mainPage">
            <div className="popupBase">
                {person &&
                    <div className="popupForm">
                        <Form
                            person={person}
                            personSaved={handleSubmitPerson}
                            onClose={handleFormClose}
                        />
                    </div>
                }
            </div>
            {personList.length > 0 &&
                <>
                    <div className="flexRowCenter">
                        <Button className="mainButton" onClick={openAddForm}>Add Person</Button>
                        <Button className="mainButton" onClick={clearList}>Clear List</Button>
                    </div>
                    <div className="scrollarea" >
                        <PersonList persons={personList} rowClick={handleRowClick} />
                    </div>
                </>
            }

            {personList.length === 0 &&
                <>
                    <div className="flexRowCenter">
                        <Button className="mainButton" onClick={openAddForm}>Add Person</Button>
                        <Button className="mainButton" onClick={seedPersonList}>Seed List</Button>
                    </div>
                    <h2>There are currently no added persons. You can either
                        click the <strong>Add Person</strong> button to add a new person,
                        or click the <strong>Seed List</strong> button to fill the list with
                        some sample values.</h2>
                </>
            }
        </div>
    )
}
