import {
  Button,
  Container,
  VerticalSpace,
  Text,
  Stack
} from '@create-figma-plugin/ui'
import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { useNavigation } from './contexts/NavigationContext'
import { emit } from '@create-figma-plugin/utilities'

function AnalysisPage() {
  const { navigate } = useNavigation()
  const [selectionInfo, setSelectionInfo] = useState<any[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<string>('')

  // Listen for messages from main plugin
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.pluginMessage) {
        const { type, data } = event.data.pluginMessage
        
        if (type === 'SELECTION_CHANGED') {
          setSelectionInfo(data || [])
          setLastUpdate(new Date().toLocaleTimeString())
        } else if (type === 'ANALYSIS_RESULT') {
          setSelectionInfo(data || [])
          setIsAnalyzing(false)
          setLastUpdate(new Date().toLocaleTimeString())
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const analyzeSelection = () => {
    setIsAnalyzing(true)
    emit('ANALYZE_SELECTION')
  }

  const focusPlugin = () => {
    emit('FOCUS_PLUGIN')
  }

  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text align="center">
        Design Analysis 🔍
      </Text>
      <VerticalSpace space="medium" />
      
      {selectionInfo.length > 0 ? (
        <Text align="center">
          Selected: {selectionInfo.length} element(s)
        </Text>
      ) : (
        <Text align="center">
          No elements selected
        </Text>
      )}
      
      {lastUpdate && (
        <Text align="center">
          Last update: {lastUpdate}
        </Text>
      )}
      
      <VerticalSpace space="large" />
      <Stack space="small">
        <Button 
          fullWidth 
          onClick={analyzeSelection}
          disabled={selectionInfo.length === 0 || isAnalyzing}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Selected Elements'}
        </Button>
        <Button fullWidth onClick={focusPlugin}>
          Focus Plugin
        </Button>
        <Button fullWidth>
          Analyze All Frames
        </Button>
        <Button fullWidth onClick={() => navigate('results')}>
          View Previous Results
        </Button>
      </Stack>
      
      {selectionInfo.length > 0 && (
        <div>
          <VerticalSpace space="large" />
          <Text>Selection Details:</Text>
          <VerticalSpace space="small" />
          {selectionInfo.map((item, index) => (
            <div key={index}>
              <Text>• {item.name} ({item.type})</Text>
              {item.width && item.height && (
                <Text>  Size: {Math.round(item.width)} × {Math.round(item.height)}</Text>
              )}
            </div>
          ))}
        </div>
      )}
      
      <VerticalSpace space="large" />
      <Button fullWidth onClick={() => navigate('landing')}>
        Back to Home
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
}

export default AnalysisPage 