import '!prismjs/themes/prism.css'

import {
  Button,
  Container,
  render,
  VerticalSpace
} from '@create-figma-plugin/ui'
import { emit } from '@create-figma-plugin/utilities'
import { h, RefObject } from 'preact'
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import { highlight, languages } from 'prismjs'
import Editor from 'react-simple-code-editor'

import styles from './styles.css'
import { InsertCodeHandler } from './types'
import LandingPage from './landing-page/LandingPage'
import AnalysisPage from './AnalysisPage'
import { NavigationProvider, useNavigation, AppState } from './contexts/NavigationContext'

function AppContent() {
  const { currentPage } = useNavigation()

  // Render different pages based on current state
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />
      case 'analysis':
        return <AnalysisPage />
      case 'settings':
        return (
          <Container space="medium">
            <VerticalSpace space="large" />
            <h2>Settings</h2>
            <Button fullWidth onClick={() => useNavigation().navigate('landing')}>
              Back to Home
            </Button>
          </Container>
        )
      case 'results':
        return (
          <Container space="medium">
            <VerticalSpace space="large" />
            <h2>Analysis Results</h2>
            <Button fullWidth onClick={() => useNavigation().navigate('analysis')}>
              Back to Analysis
            </Button>
          </Container>
        )
      default:
        return <LandingPage />
    }
  }

  return renderCurrentPage()
}

function Plugin() {
  // Original code commented out
  /*
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`)
  const containerElementRef : RefObject<HTMLDivElement> = useRef(null)
  const handleInsertCodeButtonClick = useCallback(
    function () {
      emit<InsertCodeHandler>('INSERT_CODE', code)
    },
    [code]
  )
  // Patch to make `react-simple-code-editor` compatible with Preact
  useEffect(function () {
    const containerElement = containerElementRef.current
    if (containerElement === null) {
      return
    }
    const textAreaElement = containerElement.querySelector('textarea')
    if (textAreaElement === null) {
      return
    }
    textAreaElement.textContent = code
    const preElement = containerElement.querySelector('pre')
    if (preElement === null) {
      return
    }
    if (textAreaElement.nextElementSibling !== preElement) {
      textAreaElement.after(preElement)
    }
  }, [code])
  return (
    <Container space="medium">
      <VerticalSpace space="small" />
      <div class={styles.container} ref={containerElementRef}>
        <Editor
          highlight={function (code: string) {
            return highlight(code, languages.js, 'js')
          }}
          onValueChange={setCode}
          preClassName={styles.editor}
          textareaClassName={styles.editor}
          value={code}
        />
      </div>
      <VerticalSpace space="large" />
      <Button fullWidth onClick={handleInsertCodeButtonClick}>
        Insert Code
      </Button>
      <VerticalSpace space="small" />
    </Container>
  )
  */

  // Use the new context-based routing system
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  )
}

export default render(Plugin)

