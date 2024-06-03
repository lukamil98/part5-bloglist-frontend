import PropTypes from "prop-types"

const Notification = ({ message }) => (
  <div
    style={{ border: "solid", padding: 10, borderWidth: 1, marginBottom: 10 }}
  >
    {message}
  </div>
)

Notification.propTypes = {
  message: PropTypes.string.isRequired,
}

export default Notification
