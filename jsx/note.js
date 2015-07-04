var NOTE = React.createClass({
	getInitialState: function(){
		return {checked: true, editing: false};
	},
	// getDefaultProps: function(){
	// 	return {
	// 		backgroundColor: '#00f',
	// 		color: '#fff',
	// 		width: 400,
	// 		height: 200
	// 	};
	// },
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
					<div className="note" style={this.style}>	
					<h1><input type="checkbox" onChange={this.handleChange} defaultChecked={this.state.checked} />{this.props.index}</h1>
					<p>{this.props.children}</p>
					<p>{ msg }</p>
					<button type="button" className="btn btn-primary glyphicon glyphicon-pencil" onClick={this.editNote}></button>
					<button type="button" className="btn btn-danger glyphicon glyphicon-trash" onClick={this.deleteNote}></button>
					</div>
			);
	},
	renderForm: function(){
		return (
					<div className="note" style={this.style}>	
					<textarea ref="newText" defaultValue={this.props.children} className="form-control" />
					<button type="button" className="btn btn-primary glyphicon glyphicon-floppy-disk" onClick={this.saveNote}></button>
					</div>
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