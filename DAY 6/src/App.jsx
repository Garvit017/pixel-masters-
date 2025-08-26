import React from 'react'
import ProfileCard from './components/ProfileCard'
import './App.css'

function App() {
  return (
    <div className="app">
      <h1>Profile Card App</h1>
      <div className="card-container">
        <ProfileCard 
          name="John Doe"
          role="Frontend Developer"
          bio="Passionate about creating beautiful user interfaces with React."
          avatar="https://randomuser.me/api/portraits/men/1.jpg"
          skills={['React', 'JavaScript', 'CSS', 'HTML']}
        />
        <ProfileCard 
          name="Jane Smith"
          role="UX Designer"
          bio="Creating user-centered designs with a focus on accessibility and usability."
          avatar="https://randomuser.me/api/portraits/women/1.jpg"
          skills={['Figma', 'UI/UX', 'Prototyping', 'User Research']}
        />
      </div>
    </div>
  )
}

export default App