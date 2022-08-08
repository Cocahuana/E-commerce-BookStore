function validate(registerUser) {
	let { username, email, password } = registerUser;
	let whitespacesParameter = /(?!^\s+$)^.*$/m;
	let usernamePattern =
		/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ0-9\u00f1\u00d1]+$/;
	let firstUpper =
		/^[A-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
	let emailPattern = /\S\@\S+\S+/; // Expresion Regular para validar Emails.
	let oneTo100Parameter = /^[1-9]$|^[1-9][0-9]$|^(100)$/;
	let invalidPassword = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;

	let errors = {};
	//---------- username Start ----------//
	if (!username) errors.username = 'A username is required';
	if (!whitespacesParameter.test(username))
		errors.username = 'No whitespaces allowed';
	if (emailPattern.test(username))
		errors.username = 'Username can not have an email pattern';
	if (username.includes('@')) errors.username = 'Username can not have @';
	// if (!firstUpper.test(username))
	// 	errors.username = 'First letter must be in Upper Case';
	if (!usernamePattern.test(username))
		errors.username =
			'Username can not start with numbers or whitespaces. Valid examples: Ñengo Flow, Lionel messi, p3k377, etc';
	//---------- username End ----------//

	//---------- email Start ----------//
	if (!email) errors.email = 'A email is required';
	if (!whitespacesParameter.test(email))
		errors.email = 'No whitespaces allowed';
	if (!emailPattern.test(email))
		errors.email =
			'The email must have an email pattern (example@email.com)';
	if (!email.includes('@'))
		errors.email = 'The email should have a @ character';
	// if (email.length <= 20 || email.length >= 800)
	// 	errors.email = 'email must have between 20 and 800 characters';
	//---------- email End ----------//

	//---------- Password Start ----------//
	if (!password) errors.password = 'Password required';
	if (invalidPassword.test(password))
		errors.password =
			'Invalid Password, at least 8 characters needed, must contain at least one uppercase letter, lowercase letter, number and special character';
	//---------- Password End ----------//

	return errors;
}

export default validate;
