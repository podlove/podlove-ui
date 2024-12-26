const waitForTime = (time = 1000) => new Promise(resolve => {
  setTimeout(resolve, time);
});


export const waitForConidition = (condition: () => boolean, timeout = 10000): Promise<void> => new Promise((resolve) => {
  const fallback = setTimeout(resolve, timeout);

  const checkCondition = async () => {
    await waitForTime(10);

    const result = condition();

    if (result) {
      resolve();
      clearTimeout(fallback);
    }

    checkCondition();
  }

  checkCondition();
});
