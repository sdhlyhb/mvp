import React from 'react';


 class UpdateNotes extends React.Component {
   constructor(props) {
     super(props);
     this.state = {

       notes: '' // default notes:

     }
   }

   handleChange(e) {
     let updatedNotes = e.target.value;
     if(updatedNotes.length > 0) {
       this.setState({notes: updatedNotes});
     }
   }

   handleSubmit(e) {
     e.preventDefault();
     this.props.updateNotes( this.props._id, this.state.notes);


   }


   render() {
     return (
       <div className="update-notes">
         <h3>This is update notes part:</h3>
         <label>Update notes: {this.props._id}</label>
         <br></br>
         <textarea rows="4" cols="20" placeholder="Update notes here..." onChange = {e=> this.handleChange(e)}></textarea>
         <br></br>
         <span onClick ={this.props.clickCloseIcon}>Close</span>
         <button onClick = {this.handleSubmit.bind(this)}>Update Notes</button>

       </div>
     )
   }

 }


 export default UpdateNotes;