import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useParams } from 'react-router-dom';

export default class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataIsLoaded: 'false',
            results: []
        }
    }
    componentDidMount = () => {
        fetch('http://localhost:3001/search', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'search': this.props.searchInput                
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {   
                this.setState({results: data.results, dataIsLoaded: true})
            }   else {
                   console.log(data)  
                } 
            }
        )
    }
 
    render() {
        if (this.state.dataIsLoaded && this.state.results.length > 0) {
            return(            
                <>
                    <div 
                        style={{
                            height: '1000vh',
                            width: '1000vw',
                            position: 'absolute',
                            overflow: 'hidden',
                            marginLeft: '-140%'
                            }}
                        onClick={
                            this.props.unmountMe
                            }>
                    </div>
                    <div
                        style={{
                            width: '100%',
                            backgroundColor: 'white',
                            zIndex: '1000',
                            position: 'absolute',
                            display: 'flex',
                            color: 'black',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            borderRadius: '0 0 20px 20px',
                            boxShadow: '-1px 3px 5px 0px black'
                            }}>
                        {this.state.results.map(item =>
                            <Link to={`/${item.username}`}>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <img 
                                        src={'http://localhost:3001/public/' + item.profilePicture}
                                        width="50px"
                                        height="50px"
                                        style={{
                                            boxShadow: "1px 3px 5px 0px black",
                                            mb: 3,
                                            marginLeft: '20%',
                                            marginRight: '10%',
                                            borderRadius: '50%'
                                        }}                        
                                    />
                                    <h1>{item.firstName} {item.lastName}</h1>
                                </div>
                            </Link>
                        )}                               
                    </div>
                </>
            )
        } else {
            return(            
                <>
                    <div style={{
                        height: '200px',
                        width: '100%',
                        backgroundColor: 'white',
                        zIndex: '1000',
                        position: 'absolute'
                        }}>
                        <CircularProgress />
                    </div>
                </>
            )
        }
    }
}