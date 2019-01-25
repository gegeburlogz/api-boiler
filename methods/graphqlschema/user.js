export const types = `
	input create_user_inpt{
		firstname:String
		lastname:String
		email:String
		password:String
	}

	input userProfile{
		firstname:String
		lastname:String
		email:String
		dateOfBirth:String
		country:String
		phoneNumber:String
	}

	type response_profile{
		success:Boolean
		message:message
		data:profile
	}

	type profile{
		firstname:String
		lastname:String
		email:String
		dateOfBirth:String
		country:String
		phoneNumber:String
		profileimage:String
	}
`;

export const queries = `
    create_user(input:create_user_inpt!):response
    profile:response_profile
`;

export const mutation = `
	profileUpdate(input:userProfile!,password:String!):response
`;


export const subscription = `
`;