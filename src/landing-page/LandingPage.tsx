import {
  Button,
  Container,
  VerticalSpace,
  Text
} from '@create-figma-plugin/ui'
import { h } from 'preact'
import { useNavigation } from '../contexts/NavigationContext'

// Define your app states/pages
type AppState = 'landing' | 'analysis' | 'settings' | 'results'

function LandingPage() {
  const { navigate } = useNavigation()

  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text align="center">
        Hello World! 👋
      </Text>
      <VerticalSpace space="medium" />
      <Text align="center">
        Welcome to Figma Design Analysis Plugin
      </Text>
      <VerticalSpace space="large" />
      <Button fullWidth onClick={() => navigate('analysis')}>
        Get Started
      </Button>
      <VerticalSpace space="small" />
      <Button fullWidth onClick={() => navigate('settings')}>
        Settings
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}

export default LandingPage 