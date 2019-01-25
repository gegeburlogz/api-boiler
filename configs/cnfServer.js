import env from 'dotenv';
env.config();

const config = {
	server_port:process.env.serverport,
	home_path:process.env.serverhome,
	server_secret:process.env.serversecret,
	administrator:process.env.admin_name,
	admin_secret:process.env.admin_password,
	super_role:process.env.admin_role_name
}

export default config;