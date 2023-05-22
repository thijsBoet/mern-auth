import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const RegisterScreen = () => {
    const [name, setName] = useState('');
	const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

	const submitHandler = async (e) => {
		e.preventDefault();
		console.log('submit');
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
						type='confirm Password'
						placeholder='Enter confirm Password'
						value={confirmPassword}
						onChange={(e) =>
							setConfirmPassword(e.target.value)
						}></Form.Control>
                </Form.Group>

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