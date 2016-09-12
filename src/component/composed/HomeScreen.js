// @flow
import Button from '../presentational/Button';
import Toggle from '../presentational/Toggle';
import DotNavigation from '../presentational/DotNavigation';
import BarMeter from '../presentational/BarMeter';
// import Slider from '../presentational/Slider';
// import ResizableContent from '../presentational/ResizableContent';
// import LabelBox from '../presentational/LabelBox';
// import ProgressBar from '../presentational/ProgressBar';
// import GithubIcon from '../presentational/GithubIcon';
import React from 'react';
// import HomeScreen from './HomeScreen';

const Section = (props) => <div style={{ margin: '1em 0' }} {...props} />;

export default function HomeScreen() {
  return (
    <div>
      <div>hello home</div>
      <Section>
        <Button>Sample button</Button>
      </Section>
      <Section>
        <Toggle
          value={2}
          values={[1, 2, 3]}
          labels={['One', 'Two', 'Three']}
        />
      </Section>
      <Section>
        <DotNavigation value={1} values={[0, 1, 2, 3]} />
      </Section>
      <Section>
        <BarMeter value={0.5} />
      </Section>
    </div>
  );
}
