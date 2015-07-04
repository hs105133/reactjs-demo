var HelloApp = React.createClass({displayName: "HelloApp",
	render: function(){
		return (
				React.createElement("div", null, 
					React.createElement("h1", null, "MY Hello World"), 
					React.createElement("p", null, "I am little detail")
				)
			);
	}
});

React.render(React.createElement(HelloApp, null), document.getElementById("output"));
