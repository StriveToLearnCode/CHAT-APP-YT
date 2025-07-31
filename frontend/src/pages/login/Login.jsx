import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const { loading, login } = useLogin();

	const handleSubmit =async (e) => {
		e.preventDefault();
		await login(username, password)
	}
	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					登录
					<span className='text-blue-500'> 聊天App</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text text-white'>用户名</span>
						</label>
						<input value={username} onChange={(e) => setUsername(e.target.value)} type='text' placeholder='Enter username' className='w-full input input-bordered h-10' />
					</div>

					<div>
						<label className='label p-2'>
							<span className='text-base label-text text-white'>密码</span>
						</label>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
						/>
					</div>
					<Link to='/signup' className='text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block'>
						没有账号?
					</Link>

					<div>
						<button disabled={loading} className='btn btn-block btn-sm mt-2'>
							{loading ? (<span className="loading loading-spinner"></span>) : "登录"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default Login;