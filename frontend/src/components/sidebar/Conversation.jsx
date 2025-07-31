import { useSocketContext } from "../../context/SocketContext";
import useCoversation from "../../zustand/useConversation";
const Conversation = ({conversation,lastIndex,index,emoji}) => {
	const { fullName,profilePic } = conversation;
	const { selectedConversation,setSelectedConversation } = useCoversation()
	const { onlineUser } = useSocketContext()
	const isOnline = onlineUser.includes(conversation._id)
	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${selectedConversation?._id === conversation?._id ? 'bg-sky-500' : ''} `} onClick={() => setSelectedConversation(conversation)} >
				<div className={`avatar ${isOnline ? 'avatar-online"' : 'avatar-offline'}`}>
					<div className='w-12 rounded-full'>
						<img
							src={profilePic}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{fullName}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>
			{
				lastIndex !== index ? <div className='divider my-0 py-0 h-1' /> : null
			}
		</>
	);
};
export default Conversation;