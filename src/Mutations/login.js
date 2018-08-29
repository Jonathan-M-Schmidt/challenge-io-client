import gql from 'graphql-tag';

const login = gql`
	mutation login(
		$email: String!,
		$password: String!
	) {
		login(
			email: $email,
			password: $password,
		) {
			user {
				name
				email
				_id
			},
			token
		}
	}
`;

export default login;
