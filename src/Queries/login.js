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
				challenges {
					challenge_id
					total_score
				}
			},
			token
		}
	}
`;

export default login;
