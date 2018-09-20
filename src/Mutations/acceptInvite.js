import gql from 'graphql-tag';

const acceptInvite = gql`
	mutation acceptInvite(
		$userID: String!,
		$challengeID: String!,
	) {
		acceptInvite (
			userID: $userID,
			challengeID: $challengeID,
		) {
			challengeInvites
		}
	}
`;

export default acceptInvite;
