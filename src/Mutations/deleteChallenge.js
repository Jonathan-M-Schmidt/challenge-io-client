import gql from 'graphql-tag';

const deleteChallenge = gql`
	mutation deleteChallenge(
		$id: String!
	) {
		deleteChallenge(
			id: $id,
		)
	}
`;

export default deleteChallenge;
