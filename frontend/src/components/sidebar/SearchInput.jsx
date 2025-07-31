import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useCoversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
	const [inpValue,setInpValue] = useState('')
	const { setSelectedConversation } = useCoversation()
	const {	conversations } = useGetConversations()
	const handleSubmit = (e) => {
		e.preventDefault()
		if(!inpValue.length) return
		if(inpValue.length < 3) toast.error('搜索字符应该大于3个字符')
		const findIt = conversations.find(item => 
			item.fullName.toLowerCase().includes(inpValue.toLowerCase()) 
		)
		if(findIt) setSelectedConversation(findIt)
		else toast.error('没有您搜索的用户')
		setInpValue('')
	}
	return (
		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
			<input value={inpValue} onChange={(e) => setInpValue(e.target.value)} type='text' placeholder='Search…' className='input input-bordered rounded-full' />
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
	);
};
export default SearchInput;