// @flow
import React from 'react';
import pureRender from './pure-render';
import StyleSheet from './styles';
import theme from './theme';
import cx from 'classnames';

export const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    borderRadius: theme.baseBorderRadius,
    overflow: 'hidden',
  },
  item: {
    flex: 1,
    display: 'inline-block',
    color: theme.textColor,
    backgroundColor: theme.inactiveBackgroundColor,
    padding: '5px 12px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  activeItem: {
    color: theme.inverseTextColor,
    backgroundColor: theme.highlightColor,
  },
});

type ItemConfig = { value: any, label: string };

export default class Toggle extends React.Component {
  props: {
    value: any,
    values: Array<ItemConfig>,
    onChange?: Function
  };

  onItemClick: Function = (clickedValue: any) => {
    const { value, onChange } = this.props;
    if (clickedValue !== value && onChange) onChange(clickedValue);
  };

  renderItem(config: ItemConfig, value: any) {
    const active = config.value === value;
    return (
      <div
        key={config.value}
        className={cx(styles.item, active && styles.activeItem)}
        onClick={() => this.onItemClick(config.value)}
      >
        {config.label}
      </div>
    );
  }

  render() {
    const { values, value } = this.props;
    return (
      <div className={styles.wrapper}>
        {values.map(item => this.renderItem(item, value))}
      </div>
    );
  }
}

pureRender(Toggle);
