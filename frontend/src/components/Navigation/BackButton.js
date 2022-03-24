import { useHistory } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";

export const BackButton = () => {
  const history = useHistory();

  return (
    <button className="button-none" onClick={(e) => history.goBack()}>
      <h1>
        <FaAngleLeft />
      </h1>
    </button>
  );
};
