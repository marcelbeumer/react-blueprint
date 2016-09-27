// @flow
import React from 'react';
import type { Element } from 'react';
import type { List } from 'immutable';

type DataSource = (Array<any>|List<any>);
type ItemFactory = (item: any) => Element<*>;
type ListOfItemsPropTypes = { items: DataSource };

const listOfItems = (itemFactory: ItemFactory) => (RootComponent: Function) =>
  ({ items }: ListOfItemsPropTypes) => (
    <RootComponent>
      { items.map((item, i) => itemFactory(item, i, items)) }
    </RootComponent>
  );

export default listOfItems;
