
export const useThreadTasks = defineStore('threadTasks', () => {
  const tasks = ref<(() => Promise<any>)[]>([]);
  let runningTaskIndex = 0;
  let maxRunningTask = 2;

  const setMaxRunningTask = (max: number) => {
    maxRunningTask = max;
  }

  const addTask = (time: number, task: () => void) => {
    tasks.value.push(sleep(time, task));
    runNextTask(); // 尝试立即运行任务
  };

  const sleep = (time: number, callback: () => void) => {
    return () => new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
        callback();
      }, time)
    });
  }

  const runNextTask = async () => {
    if (runningTaskIndex >= maxRunningTask) {
      return; // 所有任务已完成
    }

    const task = tasks.value.shift()
    if (task) {
      await task().finally(() => {
        runningTaskIndex++; // 完成当前任务，准备执行下一个任务
        runNextTask(); // 任务完成后，尝试运行下一个任务
      });
    }
  };


  return { setMaxRunningTask, addTask, runNextTask, sleep };
});
