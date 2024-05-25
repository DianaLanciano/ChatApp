import { useEffect, useState } from "react";
import useConversation from "../store/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
	
		const getMessages = async() => {
			try {
			const res = await fetch(`/api/message/${selectedConversation._id}`);
			const data = await res.json();
			if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				console.log(error.message);
			}
			
		};
		if (selectedConversation?._id) getMessages();
	
		
		
	}, [selectedConversation?._id]);

	return { messages, loading };
	
};
export default useGetMessages;