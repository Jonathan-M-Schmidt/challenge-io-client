import gql from 'graphql-tag';

const createChallenge = gql`
	mutation createChallenge(
		$title: String!,
		$url: String,
		$dateStart: String!,
		$dateEnd: String!,
		$desc: String!,
		$adminID: String!,
	) {
		createChallenge(
			name: $title,
			adminID: $adminID,
			bannerImg: $url,
			dateFrom: $dateStart,
			dateTill: $dateEnd,
			description: $desc,
		) {
			_id
			name
			adminID
			bannerImg
			dateFrom
			dateTill
			description
			users
		}
	}
`;

export default createChallenge;
