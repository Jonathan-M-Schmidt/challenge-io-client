import gql from 'graphql-tag';

export default gql`{
	getAllChallenges {
		_id
		name
		bannerImg
		dateFrom
		dateTill
		description
		users
	}
}`;

