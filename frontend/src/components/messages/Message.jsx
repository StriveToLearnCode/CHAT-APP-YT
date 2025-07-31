import { extractTime } from "../../utils/extractTime.js";
import { useAuthContext } from "../../context/AuthContext.jsx";
import useCoversation from "../../zustand/useConversation";
const Message = ({ message }) => {
	const { message:msg,createdAt,receiverId} = message
	const { authUser } = useAuthContext()
	const { selectedConversation } = useCoversation()
	const fromMe = authUser?._id === receiverId
	const profilePic = !fromMe ? authUser.profilePic : selectedConversation?.profilePic;
	const bubbleBgColor = !fromMe ? "bg-blue-500" : "bg-gray-500";

	const shakeClass = message.shouldShake ? 'shake' : ""

	return (
		<div className={`chat ${fromMe ? 'chat-start' : 'chat-end'}`} >
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble pb-2 ${bubbleBgColor} ${shakeClass}`}>{msg}</div>
			<div className='chat-footer opacity-50 text-white text-xs flex gap-1 items-center'>{extractTime(createdAt)}</div>
		</div>
	);
};
export default Message;