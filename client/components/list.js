import React from 'react';
import axios from 'axios';
import Row from "./row.js"

export default class List extends React.Component{

constructor(props) {
        super(props);
        this._handleSubmit = this._handleSubmit.bind(this)
        this._handleReset =this._handleReset.bind(this)
        this._handleShowMore =this._handleShowMore.bind(this)
        this._handleShowLess = this._handleShowLess.bind(this)
        this.state = {
          showTable: false,
          items: [],
          showItems: [],
          value:''
        }
}


 

_handleSubmit(e){
const {name} = this.refs

if(name.value != "") 
var url = "https://api.github.com/search/repositories?q="+ name.value 
else
var url = "https://api.github.com/search/repositories?q=topic"	
axios.get(url)
    .then(function (response) {
		console.log(response.data.items)
		 this.setState({ items: response.data.items,
		 				 showItems: response.data.items.slice(0,5),
		 				 showTable: true
		  });

	    }.bind(this))
    .catch(function (error) {
      console.log(error)
    }); 
 e.preventDefault();     
}

_handleReset(e){
 this.setState({ items: [],
 				 showItems: [],
		 	    showTable: false
		  });
 e.preventDefault();     
}

_handleShowMore(){
	const {showItems,items} = this.state
	var index = showItems.length + 5 
	this.setState({ items: items,
		 		    showItems: items.slice(0,index)
		 				
		  });
}
_handleShowLess(){
	const {showItems,items} = this.state
	var index = showItems.length - 5
	 this.setState({ items: items,
		 		    showItems: items.slice(0,index)
		 				
		  });
}
render(){
 const {items,showTable,showItems} = this.state
 var rows = []
 var count = 0
 showItems.forEach(function(showItem) {
 	 count++
    rows.push(<Row id={showItem.id} name={showItem.name} html_url={showItem.html_url} description={showItem.description} size={showItem.size} score={showItem.score} count={count} />);
})
 console.log(showItems,"items", showTable)
	return(
		<div>
		<div>
		<form>
            <input className="button-style" ref="name" id="name" type="text"  placeholder="Enter topic name..."/>
            <button className="btn btn-success btn-sm button-style" onClick={this._handleSubmit}>Fetch  Repositories</button> 
         	 <button className="btn btn-danger btn-sm button-style" onClick={this._handleReset} >Reset</button> 
         </form>
         
        </div>
		{ showTable ? <div className="table-responsive">          
  <table className="table margin">
    <thead>
      <tr>
      	<th>No</th>
        <th>id</th>
        <th>name</th>
        <th>html_url</th>
        <th>description</th>
        <th>Size</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
     
      {rows}
   
    </tbody>
  </table>
  </div> : null}
  <div>
  {showItems.length < 26 && showTable ? <button className="btn btn-primary btn-sm button-style" onClick={this._handleShowMore} >ShowMore</button> : null}
  {showItems.length > 5 && showTable ? <button className="btn btn-primary btn-sm button-style" onClick={this._handleShowLess} >Showless</button> : null}
  </div>
	</div>
		)
}



}