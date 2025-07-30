const Message = () => {
	return (
		<div className='chat chat-start'>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src='https://img.daisyui.com/images/profile/demo/yellingcat@192.webp' />
				</div>
			</div>
			<div className={`chat-bubble pb-2`}>Hi!</div>
			<div className='chat-footer opacity-50 text-white text-xs flex gap-1 items-center'>12:42</div>
		</div>
	);
};
export default Message;