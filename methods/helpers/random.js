
 const random = (min = 10, max = 19) => {
	if(min > max){
		let store = max,max = min,min = store;
	}
	
	return Math.floor(min + Math.random() * (max - min));
}

export default random;
// Create random with min max inputs
