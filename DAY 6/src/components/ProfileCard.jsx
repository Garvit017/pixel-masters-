import React from 'react'
import './ProfileCard.css'

function ProfileCard({ name, role, bio, avatar, skills }) {
  return (
    <div className="profile-card">
      <div className="profile-card__header">
        <img src={avatar} alt={`${name}'s avatar`} className="profile-card__avatar" />
        <h2 className="profile-card__name">{name}</h2>
        <p className="profile-card__role">{role}</p>
      </div>
      <div className="profile-card__body">
        <p className="profile-card__bio">{bio}</p>
        <div className="profile-card__skills">
          <h3>Skills</h3>
          <ul>
            {skills.map((skill, index) => (
              <li key={index} className="profile-card__skill">{skill}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="profile-card__footer">
        <button className="profile-card__button">Contact</button>
        <button className="profile-card__button profile-card__button--secondary">View Profile</button>
      </div>
    </div>
  )
}

export default ProfileCard