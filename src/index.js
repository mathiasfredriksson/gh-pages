import React from 'react'
import ReactDOM from 'react-dom';

const Index = () => {

	return <div className='container'>
		<div />
		<Content />
		<div />
	</div>
};

const Content = () => {

	return <div className='content'>
		<p className='title'>Mathias Fredriksson</p>
		<span className='description'>Quis autem vel eum iure reprehenderit, qui inea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus</span>
	</div>
}

ReactDOM.render(
	<React.StrictMode>
		<Index />
	</React.StrictMode>,
	document.getElementById('root')
);