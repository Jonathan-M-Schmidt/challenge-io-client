import gql from 'graphql-tag';

const inviteUsersToChallenge = gql`
	mutation inviteUsersToChallenge(
		$users: [String!],
		$challengeID: String!,
	) {
		inviteUsersToChallenge(
			users: $users,
			challengeID: $challengeID,
		)
	}
`;

export default inviteUsersToChallenge;
