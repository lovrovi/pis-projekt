import * as Yup from 'yup';

export const PublisherSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    road: Yup.string()
        .required('Road is required')
        .min(10)
        .max(250),
    zipCode: Yup.string().required('Zip code is required').min(5),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required')
});

export const BookSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required'),
    description: Yup.string()
        .required('Description is required')
        .min(10)
        .max(250),
    pages: Yup.number().required('Pages are required').min(0),
    price: Yup.number().required('Price is required').min(0),
    image: Yup.string().required('Image is Required'),
    publisherId: Yup.number().required('Required')
});

export const BookUpdateSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required'),
    description: Yup.string()
        .required('Description is required')
        .min(10)
        .max(250),
    pages: Yup.number().required('Pages are required').min(0),
    price: Yup.number().required('Price is required').min(0),
    publisherId: Yup.number().required('Required')
});

export const AuthorSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    biography: Yup.string()
        .required('Biography is required')
        .min(10)
        .max(250),
    birthdayDate: Yup.string().required('Birthday date is required'),
    email: Yup.string().required('Email is required').email('Must be a valid email'),
});

export const UserSchema = Yup.object().shape({
    userName: Yup.string()
        .required('Username is required'),
    password: Yup.string()
        .required('Password is required')
        .min(5)
        .max(30),
    groupType: Yup.string()
    .required('group type is required')
});