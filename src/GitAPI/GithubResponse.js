import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Repo = ({ repo, index }) =>
    <tr>
        <td>{index + 1}</td>
        <td className="repo-name">{repo.name}</td>
        <td>{repo.stargazers_count} Stars </td>
    </tr>;


export default class GithubResponse extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            repos : [],
            error : null,
        };
    }
    componentDidMount(){
        console.log("Component did Work");
        axios.get(
            window.encodeURI(
                `https://api.github.com/search/repositories?q=stars:>1+language:javascript&sort=stars&order=desc&type=Repositories`,
            ),
        )
        //Success Then its perform
        .then(response => {
            console.log(response);
            const repos = response.data.items;
            this.setState({
                repos,
            })
        })

        //Check error !
        .catch(error => {
            console.log(error);
            this.setState({
                
                error: error,
            });
        });
    }
    
    //Render Error functions...
    renderError() {
        return (
          <div>
            <div>
              Sorry, an error ocurred: {this.state.error.response.data.message}
            </div>
          </div>
        );
      }
      //render List Of data...
    renderList(){
        const { error , repos} = this.state;
        console.log(repos);
        if(error){
            console.log(error);
            this.renderError();
        }
        return(
            <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                            <th>No </th>
                            <th>Repositories Name</th>
                            <th>Stars Count</th>
                    </tr>
                </thead>
                <tbody>
                        {repos.map((repo ,index) =>
                            
                            <Repo repo ={repo} index={index} key ={repo.id} />,
                        )}
                </tbody>
            </table>
        </div>
        );
    }
    render(){
        return this.renderList();
    }

}

