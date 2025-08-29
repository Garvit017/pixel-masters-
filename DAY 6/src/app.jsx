import React from 'react'
import ProfileCard from './components/ProfileCard'
import './App.css'

function App() {
  // Sample profile data
  const profiles = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Frontend Developer',
      bio: 'Passionate about creating beautiful user interfaces',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      social: {
        twitter: 'johndoe',
        github: 'johndoe',
        linkedin: 'johndoe'
      }
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'UX Designer',
      bio: 'Creating user-centered design experiences',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      social: {
        twitter: 'janesmith',
        github: 'janesmith',
        linkedin: 'janesmith'
      }
    },
    {
      id: 3,
      name: 'Alex Johnson',
      role: 'Backend Developer',
      bio: 'Building robust and scalable server solutions',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      social: {
        twitter: 'alexj',
        github: 'alexj',
        linkedin: 'alexj'
      }
    }
  ]

  return (
    <div className="container">
      {profiles.map(profile => (
        <ProfileCard 
          key={profile.id}
          name={profile.name}
          role={profile.role}
          bio={profile.bio}
          avatar={profile.avatar}
          social={profile.social}
        />
      ))}
    </div>
  )
}

export default App