/**
 * 功能: 
 * 作者: tanglimei
 * 日期: 2020.01.14
 */

 import {
     React,
     PropTypes,
     noop,
 } from 'framework/Util'
 // import {  } from 'antd'
 // import './scss/index.scss'
 
 const Xxxxxx = function ({ 
   getValue
 }) { 
    React.useMemo(() => {
        const customer={
            address:{
                city:'beijing',
                cityArr:['beijing','shanghai','nanjing'],
                street:'12'
            }
        }
        //对象
        const cityValOld= customer && customer.address && customer.address.city
        const cityValNew=customer?.address?.city 
        const zipcode=customer?.address?.zipcode
        
        console.log('%c cityValOld===', 'color:#497EFC;background: #03FECF;', cityValOld)
        console.log('%c cityValNew===', 'color:#497EFC;background: #03FECF;', cityValNew)
        console.log('%c zipcode===', 'color:#497EFC;background: #03FECF;', zipcode)
        
        // 数组
        const cityArrOld=customer && customer.address 
        && customer.address.cityArr&& customer.address.cityArr[0]  
        
        const cityArr0New=customer?.address?.cityArr?.[0]   
        const cityArr5New=customer?.address?.cityArr?.[5]
        
        console.log('%c ==============', 'color:red;background: pink;', )
        
        console.log('%c cityArrOld===', 'color:#497EFC;background: #03FECF;', cityArrOld)
        console.log('%c cityArr0New===', 'color:#497EFC;background: #03FECF;', cityArr0New)
        console.log('%c cityArr5New===', 'color:#497EFC;background: #03FECF;', cityArr5New)
        
        console.log('%c ==============', 'color:red;background: pink;', )
        const arrs = [1,2,3]
        const newArrs = arrs?.map(item=>{
            return item
        })
        console.log('%c newArrs===', 'color:#497EFC;background: #03FECF;', newArrs)
        
        const handleChange = (e) => {
            e && e.preventDefault() 
            e?.preventDefault() 
        }
        
        getValue && getValue() 
        if(getValue){
            getValue()
        }
        getValue?.() 
    },[])
    

     return (
         <div className="main-content">
             <pre style={{fontWeight: 900, fontSize:16}}>
    {`   const customer={
        address:{
            city:'beijing',
            cityArr:['beijing','shanghai','nanjing'],
            street:'12'
        }
    }
    //对象
    const cityValOld= customer && customer.address && customer.address.city
    const cityValNew=customer?.address?.city 
    const zipcode=customer?.address?.zipcode
    
    console.log('%c cityValOld===', 'color:#497EFC;background: #03FECF;', cityValOld)
    console.log('%c cityValNew===', 'color:#497EFC;background: #03FECF;', cityValNew)
    console.log('%c zipcode===', 'color:#497EFC;background: #03FECF;', zipcode)
    // 数组
    const cityArrOld=customer && customer.address 
    && customer.address.cityArr&& customer.address.cityArr[0]  
    const cityArr0New=customer?.address?.cityArr?.[0]   
    const cityArr5New=customer?.address?.cityArr?.[5]
    
    console.log('%c cityArrOld===', 'color:#497EFC;background: #03FECF;', cityArrOld)
    console.log('%c cityArr0New===', 'color:#497EFC;background: #03FECF;', cityArr0New)
    console.log('%c cityArr5New===', 'color:#497EFC;background: #03FECF;', cityArr5New)
    
    
    const arrs = [1,2,3]
    const newArrs = arrs?.map(item=>{
        return item
    })
    console.log('%c newArrs===', 'color:#497EFC;background: #03FECF;', newArrs)
    
    // 函数
    getValue && getValue() 
    if(getValue){
        getValue()
    }
    getValue?.() 
             `}
             </pre>
         </div>
     )
 }
 
 Xxxxxx.propTypes = {
    getValue: PropTypes.func
 }
 
 Xxxxxx.defaultProps = {
    getValue: noop
 }  
 
 export default Xxxxxx
 