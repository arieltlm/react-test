import React from 'react';

class ProductDataBase extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            inputValue: '',
            checkStock: false
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }
    handleSearchChange (searchValue, isStocking) {
        this.setState({
            inputValue: searchValue,
            checkStock: isStocking
        })
    }
    render () {
        return (
            <div>
               <SearchBar
               inputValue={this.state.inputValue}
               checkStock={this.state.checkStock}
               searchChange={this.handleSearchChange}></SearchBar>
               <ProductTable
               fliterData={this.props.tableData}
               inputValue={this.state.inputValue}
               checkStock={this.state.checkStock}></ProductTable> 
            </div>
        )
    }
}
// 搜索框
class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange (e) {
        const type = e.target.type;
        let inputValue = type === 'text' ? e.target.value: this.props.inputValue;
        let checkStock = type === 'checkbox' ? e.target.checked : this.props.checkStock;
        this.props.searchChange(inputValue, checkStock);
    }
    render () {
        const searchValue = this.props.inputValue;
        const checkStock = this.props.checkStock;
        return (
            <div>
                <input type="text" name="searchValue" placeholder="Search..." value={searchValue} onChange={this.handleChange}/><br />
                <input type="checkbox" name="isStocking" checked={checkStock} onChange={this.handleChange}/>Only show products in stock
            </div>
        )
    }
}
// 数据表格
function ProductTable (props) {
    console.log(props);
    const product = props.fliterData;
    const inputValue = props.inputValue;
    const checkStock = props.checkStock;

    const rows = [];
    let lastCategory = null;
    product.map((item, index) => {
        if (item.name.toLowerCase().indexOf(inputValue.toLowerCase()) === -1) {
            return;
        }
        if (checkStock && !item.stocked) {
            return;
        }
        if (item.category !== lastCategory) {
            rows.push(
                <ProductCategoryRow
                category={item.category}
                key={item.category}/>
            )
        }
        rows.push(
            <ProductRow
            price={item.price}
            name={item.name}
            stocked={item.stocked}
            key={item.name}/>
        )
        lastCategory = item.category;
    })
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}
// 行类别
function ProductCategoryRow (props) {
    const category = props.category;
    return (
        <tr>
            <th colSpan="2" style={{color:'blue'}}>{category}</th>
        </tr>
    )
}
// 行元素
function ProductRow (props) {
    const price = props.price;
    const name = props.stocked ?
        props.name :
        <span style={{color:'red'}}>
            {props.name}
        </span>
    return (
        <tr>
            <td>{name}</td>
            <td>{price}</td>
        </tr>
    )
}

export default ProductDataBase;