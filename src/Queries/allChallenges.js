import gql from 'graphql-tag';

export default gql`{
	allChallenges {
		_id
		name
		bannerImg
		dateFrom
		dateTill
		description
		users
	}
}`;
