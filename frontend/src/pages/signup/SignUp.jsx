import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup.js";
const SignUp = () => {
  const [inputValues, setInputValues] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender:''
  });
  const { loading,signup } = useSignup()
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(inputValues)
  }
  const onGenderChange = (gender) => {
    setInputValues({...inputValues,gender})
  }
	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					注册 <span className='text-blue-500'> 聊天App</span>
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text text-white'>全名</span>
						</label>
						<input value={inputValues.fullName} onChange={(e) => setInputValues({...inputValues,fullName:e.target.value})} type='text' placeholder='John Doe' className='w-full input input-bordered  h-10' />
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text text-white'>用户名</span>
						</label>
						<input value={inputValues.username} onChange={(e) => setInputValues({...inputValues,username:e.target.value}) } type='text' placeholder='johndoe' className='w-full input input-bordered h-10' />
					</div>

					<div>
						<label className='label p-2'>
							<span className='text-base label-text text-white'>密码</span>
						</label>
						<input
              value={inputValues.password} onChange={(e) => setInputValues({...inputValues,password:e.target.value})}
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
						/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text text-white'>确认密码</span>
						</label>
						<input
              value={inputValues.confirmPassword} onChange={(e) => setInputValues({...inputValues,confirmPassword:e.target.value})}
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered h-10'
						/>
					</div>

					<GenderCheckbox onChange={onGenderChange} />

					<Link className='text-white text-sm hover:underline hover:text-blue-600 mt-2 inline-block' to='/login'>
						已有账号?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "注册"}
            </button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;