import React from 'react'
import { NotificationStyled } from './notification-style'

const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }
  console.log(notification)
  return (
    <NotificationStyled type={notification.type}>
      {notification.message}
    </NotificationStyled>
  )
}

export default Notification
