import { createApp, h, onUnmounted, ref } from 'vue';
import Notification from '@/components/notification/Notification.vue';

type NotificationPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

interface NotificationOptions {
  message: string;
  position?: NotificationPosition;
  duration?: number;
  dangerouslyUseHTMLString?: boolean;
}

interface NotificationInstance {
  id: string;
  instance: ReturnType<typeof createApp>;
}

export function useNotification() {
  const notifications = ref<NotificationInstance[]>([]);
  const notificationContainer = ref<HTMLElement | null>(null);

  const createNotificationContainer = () => {
    if (!notificationContainer.value) {
      notificationContainer.value = document.createElement('div');
      notificationContainer.value.id = 'notification-container';
      document.body.appendChild(notificationContainer.value);
    }
  };

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex((n) => n.id === id);
    if (index !== -1) {
      notifications.value[index]?.instance.unmount();
      notifications.value.splice(index, 1);
      if (notifications.value.length === 0 && notificationContainer.value) {
        notificationContainer.value.remove();
        notificationContainer.value = null;
      }
    }
  };

  const notify = ({
    message,
    position = 'top-right',
    duration = 2000,
    dangerouslyUseHTMLString = false,
  }: NotificationOptions) => {
    createNotificationContainer();

    const id = `notification-${Date.now()}`;

    const notificationInstance = createApp({
      render() {
        return h(Notification, {
          message,
          position,
          duration,
          dangerouslyUseHTMLString,
          onClose: () => removeNotification(id),
        });
      },
    });

    const notificationElement = document.createElement('div');
    notificationContainer.value?.appendChild(notificationElement);
    notificationInstance.mount(notificationElement);

    //@ts-ignore
    notifications.value.push({ id, instance: notificationInstance });
  };

  const closeAll = () => {
    notifications.value.forEach(({ instance }) => instance.unmount());
    notifications.value = [];
    if (notificationContainer.value) {
      notificationContainer.value.remove();
      notificationContainer.value = null;
    }
  };

  onUnmounted(() => {
    closeAll();
  });

  return {
    notify,
    closeAll,
  };
}
