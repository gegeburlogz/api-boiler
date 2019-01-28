export const types = `
	input newIdolGroup_inpt{
		description:String
		groupname:String
		idolname:String
		tag:String
	}

	input upload_input{
		tag:String
		images:[String]
	}
	type getIdolGroup{
		description:String
		groupname:String
		idolname:String
		tag:String
		images:[String]
	}
	type response_getIdolGroup{
		data:getIdolGroup
		success:Boolean
		message:[message]
	}
`;

export const queries = `
	getIdolGroup(input:String):response_getIdolGroup
`;
export const mutation = `
	uploadImages(input:upload_input!):response
	newIdolGroup(input:newIdolGroup_inpt!):response
`;
export const subscription = `
`;