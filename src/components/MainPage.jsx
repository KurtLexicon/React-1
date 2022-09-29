import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Form } from "./Form";
import { PersonList } from "./PersonList";
import "./MainPage.css";

let nextUid = 1;
function getNextUid() {
  return nextUid++;
}

const emptyPerson = {
  id: 0,
  first_name: "",
  last_name: "",
  email: "",
  nationality: "",
  age: undefined,
};

const NO_PERSON = undefined;
const NEW_PERSON = -1;

export function MainPage(props) {
  const [formPersonId, setFormPersonId] = useState(undefined);
  const [personList, setPersonList] = useState([]);

  // Returns max(id) + 1 from the list, or 1 if the list is empty
  function getNewIdFor(personList) {
    return personList.length ? Math.max(...personList.map((x) => x.id)) + 1 : 1;
  }

  // Fills the list with seed data (Discards possible existing data)
  function seedPersonList() {
    setFormPersonId(NO_PERSON);
    setPersonList(() => {
      return [...props.seedPersons];
    });
  }

  const handleSubmitPerson = (newValue) => {
    setPersonList((oldList) => {
      let newList = [...oldList];
      let ix = newList.findIndex((e) => e.id === newValue.id);
      if (ix >= 0) {
        newList[ix] = newValue;
      } else {
        newValue.id = newValue.id || getNewIdFor(newList);
        newList.push(newValue);
      }
      setFormPersonId(NO_PERSON);
      return newList;
    });
  };

  function openAddForm() {
    setFormPersonId(NEW_PERSON);
  }

  function closeForm() {
    setFormPersonId(NO_PERSON);
  }

  function handleRowClick(personId) {
    setFormPersonId(personId);
  }

  function getFormPerson(id) {
    if (id === NO_PERSON) return undefined;
    const person = personList.find((x) => x.id === id);
    return person ? { ...person, uid: getNextUid() } : { ...emptyPerson };
  }

  function clearList() {
    setFormPersonId(NO_PERSON);
    setPersonList(() => {
      return [];
    });
  }

  const person = getFormPerson(formPersonId);
  return (
    <div className="mainPage">
      {/**** Add/Edit Popup ****/}

      {person && (
        <div className="popupBase">
          <div className="popupForm">
            <Form
              person={person}
              onSubmit={handleSubmitPerson}
              onClose={closeForm}
            />
          </div>
        </div>
      )}

      {/**** Buttons ****/}

      <div className="flexRowCenter">
        {!person && (
          <Button className="mainButton" onClick={openAddForm}>
            Add Person
          </Button>
        )}
        {person && (
          <Button className="mainButton" onClick={closeForm}>
            Close Detail
          </Button>
        )}
        {!personList.length && (
          <Button className="mainButton" onClick={seedPersonList}>
            Seed List
          </Button>
        )}
        {!!personList.length && (
          <Button className="mainButton" onClick={clearList}>
            Clear List
          </Button>
        )}
      </div>

      {/**** Person List ****/}

      {personList.length > 0 && (
        <div className="scrollarea">
          <PersonList persons={personList} rowClick={handleRowClick} />
        </div>
      )}

      {personList.length === 0 && (
        <h2>
          There are currently no added persons. You can either click the{" "}
          <strong>Add Person</strong> button to add a new person, or click the{" "}
          <strong>Seed List</strong> button to fill the list with some sample
          values.
        </h2>
      )}
    </div>
  );
}
