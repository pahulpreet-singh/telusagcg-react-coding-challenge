import { Toast } from "react-bootstrap";
import "./toast-notification.css"

const Notification = ({showToast, toastMessage, closeNotification}: NotificationProps) => {
    console.log("hey toast")
  return (
    <Toast
      bg="Warning"
      className="notification-toast m-4"
      onClose={closeNotification}
      show={showToast}
      autohide
    >
      <Toast.Body>
        <strong>{toastMessage}</strong>
      </Toast.Body>
    </Toast>
  );
};

interface NotificationProps {
    showToast: boolean,
    toastMessage: String,
    closeNotification: () => void,
}

export default Notification;