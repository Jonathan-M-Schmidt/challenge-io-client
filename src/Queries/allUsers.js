import gql from 'graphql-tag';

const allUsers = gql`{
	allUsers {
		_id
		name
		email
	}
}`;

export default allUsers;
