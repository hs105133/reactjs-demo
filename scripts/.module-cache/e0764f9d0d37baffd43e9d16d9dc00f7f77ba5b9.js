var NOTE = React.createClass({displayName: "NOTE",
	getInitialState: function(){
		return {checked: true, editing: false};
	},
	handleChange: function(){
		this.setState({checked: !this.state.checked});
	},
	editNote: function(){
		this.setState({editing: true});
	},
	saveNote: function(){
		this.setState({editing: false });
	},
	deleteNote: function(){
		console.log("delete note...");
	},
	render: function(){
		var msg = "State is: ";
		if(this.state.checked){
			msg += "Checked";
		} else {
			msg += "Un- checked";
		}


		return (React.createElement("div", {className: "row"}, 
				React.createElement("div", {className: "col-sm-3"}, 
					React.createElement("div", {className: "thumbnail note"}, 	
					React.createElement("h1", null, React.createElement("input", {type: "checkbox", onChange: this.handleChange, defaultChecked: this.state.checked}), this.props.title), 
					React.createElement("p", null, this.props.children), 
					React.createElement("p", null,  msg ), 
					React.createElement("button", {type: "button", className: "btn btn-primary glyphicon glyphicon-pencil", onClick: this.editNote}), 
					React.createElement("button", {type: "button", className: "btn btn-danger glyphicon glyphicon-trash", onClick: this.deleteNote})
					)
					)
				)
			);
	}
});

React.render(React.createElement(NOTE, {title: "my Note"}, "Hello Papapa"), document.getElementById("output"));
