import React, { Component } from 'react';
class CreateAccommodation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: []
        };
    }
    componentDidMount() {
        const url = "https://winners-c8-bn-be-staging.herokuapp.com/api/locations"
        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNhMGE2Zjk2LWEyNTUtNGY3Zi04NmIwLTcwMmRjMWM0MmM1ZiIsImVtYWlsIjoia2FyZGF2MjAxOUBnbWFpbC5jb20iLCJ1c2VyX3JvbGUiOiI3YWRhZTJmMS00ZDM1LTQ3MGQtODUxMi0xYjk2MzQzMzBhOWUiLCJtYW5hZ2VySWQiOm51bGwsImlhdCI6MTY2MDIyODc0MywiZXhwIjoxNjYwMzE1MTQzfQ.gdxkICME5SIohRbWY4IzF8Ft-NqR3M-o_UO44aLXT-w"
            },
        }).then((response) => response.json())
            .then(result => {
                const data = result.data;
                this.setState({ locations: data });
            });
    }
    render() {
        const locations = this.state.locations;
        const options = locations.map(location => {
            const name = `${location.city}, ${location.country}`
            return (<option key={location.id} value={location.id} >{name}</option>)
        });
        return (
            <form>
                <input type="text" placeholder="Name"></input>
                <label htmlFor="location">Location:</label>
                <select name="location_id" id="location">
                    {options}
                </select>
                <button type='submit'>Submit</button>
            </form>);
    }
}
export default CreateAccommodation;