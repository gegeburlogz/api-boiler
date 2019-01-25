export const types = `
	input SignIn_inpt{
		email:String
		password:String
	}

	input AdminSignIn_inpt{
		username:String
		password:String
	}


	type response_SignIn{
		data:SignIn_get
		success:Boolean
		message:[message]
	}

	type SignIn_get{
		token:String
		email:String
	}
`;

export const queries = `
    SignIn(input:SignIn_inpt!):response_SignIn
    AdminSignIn(input:AdminSignIn_inpt!):response_SignIn

`;
export const mutation = `
`;


export const subscription = `
`;