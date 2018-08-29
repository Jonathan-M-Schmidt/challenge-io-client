export default ( date ) => {
	const now = new Date().valueOf();
	const incoming = new Date( date ).valueOf();
	if ( now > incoming.valueOf() ) {
		return true;
	}
	return false;
};
