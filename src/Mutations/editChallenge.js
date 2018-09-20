import gql from 'graphql-tag';

const editChallenge = gql`
	mutation editChallenge(
		$id: String!,
		$name: String,
		$description: String,
		$bannerImg: String,
	) {
		editChallenge(
			id: $id,
			name: $name,
			description: $description,
			bannerImg: $bannerImg,
		) {
			_id
			name
			bannerImg
			description
		}
	}
`;

export default editChallenge;
