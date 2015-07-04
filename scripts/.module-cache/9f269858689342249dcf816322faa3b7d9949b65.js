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
		this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);
		this.setState({editing: false });
	},
	deleteNote: function(){
		console.log("delete note...");
	},
	renderDisplay: function(){
		var msg = "State is: ";
		if(this.state.checked){
			msg += "Checked";
		} else {
			msg += "Un- checked";
		}


		return (
				React.createElement("div", {className: "col-sm-3"}, 
					React.createElement("div", {className: "thumbnail note"}, 	
					React.createElement("h1", null, React.createElement("input", {type: "checkbox", onChange: this.handleChange, defaultChecked: this.state.checked}), this.props.title), 
					React.createElement("p", null, this.props.children), 
					React.createElement("p", null,  msg ), 
					React.createElement("button", {type: "button", className: "btn btn-primary glyphicon glyphicon-pencil", onClick: this.editNote}), 
					React.createElement("button", {type: "button", className: "btn btn-danger glyphicon glyphicon-trash", onClick: this.deleteNote})
					)
					)
			);
	},
	renderForm: function(){
		return (
				React.createElement("div", {className: "col-sm-3"}, 
					React.createElement("div", {className: "thumbnail note"}, 	
					React.createElement("textarea", {ref: "newText", defaultValue: this.props.children, className: "form-control"}), 
					React.createElement("button", {type: "button", className: "btn btn-primary glyphicon glyphicon-floppy-disk", onClick: this.saveNote})
					)
					)
			);
	},

	render: function(){
		if(this.state.editing){
			return this.renderForm();
		} else {
			return this.renderDisplay();
		}
	}
});

var BOARD = React.createClass({displayName: "BOARD",
	getInitialState: function(){
		return {
			notes: [
				"My 1st note",
				"Java Books",
				"News",
				"Twitter Rocks"
			]
		};
	},

	propTypes: {
		count: function(props, propName){
			if(typeof props[propName] !==  "number"){
				return new Error("property sud be number");
			}
			if(props[propName] > 10){
				return new Error("too many notes please be in limit");
			}
		}
	},
	updateNote: function(note, index){
		var arr = this.state.notes;
		arr[index] = note;
		this.setState({notes: arr});
	},
	removeNote: function(index){
		var arr = this.state.notes;
		arr.splice(index, 1);
		this.setState({notes: arr});	
	},	
	eachNote: function(note, i){
		return(React.createElement(NOTE, {index: i, onChange: this.updateNote, onRemove: this.removeNote}, note));
	},
	render: function(){
		return (
				React.createElement("div", {className: "board row"},  
					this.state.notes.map(this.eachNote)
				 )
			);	
	}
});

React.render(React.createElement(BOARD, {count: 10}, "Hello Papapa"), document.getElementById("output"));
