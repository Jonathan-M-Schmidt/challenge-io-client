import gql from 'graphql-tag';

const user = gql`query ($id: String!) {
	user(id: $id) {
		_id
		options {
			allow_no_friend_rivals
			push_notifications
		}
		name
		email
		friends{
			_id
			name
		}
		rivals {
			_id
			name
		}
		challenges
		challengeInvites
	}
}`;

export default user;
