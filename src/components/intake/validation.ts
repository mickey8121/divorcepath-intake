import * as yup from 'yup';

const phoneRegExp = /^[\d ()+-]+$/;

const name = yup
  .string()
  .trim()
  .matches(
    /^((?:.* ){1}).+$/,
    'Please enter your full legal name. We require this in order to run a conflict search'
  )
  .required('Please enter your full legal name. We require this in order to run a conflict search');

const issue = yup.string();

const email = yup.string().when('phone', (field: string, schema: yup.StringSchema) => {
  const emailSchema = schema.email('Please enter correct email');

  if (!field) return emailSchema.required('Please provide phone number or email');

  return emailSchema;
});

const phone = yup.string().when('email', (field: string, schema: yup.StringSchema) => {
  const phoneSchema = schema
    .matches(phoneRegExp, 'Please enter correct phone number')
    .min(6, 'Please enter correct phone number')
    .max(20, 'Please enter correct phone number');

  if (!field) return phoneSchema.required('Please provide phone number or email');

  return phoneSchema;
});
const privacy = yup.bool().oneOf([true], 'required');

const validationSchema = yup.object().shape(
  {
    name,
    phone,
    email,
    privacy,
    issue
  },
  [['email', 'phone']]
);

export default validationSchema;
