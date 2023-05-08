import { DefaultRoute } from '../router/routes'
import '@styles/react/libs/react-select/_react-select.scss'
import { toast } from 'react-hot-toast';

// ** Checks if an object is empty (returns boolean)
export const isObjEmpty = obj => Object.keys(obj).length === 0

// ** Returns K format from a number
export const kFormatter = num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num)

// ** Converts HTML to string
export const htmlToString = html => html.replace(/<\/?[^>]+(>|$)/g, '')

// ** Checks if the passed date is today
const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

/**
 ** Format and return date in Humanize format
 ** Intl docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/format
 ** Intl Constructor: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * @param {String} value date to format
 * @param {Object} formatting Intl object to format with
 */
export const formatDate = (value, formatting = { month: 'short', day: 'numeric', year: 'numeric' }) => {
  if (!value) return value
  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

// ** Returns short month of passed date
export const formatDateToMonthShort = (value, toTimeForCurrentDay = true) => {
  const date = new Date(value)
  let formatting = { month: 'short', day: 'numeric' }

  if (toTimeForCurrentDay && isToday(date)) {
    formatting = { hour: 'numeric', minute: 'numeric' }
  }

  return new Intl.DateTimeFormat('en-US', formatting).format(new Date(value))
}

/**
 ** Return if user is logged in
 ** This is completely up to you and how you want to store the token in your frontend application
 *  ? e.g. If you are using cookies to store the application please update this function
 */
export const isUserLoggedIn = () => localStorage.getItem('userData')!= null
export const getUserData = () => JSON.parse(localStorage.getItem('userData'))
export function getUserRol() {
  return JSON.parse(localStorage.getItem('userData')).rol
}

/**
 ** This function is used for demo purpose route navigation
 ** In real app you won't need this function because your app will navigate to same route for each users regardless of ability
 ** Please note role field is just for showing purpose it's not used by anything in frontend
 ** We are checking role just for ease
 * ? NOTE: If you have different pages to navigate based on user ability then this function can be useful. However, you need to update it.
 * @param {String} userRole Role of user
 */
export const getHomeRouteForLoggedInUser = userRole => {
  if (userRole === 0 ) return DefaultRoute
  if (userRole === 1) return DefaultRoute
  if (userRole === 2) return DefaultRoute
  return '/login'
}

// ** React Select Theme Colors
export const selectThemeColors = theme => ({
  ...theme,
  colors: {
    ...theme.colors, 
    primary25: '#61c0bf', // for option hover bg-color
    primary: '#61c0bf', // for selected option bg-color
    neutral10: '#61c0bf', // for tags bg-color
    neutral20: '#ededed', // for input border-color
    neutral30: '#ededed' // for input hover border-color
  }
})

export function validateDNI(dni) {
  const letras = "TRWAGMYFPDXBNJZSQVHLCKE"; // Letras del DNI en orden
  const dniRegex = /^\d{8}[A-Z]$/; // Expresión regular para validar el formato del DNI
  
  if (!dniRegex.test(dni)) { // Validar el formato del DNI
    return false;
  }
  
  const letra = dni.charAt(8).toUpperCase(); // Obtener la letra del DNI y convertirla a mayúsculas
  const numeros = dni.substr(0, 8); // Obtener los números del DNI
  
  const letraCalculada = letras[numeros % 23]; // Calcular la letra correspondiente a los números del DNI
  
  return letra === letraCalculada; // Comparar la letra del DNI con la letra calculada
}

export function validateUserData(data) {
  const requiredFields = ["name", "surname", "email", "dni", "cycle"];
  const values = Object.values(data);
  console.log(data)
  
  if (data.password.length !== 0 || data.repassword.length !== 0) {
    if (data.password !== data.repassword) {
      toast.error("Las contraseñas deben coincidir");
      return false;
    }
  }

  const filledValues = values.every(input => {
    return input !== null && input !== undefined && !requiredFields.includes(input);
  });
  
  if (!filledValues || !validateDNI(data.dni) ) {
    toast.error("Por favor, complete todos los campos requeridos");
    return false;
  }

  
  return true;
}