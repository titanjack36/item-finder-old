import React from 'react';

import MainMenu from './menu/MainMenu';
import ItemList from './list/ItemList';

import './ListPage.css';

export default class ListPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [
                { key: 0, name: "item1", location: "test", tags: [] }
            ],
            filteredItems: [
                { key: 0, name: "item1", location: "test", tags: [] }
            ],
            filterText: "",
        };
        this.nextKey = 1;
    }

    addItem = (newItemProperties) => {
        let itemList = this.state.items;
        let nextItem = {
            key: this.nextKey,
            name: newItemProperties.name,
            location: newItemProperties.location,
            tags: []
        }
        let targetIndex =
            binarySearchInsertion(itemList, nextItem.name);
        itemList.splice(targetIndex, 0, nextItem);

        this.setState({
            items: itemList
        });
        this.nextKey++;
        this.filterItemList(this.state.filterText);
    }

    searchItem = searchText => {
        this.filterItemList(searchText);
    }

    deleteItem = itemKey => {
        let itemList = this.state.items;
        for (let i = 0; i < itemList.length; i++) {
            if (itemList[i].key === itemKey) {
                itemList.splice(i, 1);
            }
        }
        this.setState({
            items: itemList
        });
        this.filterItemList(this.state.filterText);
    }

    filterItemList = filterText => {
        if (filterText !== undefined && filterText.length > 0) {
            let filteredItemList = this.state.items.filter(
                item => item.name.includes(filterText)
            );
            this.setState({
                filteredItems: filteredItemList,
                filterText: filterText
            });
        } else {
            this.setState({
                filteredItems: this.state.items,
                filterText: ""
            });
        }
    }

    render() {
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
                />
            </div>
        )
    }
}

function binarySearchInsertion(itemList, itemName) {
    let itemListLen = itemList.length;
    if (itemListLen < 1) return 0;

    let lo = 0, hi = itemListLen;
    while (lo < hi) {
        let mid = parseInt((hi + lo) / 2);

        let result = compare(itemList[mid].name, itemName);

        if (result === '=') return mid;
        else if (result === '<') {
            if (mid + 1 >= itemListLen) return itemListLen;
            else {
                result = compare(itemList[mid + 1].name, itemName);
                if (result === '=' || result === '>')
                    return mid + 1;
                else lo = mid + 1;
            }
        } else if (result === '>') {
            if (mid - 1 < 0) return 0;
            else {
                result = compare(itemList[mid - 1].name, itemName);
                if (result === '=' || result === '<')
                    return mid;
                else hi = mid - 1;
            }
        } else return itemListLen;
    }

    return lo;
}

function compare(word1, word2) {
    if (word1 === word2) return '=';

    let wordIndex = 0;
    while (wordIndex === 0
        || word1[wordIndex - 1] === word2[wordIndex - 1]) {
        if (word1[wordIndex] < word2[wordIndex]) {
            return '<';
        } else if (word1[wordIndex] > word2[wordIndex]) {
            return '>';
        } else wordIndex++;
    }
    return 0;
}