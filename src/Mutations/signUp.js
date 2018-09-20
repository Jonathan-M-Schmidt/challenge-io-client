import gql from 'graphql-tag';

const signUp = gql`
	mutation signup(
		$email: String!,
		$name: String!,
		$password: String!
	) {
		userCreate(
			email: $email,
			name: $name,
			password: $password,
		) {
			user {
				_id
				name
				email
			},
			token
		}
	}
`;

export default signUp;
