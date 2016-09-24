// @flow
import React from 'react';
import Button from '../base/Button';
import Toggle from '../base/Toggle';
import DotNavigation from '../base/DotNavigation';

import BarMeter from '../base/BarMeter';
import Slider from '../base/Slider';
import listEndModifier from '../enhancer/listEndModifier';
import listStartModifier from '../enhancer/listStartModifier';
import listRangeModifier from '../enhancer/listRangeModifier';

// import ResizableContent from '../base/ResizableContent';
// import LabelBox from '../base/LabelBox';
// import ProgressBar from '../base/ProgressBar';
// import GithubIcon from '../base/GithubIcon';

const Section = (props) => <div style={{ margin: '1em 0' }} {...props} />;
const ListEndBarMeter = listEndModifier(BarMeter);
const ListStartBarMeter = listStartModifier(BarMeter);
const ListRangeSlider = listRangeModifier(Slider);

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
