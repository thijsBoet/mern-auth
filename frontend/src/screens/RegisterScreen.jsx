import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';

const RegisterScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [register, { isLoading }] = useRegisterMutation();

	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		if (userInfo) {
			navigate('/');
		}
	}, [navigate, userInfo]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if(password !== confirmPassword) {
			toast.error('Passwords do not match');
			return;
		} else {
			try {
				const res = await register({ name,  email, password }).unwrap();
				dispatch(setCredentials({ ...res }));
				navigate('/');
			} catch (error) {
				toast.error(error?.data?.message || error?.error);
			}
		}
	};

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name' className='mb-3'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter name'
						value={name}
						onChange={(e) =>
							setName(e.target.value)
						}></Form.Control>
				</Form.Group>

				<Form.Group controlId='email' className='mb-3'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(e) =>
							setEmail(e.target.value)
						}></Form.Control>
				</Form.Group>

				<Form.Group controlId='password' className='mb-3'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e) =>
							setPassword(e.target.value)
						}></Form.Control>
				</Form.Group>

				<Form.Group controlId='confirm Password' className='mb-3'>
					<Form.Label>confirm Password</Form.Label>
					<Form.Control
						type='assword'
						placeholder='Enter confirm Password'
						value={confirmPassword}
						onChange={(e) =>
							setConfirmPassword(e.target.value)
						}></Form.Control>
				</Form.Group>

				{isLoading && <Loader />}

				<Button type='submit' variant='primary' className='mt-3'>
					Sign Up
				</Button>

				<Row className='py-3'>
					<Col>
						Already have an Account? <Link to='/login'>Login</Link>
					</Col>
				</Row>
			</Form>
		</FormContainer>
	);
};

export default RegisterScreen;
