import React from 'react';


export default class Row extends React.Component{
	
	render(){
		const {id,name,html_url,description,size,score,count} = this.props
		return(
			 <tr>
			 	<td>{count}</td>
                <td>{id}</td>
                <td>{name}</td>
                <td><a href={html_url} target="_blank">{html_url}</a></td>
                <td>{description}</td>
                <td>{size}</td>
                 <td>{score}</td>
            </tr>
			)
	}
}
