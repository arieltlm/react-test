import React from 'react';
 
/**
 * 行类别
 */
class ProductCategoryRow extends React.Component{
    render (){
        const category = this.props.category;
        return (
            <tr>
                <th colSpan="2">
                    {category}
                </th>
            </tr>
        );
    }
}
 
/**
 * 行数据
 */
class ProductRow extends React.Component{
    render(){
        const product = this.props.product;
        const name = product.stocked?
            product.name:
            <span style={{color:'red'}}>
                {product.name}
            </span>; 
        return (
            <tr>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        );
    }
}
 
/**
 * 数据的表格
 */
class ProductTable extends React.Component{
    render(){
        const filterText = this.props.filterText;
        const inStockOnly = this.props.inStockOnly;
 
        const rows = [];
        let lastCategory = null;
 
        this.props.products.forEach((product) => {
            // 检查是否有相同
            if(product.name.indexOf(filterText)===-1){
                return;
            }
            if(inStockOnly && !product.stocked){
                return;
            }
 
            // 大类别
            if(product.category!==lastCategory){
                rows.push(
                    <ProductCategoryRow 
                        category={product.category}
                        key={product.category} />
                );
            }
            // 商品
            rows.push(
                <ProductRow 
                    product={product}
                    key={product.name} />
            );
            // 标记最近的类别
            lastCategory = product.category;
        });
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
        );
    }
}
 
/**
 * 搜索框
 */
class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }
 
    handleFilterTextChange(e){
        this.props.onFilterTextChange(e.target.value);        
    }
 
    handleInStockChange(e){
        this.props.onInStockChange(e.target.checked);
    }
 
    render(){ 
        return (
            <form>
                <input 
                    type="text" 
                    placeholder="search..." 
                    value={this.props.filterText}
                    onChange={this.handleFilterTextChange} />
                <p>
                    <input 
                        type="checkbox" 
                        checked={this.props.inStockOnly}
                        onChange={this.handleInStockChange}/>
                    {' '}
                    only show products in stock
                </p>
            </form>
        );
    }
}
 
/**
 * 整个页面
 */
class FilterTableProductTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filterText:'',
            inStockOnly:false
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }
 
    handleFilterTextChange(filterText){
        this.setState({
            filterText:filterText
        });
    }
 
    handleInStockChange(inStockOnly){
        this.setState({
            inStockOnly:inStockOnly
        });
    }
 
    render(){
        return (
            <div>
                <SearchBar 
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextChange={this.handleFilterTextChange}
                    onInStockChange={this.handleInStockChange}
                    />                
                <ProductTable 
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    />                
            </div>
        );
    }
}
 
 
 
// 导出table
export default FilterTableProductTable;
