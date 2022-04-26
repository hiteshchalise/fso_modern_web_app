import axios from 'axios';

const BASE_URL = "/api/persons"

const getAllPhonebook = () => {
    return axios
        .get(BASE_URL)
        .then(response => response.data);
}

const addPerson = (person) => {
    return axios
        .post(BASE_URL, person)
        .then(response => response.data)
}

const editPerson = (personId, person) => {
    return axios
        .put(`${BASE_URL}/${personId}`, person)
        .then(response => response.data);
}

const deletePerson = (id) => {
    return axios.delete(`${BASE_URL}/${id}`)
}

export default {
    getAllPhonebook,
    addPerson,
    deletePerson,
    editPerson
}