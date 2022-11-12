// ** React Imports
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Hooks
import { useAuth } from 'core/utility/context/Auth';
import { useSkin } from 'core/utility/hooks/useSkin'
import useAxios from 'core/utility/hooks/useAxios'

// ** Third Party Components
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Custom Components
import InputPasswordToggle from 'core/components/input-password-toggle'

// ** Reactstrap Imports
import { Row, Col, Form, Input, Label, Spinner, Button, CardText, CardTitle, FormFeedback } from 'reactstrap'

// ** Styles
import 'assets/scss/react/pages/page-authentication.scss'

const Login = () => {
  // ** Hooks
  const { skin } = useSkin()
  const navigate = useNavigate()
  const { handleLogin, setCurrentUser } = useAuth()
  
  //** Default Values */
  const defaultValues = {
    userName: 'achordval@gmail.com',
    password: '12345678'
  };

  // ** Login Schema
  const loginSchema = yup.object().shape({
    userName: yup.string().required('Username is a required field'),
    password: yup.string().required('Password is a required field')
  });

  //** UseForm */
  const {
    control,
    isSubmitting,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues, resolver: yupResolver(loginSchema) })

  const onSubmit = async data => {
    try {
      const response = await useAxios.post('/api/admin/login', {
        userName: data.userName, 
        password: data.password
      });
      handleLogin({  
        accessToken: response.data.data.accessToken, 
        refreshToken: response.data.data.refreshToken, 
        adminData: response.data.data.adminData 
      });
      setCurrentUser(...response.data.data.adminData);
      navigate('/states');
      toast.success('You have successfully logged in. Enjoy!');
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        throw error;
      }
    }
  };
  
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`assets/images/pages/${illustration}`).default

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <svg viewBox='0 0 139 95' version='1.1' height='28'>
            <defs>
              <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                <stop stopColor='#000000' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
              <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                <stop stopColor='#FFFFFF' offset='100%'></stop>
              </linearGradient>
            </defs>
            <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
              <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                <g id='Group' transform='translate(400.000000, 178.000000)'>
                  <path
                    d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                    id='Path'
                    className='text-primary'
                    style={{ fill: 'currentColor' }}
                  ></path>
                  <path
                    d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                    id='Path'
                    fill='url(#linearGradient-1)'
                    opacity='0.2'
                  ></path>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.049999997'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                  ></polygon>
                  <polygon
                    id='Path-2'
                    fill='#000000'
                    opacity='0.099999994'
                    points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                  ></polygon>
                  <polygon
                    id='Path-3'
                    fill='url(#linearGradient-2)'
                    opacity='0.099999994'
                    points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className='brand-text text-primary ms-1'>Election</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='6' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='6' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome to Election Manager Pro! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-userName'>
                  UserName or Email or Phone
                </Label>
                <Controller
                  id='userName'
                  name='userName'
                  control={control}
                  render={({ field }) => (
                    <Input
                      autoFocus
                      type='text'
                      placeholder='john@example.com'
                      invalid={errors.userName && true}
                      {...field}
                    />
                  )}
                />
                {errors.userName && <FormFeedback>{errors.userName.message}</FormFeedback>}
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <Controller
                  id='password'
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
                {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
              </div>
              <Button disabled={isSubmitting} type='submit' className='p-1' color='primary' block>
                Sign in {isSubmitting && <Spinner color='white' size='sm' />}
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='me-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
