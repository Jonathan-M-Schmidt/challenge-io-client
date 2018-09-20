import gql from 'graphql-tag';

const challenge = gql` query challenge($id: String!) {
	challenge(id: $id) {
		_id
		name
		adminID
		bannerImg
		dateFrom
		dateTill
		description
		users
	}
}`;

export default challenge;
