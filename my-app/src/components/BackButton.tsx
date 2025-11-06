import { useNavigate } from "react-router-dom";
import leftIcon from '../../src/assets/left-icon.svg'
import '../styles/myAccountPageStyles/BackButton.scss'


export default function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/"); // fallback to homepage
    }
  };

  return (
    <div  className="back-button" >
    <button onClick={handleBack}><img src={leftIcon} alt="" /> Go Back</button>
    </div>
  );
}
