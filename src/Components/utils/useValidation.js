'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const checkExistsInDB = async (field, value) => {
  const response = await fetch(`/api/user/check_user?${field}=${value}`);
  const result = await response.json();
  return result.exists; 
};


export const useValidation = () => {
  // Create a validation schema with Yup
  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .matches(/^[A-Za-z]+$/, 'First name must contain only alphabets')
      .max(20, 'First name must not exceed 20 characters')
      .required('First name is required'),
    lastname: Yup.string()
      .matches(/^[A-Za-z]+$/, 'Last name must contain only alphabets')
      .max(20, 'Last name must not exceed 20 characters')
      .required('Last name is required'),
    username: Yup.string()
      .matches(/^[A-Za-z0-9]+$/, 'Username must not contain special characters')
      .max(20, 'Username must not exceed 20 characters')
      .required('Username is required').test('unique-username', 'Username already exists', async (value) => {
        if (value) {
          const exists = await checkExistsInDB('username', value);
          return !exists;
        }
        return true;
      }),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .max(20, 'Password must not exceed 20 characters')
      .required('Password is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required').test('unique-email', 'Email already exists', async (value) => {
        if (value) {
          const exists = await checkExistsInDB('email', value);
          return !exists;
        }
        return true;
      }),
    mobile: Yup.string()
      .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
      .required('Mobile number is required').test('unique-mobile', 'Mobile number already exists', async (value) => {
        if (value) {
          const exists = await checkExistsInDB('mobile', value);
          return !exists;
        }
        return true;
      }),
   });

  // Use React Hook Form with the Yup validation resolver
  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
  });

  return formMethods; // Return all form methods provided by React Hook Form
};


export const loginValidation = () => {
  // Create a validation schema with Yup
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .max(20, 'Password must not exceed 20 characters')
      .required('Password is required'),
      username: Yup.string()
      .matches(/^[A-Za-z0-9]+$/, 'Username must not contain special characters')
      .max(20, 'Username must not exceed 20 characters')
      .required('Username is required'),
  });

  // Use React Hook Form with the Yup validation resolver
  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
  });

  return formMethods; // Return all form methods provided by React Hook Form
};

export const emailexists = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email('Invalid email format')
    .required('Email is required').test('email-exists', 'No user with this email', async (value) => {
      if (value) {
        const exists = await checkExistsInDB('email', value);
        return exists;
      }
      return true;
    })
  });

  // Use React Hook Form with the Yup validation resolver
  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
  });

  return formMethods; // Return all form methods provided by React Hook Form
};

export const fieldexists = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email('Invalid email format')
    .required('Email is required').test('email-exists', 'Email is taken already', async (value) => {
      if (value) {
        const exists = await checkExistsInDB('email', value);
        return !exists;
      }
      return true;
    }),
    mobile: Yup.string()
    .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
    .required('Mobile number is required').test('unique-mobile', 'Mobile number is taken already', async (value) => {
      if (value) {
        const exists = await checkExistsInDB('mobile', value);
        return !exists;
      }
      return true;
    }),
    username: Yup.string()
      .matches(/^[A-Za-z0-9]+$/, 'Username must not contain special characters')
      .max(20, 'Username must not exceed 20 characters')
      .required('Username is required').test('unique-username', 'Username is taken already', async (value) => {
        if (value) {
          const exists = await checkExistsInDB('username', value);
          return !exists;
        }
        return true;
      }),

  });

  // Use React Hook Form with the Yup validation resolver
  const formMethods = useForm({
    resolver: yupResolver(validationSchema),
  });

  return formMethods; // Return all form methods provided by React Hook Form
};





