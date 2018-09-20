import gql from 'graphql-tag';

const auth = gql`
	query auth(
		$token: String!,
	) {
		auth(
			token: $token,
		)
	}
`;

export default auth;
