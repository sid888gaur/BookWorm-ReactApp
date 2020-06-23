import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class LoginForm extends React.Component {
	state = {
		data: {
			email: "",
			password: ""
		},
		loading: false,
		Errors: {}
	};

	onChange = e => 
		this.setState({ 
			data: { ...this.state.data, [e.target.name]: e.target.value }
		});

	onSubmit = () =>{
		const Errors = this.validate(this.state.data);
		this.setState({ Errors });
		if (Object.keys(Errors).length === 0){
			this.setState({ loading: true });
			this.props
				.submit(this.state.data)
				.catch(err => 
					this.setState({ errors: err.response.data.Errors, loading: false })
				);
		}
	}

	validate = (data) =>{
		const Errors = {};
		if(!Validator.isEmail(data.email)) Errors.email = "Invalid Email";
		if(!data.password) Errors.password = "Can't be empty";
		return Errors;
	}

	render(){
		const { data, Errors, loading } = this.state;
		return(
			<Form onSubmit={this.onSubmit} loading={loading}>
				{ Errors.global && (
					<Message negative>
						<Message.Header>Something went wrong</Message.Header>
						<p>{Errors.global}</p>
					</Message>
				)}
				<Form.Field error={!!Errors.email}>
					<label htmlFor="email">Email</label>
					<input 
						type="email" 
						id="email" 
						name="email" 
						placeholder="example@example.com"
						value = {data.email}
						onChange = {this.onChange}
					/>
					{Errors.email && <InlineError text={Errors.email} />}
				</Form.Field>
				<Form.Field error={!!Errors.password}>
					<label htmlFor="password">Password</label>
					<input 
						type="password" 
						id="password" 
						name="password" 
						placeholder="Make it secure"
						value = {data.password}
						onChange = {this.onChange}
					/>
					{Errors.password && <InlineError text={Errors.password} />}
				</Form.Field>
				<Button primary>Login</Button>
			</Form>
		);
	}
}

LoginForm.propTypes = {
	submit: PropTypes.func.isRequired
};

export default LoginForm;