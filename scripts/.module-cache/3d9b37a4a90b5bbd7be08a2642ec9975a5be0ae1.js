var NOTE = React.createClass({displayName: "NOTE",
	getInitialState: function(){
		return {checked: true, editing: false};
	},
	getDefaultProps: function(){
		return {
			colorIndex: -1
		};
	},
	updateBGColor: function(){
		this.setProps({colorIndex: this.props.colorIndex + 1 })
	},
	componentWillReceiveProps: function(nextProps){
		var color = nextProps.colors.split(",")[nextProps.colorIndex];

		if(!color) this.setProps({colorIndex: 0 });
		this.setState({backgroundColor: color});
	},
	componentWillMount: function(){
		// before render
		this.style = {
			right: this.randomBetween(0, window.innerWidth - 300) + 'px', 
			top: this.randomBetween(0, window.innerHeight - 200) + 'px',
			transform: 'rotate('+ this.randomBetween(-15, 15)+ 'deg)' 
		};
	},
	componentDidMount: function(){
		console.log("mounted "+ this.props.index);
	},
	randomBetween: function(min, max){
		return min + Math.ceil(Math.random() * max);	
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
		this.props.onRemove(this.props.index);
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
					React.createElement("div", {className: "thumbnail note", style: this.state}, 	
						React.createElement("h1", null, React.createElement("input", {type: "checkbox", onChange: this.handleChange, defaultChecked: this.state.checked}), this.props.index), 
						React.createElement("p", null, this.props.key, " - ", this.props.children), 
						React.createElement("p", null,  msg ), 
						React.createElement("button", {type: "button", className: "btn btn-primary glyphicon glyphicon-pencil", onClick: this.editNote}), 
						React.createElement("button", {type: "button", className: "btn btn-danger glyphicon glyphicon-trash", onClick: this.deleteNote})
					)
			);
	},
	renderForm: function(){
		return (
					React.createElement("div", {className: "thumbnail note", style: this.style}, 	
					React.createElement("textarea", {ref: "newText", defaultValue: this.props.children, className: "form-control"}), 
					React.createElement("button", {type: "button", className: "btn btn-primary glyphicon glyphicon-floppy-disk", onClick: this.saveNote})
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
				// "My 1st note",
				// "Java Books",
				// "News",
				// "Twitter Rocks"
			]
		};
	},
	nextId: function(){
		this.uniqueId = this.uniqueId || 0;
		return this.uniqueId++;
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
	addNote: function(note){
		var arr = this.state.notes;
		arr.push({
			id: this.nextId(),
			note: note 
		});
		this.setState({notes: arr});
	},
	updateNote: function(note, index){
		var arr = this.state.notes;
		arr[index].note = note;
		this.setState({notes: arr});
	},
	removeNote: function(index){
		var arr = this.state.notes;
		arr.splice(index, 1);
		this.setState({notes: arr});	
	},	
	eachNote: function(note, i){
		return(React.createElement(NOTE, {key: note.id, index: i, colors: "red, green, blue, purple, magenta, yellow", onChange: this.updateNote, onRemove: this.removeNote}, note.note));
	},
	render: function(){
		return (
				React.createElement("div", {className: "board row"},  
					this.state.notes.map(this.eachNote), 
				 
				 React.createElement("button", {className: "btn btn-success glyphicon glyphicon-plus", onClick: this.addNote.bind(null, 'new Note')})
				 )
			);	
	}
});

React.render(React.createElement(BOARD, {count: 10}, "Hello Papapa"), document.getElementById("output"));
