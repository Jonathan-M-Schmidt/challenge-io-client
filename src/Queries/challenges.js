import gql from 'graphql-tag';

const challenges = gql`
	query challenges(
		$ids: [String!],
	) {
		challenges(
			ids: $ids,
		) {
			_id
			name
		}
	}
`;

export default challenges;
