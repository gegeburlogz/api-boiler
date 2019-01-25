import {buildSchema} from 'graphql';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';

const schemas = [],types = [], queries = [], mutation = [], subscription = [];

fs.readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return;

	if(fs.lstatSync(__dirname+"/"+file).isDirectory()){
		fs.readdirSync(__dirname+"/"+file).forEach((innerFile) => {
			schemas.push(require(path.join(__dirname+"/"+file, innerFile)))
		})
	}else{
		schemas.push(require(path.join(__dirname, file)))
	}
});

schemas.forEach(s => {
    types.push(s.types);
    queries.push(s.queries);
    mutation.push(s.mutation);
    subscription.push(s.subscription);
});

const typeDefs =`
${types.join('\n')}

type Query {
	loader:Boolean
    ${queries.join('\n')}
}

type Mutation {
	loader:Boolean
    ${mutation.join('\n')}
}

type Subscription {
	loader:Boolean
    ${subscription.join('\n')}
}`;

export default buildSchema(typeDefs);

