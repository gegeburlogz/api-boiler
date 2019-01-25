export const types = `
	input NewRole_input{
		name:String
		description:String
		create:[String]
		read:[String]
		update:[String]
		delete:[String]
		view:[String]
	}
	type GetRoles{
		id:String
		name:String
		description:String
		create:[String]
		read:[String]
		delete:[String]
		view:[String]
		update:[String]
	}
	type response_GetRoles{
		data:[GetRoles]
		success:Boolean
		message:[message]
	}
`;

export const queries = `
    GetRoles:response_GetRoles

`;
export const mutation = `
	NewRole(input:NewRole_input!):response
	UpdateRole(input:NewRole_input!,id:String!):response
	DeleteRoles(input:[String]!):response
`;


export const subscription = `
`;