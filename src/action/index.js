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

export const updateSliders = (index, value) => ({
  type: 'UPDATE_SLIDERS',
  payload: { index, value },
});

export const setResizableContentHeight = height => ({
  type: 'SET_RESIZABLE_CONTENT_HEIGHT',
  payload: height,
});
