import HomeScreen from '../screen/home';
import SecondScreen from '../screen/second';
import ThirdScreen from '../screen/third';

export default [
  { name: 'home', location: '/', component: HomeScreen },
  { name: 'second', location: '/2.html', component: SecondScreen },
  { name: 'third', location: '/3.html', component: ThirdScreen },
];
