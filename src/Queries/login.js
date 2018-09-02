import gql from 'graphql-tag';

const login = gql`
	query login(
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
				challengeInvites
				challenges
			},
			token
		}
	}
`;

export default login;
