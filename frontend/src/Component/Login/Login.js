import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginForm, authenticate } from '../../api/auth';
import Layout from '../Layout/Layout';
import './Login.css'

const Login = () => {
	useEffect(() => {
		window.scrollTo(0, 0)
	}, []);

	const navigate = useNavigate();
	let [error, setError] = useState(0);


	const {
		register,
		handleSubmit,
		setValue,
	} = useForm();

	//form on submit
	let onSubmit = (data) => {
		const { email, password } = data;
		loginForm({ email, password }).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				authenticate(data, () => {
					setError(0);
					setValue("email", "", { shouldValidate: false });
					setValue("password", "", { shouldValidate: false });
					return navigate("/")
				});
			}
		});
	};


	// Login Form
	const loginDesign = () => (
		<div className="login-wrap">
			<div className="login-html">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="login-form">
						<div className='loginLogo'>
							<img src='./boy.png' alt='login' />
						</div>
						<div className="group">
							<label htmlFor="email" className="label">Username</label>
							<input id="email" type="text" className="input"    {...register("email", { required: true })} />
						</div>
						<div className="group">
							<label htmlFor="password" className="label">Password</label>
							<input id="password" type="password" className="input" data-type="password" {...register("password", { required: true })} />
						</div>
						<div className="group">
							<input id="check" type="checkbox" className="check" />
							<label htmlFor="check"><span className="icon"></span> Keep me Signed in</label>
						</div>
						{showError()}
						<div className="group">
							<input type="submit" className="button" value="Sign In" />
						</div>
					</div>
				</form>

			</div>
		</div>
	);


	//show error msg
	const showError = () => {
		return (
			<div className="alert alert-danger" role="alert" style={{ display: error ? "" : "none" }}>
				{error}
			</div>

		);
	};
	;


	return (
		<>
			<Layout
				title="Donation"
				description="Donating home"
			>
				{loginDesign()}
			</Layout>
		</>
	)
}

export default Login