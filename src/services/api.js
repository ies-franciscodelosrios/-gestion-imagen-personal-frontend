import Axios from "axios";
import { getToken } from "./UseToken";

const ApiConnect = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

/* LOGIN */
/* ----------------------------------------------------------------------------------------------------------------------------------------- */

/**
 * Http Request to login.
 * @param {*} email the email for the query.
 * @param {*} password the password for the query.
 * @returns return the token for the request.
 */
export const apiLogin = async (email, password) => {
  return await ApiConnect.post("login", {
    email,
    password,
    device: window.navigator.userAgent,
  });
};

/**
 * Http Request to logout
 * @param {*} email the email for the query.
 * @param {*} password the password for the query.
 * @returns return response 200.
 */
export const apiLogout = async () => {
  return await ApiConnect.get("logout", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/* USERS: PROFESSOR AND STUDENTS */
/* ----------------------------------------------------------------------------------------------------------------------------------------- */

/**
 * Http Request to get stadistics from database
 * @returns list with all stadistics
 */
export const getStadistics = async () => {
  return await ApiConnect.get("client/stats", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const apiGetAllProfessors = async () => {
  return await ApiConnect.get("/users/rol/1", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to get a user by the email.
 * @param {*} logineamil email to search the user.
 * @returns usuario con todos los datos.
 */
export const getAllUserData = async () => {
  return await ApiConnect.get(`user`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to get all Users from database
 * @returns list with all users
 */
export async function ApiGetUser() {
  return await ApiConnect.get("users", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
}

/**
 * Http Request to get all Users from database
 * @returns list with all students
 */
export const getAllStudentsData = async () => {
  return await ApiConnect.get("/users/rol/2", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to get a Users by id
 * @param {*} id to identify the Users
 * @returns user data
 */
export const apiGetUserById = async (id) => {
  return await ApiConnect.get("user/id/" + id, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to get a student by DNI
 * @param {*} id to identify the client
 * @returns user data
 */
export const getUserByDNI = async (id) => {
  return await ApiConnect.get(`userByDni/id`, {
    params: { id: id },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/* Http Request to update a user
 * @param {*} id to identify the user
 * @returns response 200 if ok
 */
export const updateUserBy = async (user) => {
  return await ApiConnect.put("user/edit/"+user.id, user, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to add a new student
 * @returns response 200 if ok
 */
export const AddStudent = async (user) => {
  return await ApiConnect.post(
    `user/addstudent`,
    {
      dni: user.dni,
      rol: user.rol,
      course_year: user.course_year,
      cycle: user.cycle,
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password,
      others: " ",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

/**
 * Http Request to add a new teacher
 * @returns response 200 if ok
 */
export const AddProfesor = async (user) => {
  return await ApiConnect.post(
    `user/add/professor`,
    {
      dni: user.dni,
      rol: user.rol,
      course_year: user.course_year,
      cycle: user.cycle,
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password,
      others: " ",
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};
/**
 * Http Request to delete a student by id
 * @param {*} id to identify the student
 * @returns response 200 for ok OR 401 for not found
 */
export const ApiDelUser = async (id) => {
  return await ApiConnect.delete(`user/delete/`+id, {
    params: { id: id },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/* Clients */
/* ----------------------------------------------------------------------------------------------------------------------------------------- */
/**
 * Http Request to get all clients from database
 * @returns list with all clients
 */
export const getAllClientsData = async () => {
  return await ApiConnect.get("clients", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to get all clients from database
 * @returns list with all clients
 */
export const getClientsPaged = async (params) => {
  return await ApiConnect.get("clients/paged", {
    params: params,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to get a client by id
 * @param {*} id to identify the client
 * @returns user data
 */
export const getClientById = async (id) => {
  return await ApiConnect.get(`client/id`, {
    params: { id: id },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to get a client by data
 * @param {*} id to identify the client
 * @returns user data
 */
export const getClientByData = async (id) => {
  return await ApiConnect.get(`client/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to get a client by id
 * @param {*} id to identify the client
 * @returns user data
 */
export const updateClientBy = async (user) => {
  return await ApiConnect.put(`client/edit`, user, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to add a new client
 * @returns response 200 if ok
 */
export const AddClient = async (user) => {
  return await ApiConnect.post(
    `client/add `,
    { ...user },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

/**
 * Http Request to delete a client by id
 * @param {*} id to identify the client
 * @returns response 200 for ok OR 401 for not found
 */
export const ApiDelClient = async (id) => {
  return await ApiConnect.delete(`client/id`, {
    params: { id: id },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/* Appointments */
/* ----------------------------------------------------------------------------------------------------------------------------------------- */

/**
 * Http Request to add a new appointment
 * @returns response 200 if ok
 */
export const AddAppointment = async (event) => {
  return await ApiConnect.post(
    `appointment`,
    {
      date: event.start,
      treatment: event.calendar,
      protocol: event.title,
      dni_client: event.dnicliente,
      dni_student: event.dnialumno,
      consultancy: event.desc,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

/**
 * Http Request to get all appointments
 * @returns appointments data
 */
export const getAllAppointments = async () => {
  return await ApiConnect.get("appointments", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to get a appointment by id
 * @param {*} id to identify the appointment
 * @returns appointment data
 */
export const getAppointmentPaged = async (params) => {
  return await ApiConnect.get(`appointments/paged`, {
    params: { ...params },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to get a appointment by id
 * @param {*} id to identify the appointment
 * @returns appointment data
 */
export const getAppointmentbyId = async (id) => {
  return await ApiConnect.get(`appointment/id`, {
    params: { id: id },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const apiAddUsersCSV = async (csvbase64) => {
  return await ApiConnect.post("csv/import", {"csv_data": csvbase64}, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    }
  })
}

/**
 * Http Request to get all appointments
 * @returns appointments data
 */
export const updateAppointment = async (event) => {
  return await ApiConnect.put(
    `appointment`,
    {
      id: event.id,
      date: event.start,
      treatment: event.calendar,
      protocol: event.title,
      dni_client: event.dnicliente,
      dni_student: event.dnialumno,
      consultancy: event.desc,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

/**
 * Http Request to get all appointments
 * @returns appointments data
 */
export const updateAppointment2 = async (event) => {
  return await ApiConnect.put(
    `appointment`,
    {
      ...event,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

/**
 * Http Request to delete a appointment by id
 * @param {*} id to identify the client
 * @returns response 200 for ok OR 401 for not found
 */
export const deleteAppointment = async (id) => {
  return await ApiConnect.delete(`appointment/id`, {
    params: { id: id },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to get a images from cloudinary
 * @param {*} id to identify the image
 * @returns response 200 for ok OR 401 for not found
 */
export const getAppointmentCloudinary = async (data) => {
  return await ApiConnect.get(`appointment/get-photos`, {
    params: { ...data },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/**
 * Http Request to add a imagen from cloudinary
 * @param {*} id to identify the image
 * @returns response 200 for ok OR 401 for not found
 */
export const addAppointmentCloudinary = async (data) => {
  return await ApiConnect.post(
    `appointment/add-photo-url`,
    { ...data },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

/**
 * Http Request to delete a imagen from cloudinary
 * @param {*} id to identify the image
 * @returns response 200 for ok OR 401 for not found
 */
export const deleteAppointmentCloudinary = async (data) => {
  return await ApiConnect.delete(`appointment/delete-photo-url`, {
    params: { ...data },
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

/* Vocational Education */

/**
 * Http Request to get all vocational education
 * @returns vocational education data
 */
export const apiGetAllVocationalEducation = async () => {
  return await ApiConnect.get("vocationaleducation", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
  })
};

export const apiGetVocationalEducationByID = async (id) => {
  return await ApiConnect.get("vocationaleducation/" + id, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    }
  })
}

export const apiAddVocationalEducation = async () => {
  return await ApiConnect.post("vocationaleducation/add", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    }
  })
}

export const apiUpdateVocationalEducation = async (id) => {
  return await ApiConnect.put("vocationaleducation/edit/" + id, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    }
  })
}

export const apiDeleteVocationalEducation = async (id) => {
  return await ApiConnect.delete("vocationaleducation/delete/" + id, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,

    }
  })
}

export const apiDeleteAllVocationalEducation = async () => {
  return await ApiConnect.delete("vocationaleducation/delete-all", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${getToken()}`,
    }
  })
}