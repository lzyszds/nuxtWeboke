import { createApp, h, onUnmounted, ref } from 'vue';
import Notification from '@/components/notification/Notification.vue';

// 定义通知组件可能出现的位置类型
type NotificationPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

// 定义通知选项接口
interface NotificationOptions {
  message: string;                        // 通知消息内容
  position?: NotificationPosition;        // 通知显示位置
  duration?: number;                      // 通知显示时长
  type?: "success" | "error" | "warning" | "info"; // 通知类型
  dangerouslyUseHTMLString?: boolean;    // 是否将message作为HTML字符串处理
}

// 定义通知实例接口
interface NotificationInstance {
  id: string;                            // 通知唯一标识
  instance: ReturnType<typeof createApp>; // 通知对应的Vue应用实例
}

export function useNotification() {
  // 存储所有活动的通知实例
  const notifications = ref<NotificationInstance[]>([]);
  // 存储通知容器的DOM引用
  const notificationContainer = ref<HTMLElement | null>(null);

  // 创建通知容器的方法
  const createNotificationContainer = () => {
    if (!notificationContainer.value) {
      notificationContainer.value = document.createElement('div');
      notificationContainer.value.id = 'notification-container';
      document.body.appendChild(notificationContainer.value);
    }
  };

  // 移除指定通知的方法
  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex((n) => n.id === id);
    if (index !== -1) {
      // 卸载通知实例并从数组中移除
      notifications.value[index]?.instance.unmount();
      notifications.value.splice(index, 1);
      // 如果没有活动的通知了，移除容器
      if (notifications.value.length === 0 && notificationContainer.value) {
        notificationContainer.value.remove();
        notificationContainer.value = null;
      }
    }
  };

  // 创建新通知的方法
  const notify = ({
    message,
    position = 'top-right',
    duration = 2000,
    type = 'info',
    // 是否将message作为HTML字符串处理
    dangerouslyUseHTMLString = false,
  }: NotificationOptions) => {
    // 确保容器存在
    createNotificationContainer();

    // 生成唯一的通知ID
    const id = `notification-${Date.now()}`;

    // 创建新的Vue应用实例来承载通知组件
    const notificationInstance = createApp({
      render() {
        return h(Notification, {
          message,
          position,
          duration,
          type: type,
          dangerouslyUseHTMLString,
          onClose: () => removeNotification(id),
        });
      },
    });

    // 创建DOM元素并挂载通知实例
    const notificationElement = document.createElement('div');
    notificationContainer.value?.appendChild(notificationElement);
    notificationInstance.mount(notificationElement);

    // @ts-ignore 将新通知添加到通知列表中 
    notifications.value.push({ id, instance: notificationInstance });
  };

  // 关闭所有通知的方法
  const closeAll = () => {
    // 卸载所有通知实例
    notifications.value.forEach(({ instance }) => instance.unmount());
    notifications.value = [];
    // 移除通知容器
    if (notificationContainer.value) {
      notificationContainer.value.remove();
      notificationContainer.value = null;
    }
  };

  // 组件卸载时清理所有通知
  onUnmounted(() => {
    closeAll();
  });

  // 返回可用的方法
  return {
    notify,
    closeAll,
  };
}
