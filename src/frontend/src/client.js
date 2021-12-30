import fetch from 'unfetch';

const checkStatus = response => {
    console.log(response)
    if (response.ok) {
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    const error = new Error(response.statusText);
    console.log("Error: ", error)
    error.response = response;
    console.log("Response: ", response)
    return Promise.reject(error);
}

// export const getAllStudents = () =>
//     fetch("api/v1/students")
//         .then(checkStatus);

export const getAllStudents = () =>
    fetch("api/v1/students")
        .then(res => {
            return checkStatus(res)
        });

export const addNewStudent = student => {
    return fetch("api/v1/students", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(student)
    }).then(checkStatus)
}

export const deleteStudent = studentId => {
    return fetch(`api/v1/students/${studentId}`, {
        method: 'DELETE'
    }).then(checkStatus)
}