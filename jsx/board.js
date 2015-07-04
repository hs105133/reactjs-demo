var BOARD = React.createClass({
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
	componentWillMount: function(){
		var self = this;
		if(this.props.count){
			$.ajax({
				url: "https://baconipsum.com/api/?type=all-meat&sentences="+this.props.count+"&start-with-lorem=1"
			})
			.done(function(res){
				res[0].split(". ").forEach(function(sentence){
					self.addNote(sentence.substring(0, 80));
				});
			});			
		}

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
		return(<NOTE key={note.id} index={i} onChange={this.updateNote} onRemove={this.removeNote}>{note.note}</NOTE>);
	},
	render: function(){
		return (
				<div className="board">
					<button title="Add Note" className="btn btn-success glyphicon glyphicon-plus pull-right" onClick={this.addNote.bind(null, 'new Note')}></button>

					<div className="row">
				{ 
					this.state.notes.map(this.eachNote)
				 }
				 </div>
				 </div>
			);	
	}
});