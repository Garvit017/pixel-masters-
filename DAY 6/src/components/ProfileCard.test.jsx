import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileCard from './ProfileCard';

// Mock data for testing
const mockProfile = {
  name: 'Test User',
  role: 'Test Role',
  bio: 'This is a test bio',
  avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  social: {
    twitter: 'testuser',
    github: 'testuser',
    linkedin: 'testuser'
  }
};

describe('ProfileCard Component', () => {
  test('renders profile information correctly', () => {
    render(
      <ProfileCard 
        name={mockProfile.name}
        role={mockProfile.role}
        bio={mockProfile.bio}
        avatar={mockProfile.avatar}
        social={mockProfile.social}
      />
    );
    
    // Check if profile information is rendered
    expect(screen.getByText(mockProfile.name)).toBeInTheDocument();
    expect(screen.getByText(mockProfile.role)).toBeInTheDocument();
    expect(screen.getByText(mockProfile.bio)).toBeInTheDocument();
    
    // Check if avatar is rendered with correct alt text
    const avatarElement = screen.getByAltText(mockProfile.name);
    expect(avatarElement).toBeInTheDocument();
    expect(avatarElement).toHaveAttribute('src', mockProfile.avatar);
    
    // Check if social links are rendered
    const twitterLink = screen.getByRole('link', { name: /twitter/i });
    expect(twitterLink).toHaveAttribute('href', `https://twitter.com/${mockProfile.social.twitter}`);
    
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('href', `https://github.com/${mockProfile.social.github}`);
    
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute('href', `https://linkedin.com/in/${mockProfile.social.linkedin}`);
    
    // Check if contact button is rendered
    expect(screen.getByRole('button', { name: /contact/i })).toBeInTheDocument();
  });
});