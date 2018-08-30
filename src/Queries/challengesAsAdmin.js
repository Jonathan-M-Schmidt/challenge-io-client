import gql from 'graphql-tag';

const challengesAsAdmin = gql`
	query( $id: String! ) {
		challengesAsAdmin( id: $id ) {
			_id
			name
			description
		}
	}
`;

export default challengesAsAdmin;
