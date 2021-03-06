import { useNavigate } from 'react-router-dom';

const GoBackButton = ({ text }) => {
  const navigate = useNavigate();
  return <button type='link' onClick={() => navigate(-1)}>{text}</button>;
};

GoBackButton.defaultProps = {
  text: 'Go back',
};

export default GoBackButton;
