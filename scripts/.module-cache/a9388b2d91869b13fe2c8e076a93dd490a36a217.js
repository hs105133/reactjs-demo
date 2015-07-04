var NOTE = React.createClass({displayName: "NOTE",
	editNote: function(){
		console.log("editing...");
	},
	deleteNote: function(){
		console.log("delete note...");
	},
	render: function(){
		return (React.createElement("div", {className: "row"}, 
				React.createElement("div", {className: "col-sm-3"}, 
					React.createElement("div", {className: "thumbnail"}, 	
					React.createElement("h1", null, this.props.title), 
					React.createElement("p", null, this.props.children), 
					React.createElement("button", {type: "button", className: "btn btn-primary glyphicon glyphicon-pencil", onClick: this.editNote}), 
					React.createElement("button", {type: "button", className: "btn btn-danger glyphicon glyphicon-trash", onClick: this.deleteNote})
					)
					)
				)
			);
	}
});

React.render(React.createElement(NOTE, {title: "my Note"}, "Hello Papapa"), document.getElementById("output"));
