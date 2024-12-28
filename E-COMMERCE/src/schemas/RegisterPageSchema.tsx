import * as yup from 'yup';


export const registerPageSchema = yup.object().shape({
    username: yup.string().required("Enter Username."),
    password: yup.string().required("Password cannot be empty.")
})

