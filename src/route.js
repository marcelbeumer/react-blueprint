import { createRoute } from './router';

export default function createRoutes(actions) {
  const setScreen = match => actions.setScreen(match.name);

  return {
    third: createRoute('/3', setScreen),
    second: createRoute('/2', setScreen),
    home: createRoute('/', setScreen),
  };
}
