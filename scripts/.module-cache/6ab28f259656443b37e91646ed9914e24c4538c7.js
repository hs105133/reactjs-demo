var HelloApp = React.createClass({
	render: function(){
		return (
				<div>
					<h1>MY Hello World</h1>
					<p>I am little detail</p>
				</div>
			);
	}
});

React.render(<HelloApp />, document.getElementById("output"));
