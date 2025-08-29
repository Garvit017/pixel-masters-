# ProfileCard Component

A reusable React component for displaying user profile information in a card format.

## Props

The ProfileCard component accepts the following props:

| Prop Name | Type | Description | Required |
|-----------|------|-------------|----------|
| name | string | The name of the profile user | Yes |
| role | string | The job title or role of the user | Yes |
| bio | string | A short biography or description | Yes |
| avatar | string | URL to the user's profile image | Yes |
| social | object | Social media handles | Yes |

### Social Object Structure

```javascript
social: {
  twitter: string,  // Twitter username
  github: string,    // GitHub username
  linkedin: string   // LinkedIn username
}
```

## Usage Example

```jsx
import ProfileCard from './components/ProfileCard';

function App() {
  return (
    <ProfileCard
      name="John Doe"
      role="Frontend Developer"
      bio="Passionate about creating beautiful user interfaces"
      avatar="https://randomuser.me/api/portraits/men/1.jpg"
      social={{
        twitter: 'johndoe',
        github: 'johndoe',
        linkedin: 'johndoe'
      }}
    />
  );
}
```

## Styling

The component uses CSS modules for styling. You can customize the appearance by modifying the `ProfileCard.css` file.

## Responsive Design

The ProfileCard component is fully responsive and will adapt to different screen sizes:

- On desktop: Cards display in a grid layout
- On mobile: Cards stack vertically

## Accessibility

The component follows accessibility best practices:

- Images have appropriate alt text
- Social links have proper aria attributes
- Color contrast meets WCAG standards