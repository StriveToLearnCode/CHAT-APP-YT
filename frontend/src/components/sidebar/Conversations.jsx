import getRandomEmoji from "../../utils/getRandomEmoji.js";
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";
const Conversations = () => {

	const { loading,conversations } = useGetConversations()
	
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.length > 0 ? (
				conversations.map((conversation,index) => (
					<Conversation key={conversation._id} conversation={conversation} lastIndex={conversations.length - 1} index={index}  emoji={getRandomEmoji()} />
				))
			) : null}
			{loading ? (<span className="loading loading-spinner loading-md"></span>) : null}
		</div>
	);
};
export default Conversations;