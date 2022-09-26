import './Form.css'
import './Input.css'
// import { Button } from "bootstrap"
import { useState } from "react"
import { InputText } from './InputText'

import Button from 'react-bootstrap/Button';





export function Form(props) {
    const [formPerson, setFormPerson] = useState(props.person)

    function formValueChanged(changes) {
        setFormPerson({ ...showPerson(), ...changes })
    }

    function showPerson() {
        // If formPerson.uid !== props.uid then the values in  formPerson are old ones
        // and we should use the newer ones from props.person instead
        if ((formPerson && formPerson.uid) === (props.person && props.person.uid)) {
            return formPerson
        } else {
            return props.person
        }
    }

    const firstNameChanged = first_name => formValueChanged({ first_name })
    const lastNameChanged = last_name => formValueChanged({ last_name })
    const emailChanged = email => formValueChanged({ email })
    const nationalityChanged = nationality => formValueChanged({ nationality })
    const ageChanged = age => formValueChanged({ age: age.replace(/\D/g, '') })

    const resetForm = () => {
        setFormPerson(props.person)
    };

    function handleSubmit(event) {
        event.preventDefault();
        if (!existErrors(showPerson())) props.personSaved(showPerson())
    };

    function closeForm(event) {
        event.preventDefault();
        props.onClose();
    };

    function isNullOrEmpty(str) {
        return str === null || str === undefined || str === ''
    }

    const person = showPerson()

    const validateEmail = (text) => {
        const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;
        return regexEmail.test(text)
    }

    function validatePerson(person) {
        return person ? {
            errEmail: validateEmail(person.email) ? '' : 'Invalid e-mail format',
            errFirstName: isNullOrEmpty(person.first_name) ? 'First Name can not be empty' : '',
            errLastName: isNullOrEmpty(person.last_name) ? 'Last Name can not be empty' : '',
            errNationality: isNullOrEmpty(person.nationality) ? 'Nationality can not be empty' : '',
            errAge:
                isNullOrEmpty(person.age) ? 'Age can not be empty'
                    : person.age < 0 || person.age > 199 ? 'Age must be from 0 to 199' : ''
        } : {}
    }

    const errs = person && validatePerson(person);
    function existErrors(person) {
        const errs = validatePerson(person);
        return errs && Object.values(errs).some(x => x);
    }

    const doExistErrors = existErrors(person)
    return (props.person && person ?
        <div>
            <form className='flexColumn' onSubmit={handleSubmit}>
                {false && <h3>Please make sure all fields contain valid data</h3>}
                <div className='inputBox'>
                    <InputText id='FirstName' label="First Name" err={errs.errFirstName} value={person.first_name || ''} orgValue={props.person.first_name || ''} onChange={firstNameChanged} />
                    <InputText id='LastName' label="Last Name" err={errs.errLastName} value={person.last_name || ''} orgValue={props.person.last_name || ''} onChange={lastNameChanged} />
                    <InputText id='Email' label="E-mail" err={errs.errEmail} value={person.email || ''} orgValue={props.person.email || ''} onChange={emailChanged} />
                    <InputText id='Nationality' label="Nationality" err={errs.errNationality || ''} value={person.nationality || ''} autocomplete="on" orgValue={props.person.nationality} onChange={nationalityChanged} />
                    <InputText id='Age' label="Age" err={errs.errAge} value={person.age || ''} orgValue={props.person.age || ''} onChange={ageChanged} />
                </div>
                <div className='flexRowEnd'>
                    <Button value='Save' variant="success" className="formButton" disabled={doExistErrors} type='submit'>Save</Button>
                    <Button value='Close' variant="danger" className="formButton" onClick={closeForm}>Close</Button>
                    <Button value='Reset' variant="secondary" className="formButton" onClick={resetForm}>Reset</Button>
                </div>
            </form>
        </div>
        : <></>
    )
}
