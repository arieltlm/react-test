import Immutable, {Map, Seq} from 'immutable';
export default function() {
    // Immutable.js 使用了 结构共享（Structure Sharing）会尽量复用内存，甚至以前使用的对象也可以再次被复用。没有被引用的对象会被垃圾回收。
    let a = Map({
        select: 'users',
        filter: Map({ name: 'Cam' })
    })
    let b = a.set('select', 'people');

    console.log(a === b); // false
    console.log(a.get('filter') === b.get('filter')); // true
    console.log(Immutable.is(a, b)); // false
    console.log(a.toJS()); // {select: "users", filter: {name: 'Cam'}}
    console.log(b.toJS()); // {select: "people", filter: {name: 'Cam'}}
    // immutable对象直接可以转JSON.stringify(),不需要显式手动调用toJS()转原生
    console.log(JSON.stringify(b)); // '{select: "people", filter: {name: 'Cam'}}'

    // 使用 === 来比较内存地址，性能最好。但即使两个对象的值是一样的，也会返回 false
    const map1 = Map({a:1, b:1, c:1});
    const map2 = Map({a:1, b:1, c:1});
    console.log(map1 === map2);// false

    // 直接比较值，immutable.js 提供了 Immutable.is 来做『值比较』
    console.log(Immutable.is(map1, map2)); // true

    // 判断对象是否是空可以直接用size
    console.log(a.size); // 2

    // 所有针对immutable变量的增删改必须左边有赋值，因为所有操作都不会改变原来的值，只是生成一个新的变量
    let arr = Immutable.fromJS([1,2,3,4])
    console.log(arr);// List[1,2,3,4]
    arr.push(5);
    console.log(arr);// List[1,2,3,4]
    arr = arr.push(5);
    console.log(arr);// List[1,2,3,4,5]

    // 获取深层深套对象的值时不需要做每一层级的判空
    //javascript
    const obj = {a:1}
    try {
        const res = obj.a.b.c   //error
        console.log(res);
    } catch {
    }
    //immutable
    const immutableData=Immutable.fromJS({a:1})
    const res1 = immutableData.getIn(['a', 'b', 'c'])  //undefined
    console.log(res1); //undefined


    var oddSquares = Seq([1,2,3,4,5,6,7,8])
        .filter(function(x) {
            console.log('immutable对象的filter执行' + x);
            return x % 2;
        }).map(x => x * x);
    console.log(oddSquares.get(1)); // 执行8次

    var jsSquares = [1,2,3,4,5,6,7,8]
        .filter(x => {
            console.log('原生数组的filter执行' + x);
            return x % 2;
        }).map(x => x * x);
    console.log(jsSquares[1]); // 执行3次


    // fromJS和toJS会深度转换数据，随之带来的开销较大，尽可能避免使用，单层数据转换使用Map()和List()
    // 数据量小的时候，差别不大
    var a1 = Map({name:'danny', children: {name: 'Tom'}, age:18})
    var a2;
    console.time();
    for (let i = 0; i< 10000000; i++ ) {
        a2 = Map(a1)
    }
    console.timeEnd(); // default: 342.76904296875ms
    var c;
    console.time();
    for (let i = 0; i< 10000000; i++ ) {
        c = Immutable.fromJS(a1)
    }
    console.timeEnd(); // 544.850830078125ms


    // js是弱类型，但Map类型的key必须是string！
    let oj = {1: 'one'};
    console.log(oj['1']); // 'one'
    console.log(oj[1]); // 'one'

    let ojmap = Map(oj);
    console.log(ojmap.get('1')); // 'one'
    console.log(ojmap.get(1)); // undefined

    // 如果要获取的KEY 不存在，则提供一个默认值
    const testsMap = Immutable.Map({
        name: 'Tom',
        child: 'Jack sen'
      });
    // Get child
    var blackW1 = testsMap.get('age');
    var blackW = testsMap.get('age', '23');
    console.log(blackW1); // undefined
    console.log(blackW); // 23

    // 获取深层次嵌套中的值
    const tests = Immutable.fromJS({
        hero1: {
            name: {
                heroName: 'Iron Man'
            }
        }
    });
    tests.getIn(['hero1', 'name', 'heroName']) // Iron Man

    // 获取第一个和最后一个值
    console.log(testsMap.first()); // Tom
    console.log(testsMap.last()); // Jack sen

    // Map中是否有此key
    console.log(testsMap.has('age')); // false
    // Map中深层是否有此key
    console.log(tests.hasIn(['hero1', 'name', 'heroName'])); // true

    // 列举key
    const akeys = testsMap.keys(); 
    console.log(akeys); // MapIterator数据类型
    // key的三种列举方式
    for (let i of testsMap.keys()) {
        console.log(i); // name, child
    }
    console.log(akeys.next()); // {value: "name", done: false}
    console.log(akeys.next()); // {value: "child", done: false}
    console.log(akeys.next()); // {value: undefined, done: true}

    const [...akeys1] = testsMap.keys(); 
    console.log(akeys1); // ["name", "child"]

    // 列举value
    const [...testsValues] = testsMap.values();
    console.log(testsMap.values()); // MapIterator数据类型
    console.log(testsValues); // ["Tom", "Jack sen"]

    // 使用entries()从Map中获取键和值
    const [...testsEntries] = testsMap.entries();
    console.log(testsEntries); //[["name", "Tom"],["child", "Jack sen"]]

    // 使用set（）将新的键/值对添加到Map；如果密钥已经存在，其值将被更新为新的值。
    const moretests = testsMap.set('age', 'Natasha Romanov');
    const moretests1 = testsMap.set('name', 'zhang');
    console.log(testsMap.toJS()); // {name: "Tom", child: "Jack sen"}
    console.log(moretests.toJS()); // {name: "Tom", child: "Jack sen", age: "Natasha Romanov"}
    console.log(moretests1.toJS()); // {name: "zhang", child: "Jack sen"}

    // 使用setIn（）方法向深度嵌套的Map中的现有键添加新值
    // 与Map.set（）不同的是，Map.setIn（）将一个新的键/值对添加到Map中，替换了现有键的值。如果要在深度嵌套的Map中添加新的键/值对，则需要使用Map.updateIn（）或Map.mergeIn
    const updatedname = tests.setIn(['hero1', 'name', 'realName'], 'Anthony Stark');  // 替换了之前的heroName
    console.log(updatedname.toJS());  // {hero1:{name: {heroName: "Iron Man", realName: "Anthony Stark"}}}

    // update作用于整个Map
    const updatedtests = testsMap.update((tests) => {
        return tests.set('name', 'is Tom');
    });
    console.log(updatedtests.toJS()); //  {name: "is Tom", child: "Jack sen"}

    // update用于简单的键/值 对
    const updatedtests1 = testsMap.update('name', (nameValue) => {
        return nameValue + ' is name';
    });
    console.log(updatedtests1.toJS()); // {name: "Tom is name", child: "Jack sen"}
    
    // update作用于在单个键/值对上，并且如果该键不存在则提供默认值
    const updatedtests2 = testsMap.update('theHulk', 'Bruce Banner', (theHulkValue) => {
        return theHulkValue + ' Smash!';
    });
    console.log(updatedtests2.toJS()); // {name: "Tom", child: "Jack sen", theHulk: "Bruce Banner Smash!"}

    // 删除
    const lonelyname = testsMap.delete('name');  
    console.log(lonelyname.toJS()); // {child: "Jack sen"}
    // 深层次删除
    const lonelyname1 = tests.deleteIn(['hero1', 'name', 'heroName']); 
    console.log(lonelyname1.toJS()); // {hero1:{name: {}}}
    // 全部清除
    const emptyname = tests.clear(); 
    console.log(emptyname.toJS()); // {}

    // 合并 
    const original = { x: 123, y: 456 };
    const t = { y: 789, z: 'abc' };
    const newV = Immutable.merge(original,t);
    console.log(newV); // {x: 123, y: 789, z: "abc"} (js对象merge后是js对象)
    console.log(original); // {x: 123, y: 456}
    const newImmutableV = Immutable.merge(Map(original), Map(t));
    console.log(newImmutableV.toJS()); // {x: 123, y: 789, z: "abc"} 

    // mergeWith可对旧值和新值进行操作
    console.log(Immutable.mergeWith(
        (oldVal, newVal) => oldVal + newVal,
        original,
        t
    )) // { x: 123, y: 1245, z: 'abc' }

    // mergeDeep可操作深层合并
    const original1 = { x: { y: 123 }}
    console.log(Immutable.mergeDeep(original1, { x: { z: 456 }})) // { x: { y: 123, z: 456 }}
    console.log(original) // { x: { y: 123 }}

    // mergeDeepWith可操作深层合并计算
    console.log(Immutable.mergeDeepWith(
        (oldVal, newVal) => oldVal + newVal,
        original1,
        { x: { y: 456 }}
    )) // { x: { y: 579 }}
}
