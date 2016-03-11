import { createRoute } from './router';

export default function createRoutes(getActions) {
  const setScreen = match => getActions().setScreen(match.name);

  return {
    third: createRoute('/3.html', setScreen),
    second: createRoute('/2.html', setScreen),
    home: createRoute('/', setScreen),
  };
}
