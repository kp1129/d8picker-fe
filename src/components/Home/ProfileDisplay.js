import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileDisplay = () => {
	const [id, setId] = useState(localStorage.getItem('googleId'));
	const [profile, setProfile] = useState({
		name: '',
		email: '',
		photoUrl: ''
    });
    
	useEffect(() => {
        setId(localStorage.getItem('googleId'))
        
		axios
			.get(`api/user/${id}`)
			.then(res => {
				console.log(res.data);
				setProfile(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	},[id]);

	return (
		<div>
			<img src={profile.photoUrl} alt=''/>
			<h3>{profile.name}</h3>
			<h4>{profile.email}</h4>
		</div>
	);
};

export default ProfileDisplay;
