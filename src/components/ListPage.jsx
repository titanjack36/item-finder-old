import React from 'react';

import MainMenu from './menu/MainMenu';
import ItemList from './list/ItemList';

import './ListPage.css';

export default class ListPage extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      items: [
        { key: 0, name: 'item1', location: 'test', tags: [{ key: 0, value: 'tag1' }, { key: 1, value: 'tag2' }] }
      ],
      filteredItems: [
        { key: 0, name: 'item1', location: 'test', tags: [{ key: 0, value: 'tag1' }, { key: 1, value: 'tag2' }] }
      ],
      filterText: '',
      filterBy: 'name'
    };
    this.nextKey = 1;
  }

  addItem = (newItemProperties) => {
    const itemList = this.state.items;
    const nextItem = {
      key: this.nextKey,
      name: newItemProperties.name,
      location: newItemProperties.location,
      tags: newItemProperties.tags
    };
    const targetIndex =
          binarySearchInsertion(itemList, nextItem.name);
    itemList.splice(targetIndex, 0, nextItem);

    this.setState({
      items: itemList
    });
    this.nextKey++;
    this.filterItemList(this.state.filterText);
  }

  searchItem = (searchText, searchBy) => {
    this.filterItemList(searchText, searchBy);
  }

  deleteItem = itemKey => {
    this.setState(state => ({
      items: state.items.filter(listItem =>
        listItem.key !== itemKey
      )
    }));
    this.filterItemList(this.state.filterText);
  }

  editItem = item => {
    const itemList = this.state.items;
    for (let i = 0; i < itemList.length; i++) {
      if (itemList[i].key === item.key) {
        itemList[i] = item;
      }
    }
    this.setState({ items: itemList });
    this.filterItemList(this.state.filterText);
  }

  filterItemList = (filterText, filterBy) => {
    if (filterText !== undefined && filterText.length > 0) {
      let filteredItemList = [];

      switch (filterBy) {
        case 'location':
          filteredItemList = this.state.items.filter(
            item => item.location.includes(filterText)
          );
          break;

        case 'tags':
          filteredItemList = this.state.items.filter(
            item => {
              return (
                item.tags.filter(
                  tag => tag.value.includes(filterText)
                ).length > 0
              );
            }
          );
          break;

        // by default, search by item name
        default:
          filteredItemList = this.state.items.filter(
            item => item.name.includes(filterText)
          );
          break;
      }

      this.setState({
        filteredItems: filteredItemList,
        filterText: filterText
      });
    } else {
      this.setState({
        filteredItems: this.state.items,
        filterText: ''
      });
    }
  }

  render () {
    return (
      <div className="main-container">
        <MainMenu
          onSearchItem={this.searchItem}
          onNewItemCreated={this.addItem}
        />
        <ItemList
          items={this.state.filteredItems}
          totalItemAmt={this.state.items.length}
          onDeleteItem={this.deleteItem}
          onEditItem={this.editItem}
        />
      </div>
    );
  }
}

function binarySearchInsertion (itemList, itemName) {
  const itemListLen = itemList.length;
  if (itemListLen < 1) {
    return 0;
  }

  let lo = 0; let hi = itemListLen;
  while (lo < hi) {
    const mid = parseInt((hi + lo) / 2);
    let result = compare(itemList[mid].name, itemName);

    if (result === '=') {
      return mid;
    } else if (result === '<') {
      if (mid + 1 >= itemListLen) {
        return itemListLen;
      } else {
        result = compare(itemList[mid + 1].name, itemName);
        if (result === '=' || result === '>') {
          return mid + 1;
        } else {
          lo = mid + 1;
        }
      }
    } else if (result === '>') {
      if (mid - 1 < 0) {
        return 0;
      } else {
        result = compare(itemList[mid - 1].name, itemName);
        if (result === '=' || result === '<') {
          return mid;
        } else {
          hi = mid - 1;
        }
      }
    } else {
      return itemListLen;
    }
  }

  return lo;
}

function compare (word1, word2) {
  if (word1 === word2) {
    return '=';
  }

  let wordIndex = 0;
  while (wordIndex === 0 ||
        word1[wordIndex - 1] === word2[wordIndex - 1]) {
    if (word1[wordIndex] < word2[wordIndex]) {
      return '<';
    } else if (word1[wordIndex] > word2[wordIndex]) {
      return '>';
    } else wordIndex++;
  }
  return 0;
}
