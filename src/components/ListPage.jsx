import React from 'react';

import { flatten } from 'flat';
import { IntlProvider } from "react-intl";
import lang_en from '../assets/i18n/messages/en.json';
import lang_zh from '../assets/i18n/messages/zh.json';

import MainMenu from './menu/MainMenu';
import SidePanel from './side-panel/SidePanel';
import ItemList from './list/ItemList';

import './ListPage.css';

const messages = {
  'en': flatten(lang_en, { safe: true }),
  'zh': flatten(lang_zh, { safe: true })
}

export default class ListPage extends React.Component {
  constructor(props) {
    super(props);

    this.sidePanel = React.createRef();
    this.state = {
      //items: [
      //  { key: 0, name: 'item1', location: 'test', tags: [{ key: 0, value: 'tag1' }, { key: 1, value: 'tag2' }] }
      //],
      //filteredItems: [
      //  { key: 0, name: 'item1', location: 'test', tags: [{ key: 0, value: 'tag1' }, { key: 1, value: 'tag2' }] }
      //],
      homes: [{ id: 0, name: "Home", items: [] }],
      selectedHome: 0,
      filteredItems: [],
      filterText: '',
      filterBy: 'name',
      locale: 'en-US',
      messages: messages['en']
    };
    this.nextKey = 1;
  }

  addItem = (newItemProperties) => {
    const homes = this.state.homes;
    const selectedHome = this.state.selectedHome;
    const itemList =
      homes[selectedHome].items;
    const nextItem = {
      key: this.nextKey,
      name: newItemProperties.name,
      location: newItemProperties.location,
      tags: newItemProperties.tags
    };
    const targetIndex =
      binarySearchInsertion(itemList, nextItem.name);
    itemList.splice(targetIndex, 0, nextItem);

    homes[selectedHome].items = itemList;
    this.setState({
      homes: homes
    });
    this.nextKey++;
    this.filterItemList(this.state.filterText);
  }

  searchItem = (searchText, searchBy) => {
    this.filterItemList(searchText, searchBy);
  }

  deleteItem = itemKey => {
    const homes = this.state.homes;
    const selectedHome = this.state.selectedHome;

    homes[selectedHome].items =
      homes[selectedHome].items.filter(listItem =>
        listItem.key !== itemKey);
    this.setState({ homes: homes })
    this.filterItemList(this.state.filterText);
  }

  editItem = item => {
    const homes = this.state.homes;
    const selectedHome = this.state.selectedHome;
    const itemList = homes[selectedHome].items;
    for (let i = 0; i < itemList.length; i++) {
      if (itemList[i].key === item.key) {
        itemList[i] = item;
      }
    }
    homes[selectedHome].items = itemList;
    this.setState({ homes: homes });
    this.filterItemList(this.state.filterText);
  }

  filterItemList = (filterText, filterBy) => {
    const selectedHome = this.state.selectedHome;
    if (filterText !== undefined && filterText.length > 0) {
      const homes = this.state.homes;
      const itemList = homes[selectedHome].items;

      let filteredItemList = [];

      switch (filterBy) {
        case 'location':
          filteredItemList = itemList.filter(
            item => item.location.toLowerCase()
              .includes(filterText.toLowerCase())
          );
          break;

        case 'tags':
          filteredItemList = itemList.filter(
            item => {
              return (
                item.tags.filter(
                  tag => tag.value.toLowerCase()
                    .includes(filterText.toLowerCase())
                ).length > 0
              );
            }
          );
          break;

        // by default, search by item name
        default:
          filteredItemList = itemList.filter(
            item => item.name.toLowerCase()
              .includes(filterText.toLowerCase())
          );
          break;
      }

      this.setState({
        filteredItems: filteredItemList,
        filterText: filterText
      });
    } else {
      this.setState({
        filteredItems:
          this.state.homes[selectedHome].items,
        filterText: ''
      });
    }
  }

  toggleLanguage = nextLanguage => {
    if (nextLanguage && nextLanguage.length >= 2) {
      this.setState({
        locale: nextLanguage,
        messages: messages[nextLanguage.substring(0, 2)]
      });
    }
  }

  toggleSidePanel = () => {
    this.sidePanel.current.handleToggleSidePanel();
  }

  selectHome = homeId => {
    this.state.homes.forEach((home, index) => {
      if (home.id === homeId) {
        this.setState({ selectedHome: index });
      }
    });
  }

  addNewHome = newHome => {
    let homes = this.state.homes;
    homes.push({
      id: newHome.id,
      name: newHome.name,
      items: []
    });
    this.setState({
      homes: homes
    })
  }

  render() {
    return (
      <IntlProvider
        locale={this.state.locale}
        messages={this.state.messages}
      >
        <div className="main-container">
          <MainMenu
            onSearchItem={this.searchItem}
            onNewItemCreated={this.addItem}
            onToggleLanguage={this.toggleLanguage}
            onToggleSidePanel={this.toggleSidePanel}
          />
          <SidePanel
            ref={this.sidePanel}
            onSelectHome={this.selectHome}
            onAddNewHome={this.addNewHome}
          />
          <ItemList
            listName={
              this.state.homes[this.state.selectedHome]
                .name
            }
            items={this.state.filteredItems}
            totalItemAmt={
              this.state.homes[this.state.selectedHome]
                .items.length
            }
            onDeleteItem={this.deleteItem}
            onEditItem={this.editItem}
          />
        </div>
      </IntlProvider>
    );
  }
}

function binarySearchInsertion(itemList, itemName) {
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

function compare(word1, word2) {
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
