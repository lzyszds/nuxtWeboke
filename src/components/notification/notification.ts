// notification.ts
import { createApp } from 'vue'
import type { App } from 'vue';
import Notification from './Notification.vue'

type NotificationPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface NotificationOptions {
  message: string;
  position?: NotificationPosition;
  duration?: number;
  dangerouslyUseHTMLString?: boolean;
}

interface NotificationInstance {
  id: string;
  instance: App<Element>;
}

interface NotifyFunction {
  (options: NotificationOptions): void;
  closeAll: () => void;
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $notify: NotifyFunction;
  }
}

const notificationPlugin = {
  install(app: App) {
    let notifications: NotificationInstance[] = []
    let notificationContainer: HTMLElement | null = null

    const createNotificationContainer = () => {
      notificationContainer = document.createElement('div')
      notificationContainer.id = 'notification-container'
      document.body.appendChild(notificationContainer)
    }

    const removeNotification = (id: string) => {
      const index = notifications.findIndex(n => n.id === id)
      if (index !== -1) {
        notifications.splice(index, 1)
        if (notifications.length === 0 && notificationContainer) {
          notificationContainer.remove()
          notificationContainer = null
        }
      }
    }

    const notify: NotifyFunction = ({
      message,
      position = 'top-right',
      duration = 4500,
      dangerouslyUseHTMLString = false,
    }: NotificationOptions) => {
      if (!notificationContainer) {
        createNotificationContainer()
      }

      const id = `notification-${Date.now()}`

      const notificationInstance = createApp(Notification, {
        message,
        position,
        duration,
        dangerouslyUseHTMLString,
        onClose: () => removeNotification(id)
      })

      const notificationElement = document.createElement('div')
      notificationContainer?.appendChild(notificationElement)
      notificationInstance.mount(notificationElement)

      notifications.push({ id, instance: notificationInstance })
    }

    notify.closeAll = () => {
      notifications.forEach(({ instance }) => {
        instance.unmount()
      })
      notifications = []
      if (notificationContainer) {
        notificationContainer.remove()
        notificationContainer = null
      }
    }

    app.config.globalProperties.$notify = notify
  }
}

export default notificationPlugin
