
import { useNavigate } from "react-router-dom";

const useHistoryHandler = () => {
	const navigate = useNavigate();

	const handleNavigation = (type, date) => {
		switch (type) {
			case "출고":
				navigate(`outgoings/${date}`);
				break;
			case "입고":
				navigate(`incomings/${date}`);
				break;
			case "조정":
				navigate(`adjusts/${date}`);
				break;
			default:
				break;
		}
	};

	return { handleNavigation };
};

export default useHistoryHandler;
