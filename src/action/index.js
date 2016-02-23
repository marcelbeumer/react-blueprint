export const setGreeting = greeting => ({
  type: 'SET_GREETING',
  payload: greeting,
});

export const generateDots = () => ({
  type: 'GENERATE_DOTS',
});

export const generateBars = () => ({
  type: 'GENERATE_BARS',
});
