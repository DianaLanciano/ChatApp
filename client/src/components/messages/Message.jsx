import { useAuthContext } from "../../context/AuthContext";
import useConversation from '../../store/useConversation';
import timeFormat from "../../utils/formatTime";

const Message = ({ message }) => {

 const { authUser } = useAuthContext(); // to check the id of logged in user
 const { selectedConversation } = useConversation(); // to get the receiverId and senderId - needed for bubble in chat
 const fromMe = authUser._id === message.senderId;
 const chatClassName = fromMe ? 'chat-end' : 'chat-start';
 const bgColor = fromMe ? 'bg-blue-500' : '';
 const profilePicture = fromMe ? authUser.profilePicture : selectedConversation?.profilePicture;
 const messageReceivedHour = timeFormat(message.createdAt);


	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePicture} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bgColor}`}>{message.message}</div>
			<div className='chat-footer text-white opacity-50 text-xs flex gap-1 items-center'>{messageReceivedHour}</div>
		</div>
	);
};
export default Message;