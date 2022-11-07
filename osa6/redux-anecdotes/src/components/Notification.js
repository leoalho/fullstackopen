import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const Notification = (props) => {
  const notification = props.notification
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if (notification){
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification