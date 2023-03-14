import "./UserModal.style.css";

const UserModal = ({ onClose, user }) => {
    return (
        <div id="UserModal" className="view-modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h3>User Data</h3>
                <div>
                    <div>
                        <label>First Name: {user.firstName}</label>
                    </div>
                    <div>
                        <label>Last Name: {user.lastName}</label>
                    </div>
                    <div>
                        <label>Balance: {user.balance}</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserModal;
