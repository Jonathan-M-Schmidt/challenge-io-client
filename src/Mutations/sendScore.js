import gql from 'graphql-tag';

const sendScore = gql`
	mutation sendScore(
		$userID: String!,
		$challengeID: String!,
		$score: Int!,
	) {
		sendScore(
			userID: $userID,
			challengeID: $challengeID,
			score: $score,
		) {
			challenges {
				challenge_id
				total_score
			}
		}
	}
`;

export default sendScore;
