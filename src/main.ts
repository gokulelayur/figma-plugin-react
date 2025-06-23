import { loadFontsAsync, once, showUI, on } from '@create-figma-plugin/utilities'

import { InsertCodeHandler } from './types'

export default function () {
  once<InsertCodeHandler>('INSERT_CODE', async function (code: string) {
    const text = figma.createText()
    await loadFontsAsync([text])
    text.characters = code
    figma.currentPage.selection = [text]
    figma.viewport.scrollAndZoomIntoView([text])
    figma.closePlugin()
  })

  // Show UI with initial size
  showUI({ height: 400, width: 320 })

  function handleSelectionChange() {
    const selection = figma.currentPage.selection
    
    if (selection.length > 0) {
      const selectedNode = selection[0]
      
      if ('x' in selectedNode && 'y' in selectedNode && 'width' in selectedNode && 'height' in selectedNode) {
        figma.notify(`Selected: ${selectedNode.name} (${selectedNode.type})`)
        
        console.log('Selection changed:', selection.map(node => ({
          id: node.id,
          name: node.name,
          type: node.type,
          x: 'x' in node ? node.x : null,
          y: 'y' in node ? node.y : null,
          width: 'width' in node ? node.width : null,
          height: 'height' in node ? node.height : null
        })))
      }
    } else {
      figma.notify('No elements selected')
      console.log('Selection cleared')
    }
  }

  figma.on('selectionchange', () => {
    handleSelectionChange()
  })

  handleSelectionChange()

  on('ANALYZE_SELECTION', () => {
    const selection = figma.currentPage.selection
    if (selection.length > 0) {
      console.log('Analyzing selection:', selection)
      
      const selectionInfo = selection.map(node => ({
        id: node.id,
        name: node.name,
        type: node.type,
        width: 'width' in node ? node.width : null,
        height: 'height' in node ? node.height : null
      }))
      
      console.log('Analysis result:', selectionInfo)
      figma.notify(`Analyzed ${selection.length} element(s)`)
    } else {
      figma.notify('No elements selected for analysis')
    }
  })

  on('FOCUS_PLUGIN', () => {
    figma.notify('Plugin focused - ready for analysis')
  })
}
