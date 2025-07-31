import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages.js";
import MessageSkeleton from "../skeletrons/MessageSkeleton";
import { useEffect, useRef } from "react";
import useListenMessage from "../../hooks/useListenMessage.js";
const Messages = () => {
	const { messages, loading } = useGetMessages()
	useListenMessage()
	const messageRef = useRef()
	useEffect(() => {
		messageRef.current?.scrollIntoView({ behavior: "smooth" });
	},[messages])
	return (
		<div className='px-4 flex-1 overflow-auto'>
			{ loading ? Array.from({ length: 4 }).map((_, index) => (
				<MessageSkeleton key={index} />
			)) : null }
			{!loading && messages.length === 0 && (
				<p className='text-center text-white'>发送消息开启对话</p>
			)}
			{ !loading && messages.length > 0 && messages.map((message) => (
				<div key={message._id} ref={messageRef}>
					<Message message={message} />
				</div>
			))}
		</div>
	);
};
export default Messages;