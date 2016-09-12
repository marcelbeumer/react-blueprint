// @flow
import React from 'react';
import Button from '../presentational/Button';
import Toggle from '../presentational/Toggle';
import DotNavigation from '../presentational/DotNavigation';

import ListStartBarMeter from '../connected/ListStartBarMeter';
import ListEndBarMeter from '../connected/ListEndBarMeter';
import ListRangeSlider from '../connected/ListRangeSlider';
// import ResizableContent from '../presentational/ResizableContent';
// import LabelBox from '../presentational/LabelBox';
// import ProgressBar from '../presentational/ProgressBar';
// import GithubIcon from '../presentational/GithubIcon';

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
        <ListStartBarMeter />
      </Section>
      <Section>
        <ListEndBarMeter />
      </Section>
      <Section>
        <ListRangeSlider />
      </Section>
    </div>
  );
}
