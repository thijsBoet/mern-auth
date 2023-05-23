import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { useUpdateUserMutation } from '../slices/usersApiSlice';

import { toast } from 'react-toastify';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';

const ProfileScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { userInfo } = useSelector((state) => state.auth);

	const [updateProfile, { isLoading }] = useUpdateUserMutation();

	useEffect(() => {
		setName(userInfo?.name);
		setEmail(userInfo?.email);
	}, [userInfo.setName, userInfo.setEmail]);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			toast.error('Passwords do not match');
			return;
		} else {
			try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success('Profile Updated');
            } catch (error) {
                toast.error(error?.data?.message || error?.error);
            }
		}
	};

	return (
		<FormContainer>
			<h1>Update Profile</h1>
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
						type='password'
						placeholder='Enter confirm Password'
						value={confirmPassword}
						onChange={(e) =>
							setConfirmPassword(e.target.value)
						}></Form.Control>
				</Form.Group>

                {isLoading && <Loader />}

				<Button type='submit' variant='primary' className='mt-3'>
					Update
				</Button>
			</Form>
		</FormContainer>
	);
};

export default ProfileScreen;
