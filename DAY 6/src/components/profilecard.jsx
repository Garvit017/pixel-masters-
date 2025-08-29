import React from 'react'
import './ProfileCard.css'

function ProfileCard({ name, role, bio, avatar, social }) {
  return (
    <div className="profile-card">
      <div className="profile-card__header">
        <img src={avatar} alt={name} className="profile-card__avatar" />
      </div>
      <div className="profile-card__content">
        <h2 className="profile-card__name">{name}</h2>
        <p className="profile-card__role">{role}</p>
        <p className="profile-card__bio">{bio}</p>
      </div>
      <div className="profile-card__footer">
        <div className="profile-card__social">
          {social.twitter && (
            <a href={`https://twitter.com/${social.twitter}`} target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
          )}
          {social.github && (
            <a href={`https://github.com/${social.github}`} target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-github"></i>
            </a>
          )}
          {social.linkedin && (
            <a href={`https://linkedin.com/in/${social.linkedin}`} target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-linkedin"></i>
            </a>
          )}
        </div>
        <button className="profile-card__button">Contact</button>
      </div>
    </div>
  )
}

export default ProfileCard