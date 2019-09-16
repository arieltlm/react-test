import React, { useState, useEffect } from 'react';

function Example() {
	// 声明一个叫 “count” 的 state 变量。
	const [count, setCount] = useState(0);
	const [fruit, setFruit] = useState('banana');
	//   const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);

    // 相当于 componentDidMount 和 componentDidUpdate:
    // useEffect(() => {
    //     // 使用浏览器的 API 更新页面标题
    //     document.title = `You clicked ${count} times`;
	// });
	useEffect(() => {
		document.title = `You clicked ${count} times`;
		console.log('useEffect触发')
	}, [count]); // count发生变化时才触发
	return (
		<div>
			<p>You clicked {count} times</p>
			<button onClick={() => setCount(count + 1)}>
				Click me +1
			</button>
			<button onClick={() => setCount(count - 1)}>
				Click me -1
			</button>
			<p>The fruit is {fruit} now.</p>
			<button onClick={() => setFruit(fruit === 'apple' ? 'banana' : 'apple')}>
				fruit click set apple
			</button>

			<hr />
		</div>
	);
}


  

export default Example;