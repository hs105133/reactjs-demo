var HelloApp = React.createClass({displayName: "HelloApp",
	render: function(){
		return (React.createElement("div", null, 
					React.createElement("h1", null, this.props.title), 
					React.createElement("p", null, "I am little detail")
				)
			);
	}
});

React.render(React.createElement("div", null, React.createElement(HelloApp, {title: "title 1"}, " I am lorem baby"), 
					React.createElement(HelloApp, {title: "Title 2"}), 
					React.createElement(HelloApp, {title: "Title 3"})
				), document.getElementById("output"));
