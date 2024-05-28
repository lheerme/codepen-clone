import { useEffect, useState } from 'react'
import { Editor } from './components/Editor'
import { Logo } from './components/Logo'
import { EditorContext } from './context/EditorContext'
import { twMerge } from 'tailwind-merge'

function App() {
  const [htmlCode, setHtmlCode] = useState('')
  const [cssCode, setCssCode] = useState('')
  const [jsCode, setJsCode] = useState('')
  const [srcCode, setSrcCode] = useState('')
  const [openTabs, setOpenTabs] = useState([true, true, true])
  const [openMobileTab, setOpenMobileTab] = useState('html')

  // Atualizar o código
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcCode(`
        <html>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Codepen Clone</title>
          <body>${htmlCode}</body>
          <style>${cssCode}</style>
          <script>${jsCode}</script>
        </html>
      `)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [htmlCode, cssCode, jsCode])

  // Aviso caso o usuário recarregue ou saia da página
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return (
    <EditorContext.Provider
      value={{
        openTabs,
        setOpenTabs,
        openMobileTab,
        setOpenMobileTab,
      }}
    >
      <div className="w-full h-screen md:py-2">
        <header className="flex items-center gap-2 px-4 py-3 md:pb-1 md:mb-4">
          <Logo />
          <h1 className="text-sm md:text-xl">Codepen Clone</h1>
        </header>
        <div className="flex flex-col w-full h-[calc(100%_-_44px)] md:h-[calc(100%_-_60px)] gap-1 md:gap-4">
          <div className="flex gap-4 md:px-4 w-full justify-between relative">
            <div className="flex md:hidden items-center gap-1 h-[27px] w-full absolute top-0 left-0">
              <button
                onClick={() => setOpenMobileTab('html')}
                className={twMerge(
                  'w-fit h-full text-sm text-[#787c99] font-semibold uppercase bg-[#1a1b26] px-3 opacity-70 transition-opacity z-[1]',
                  openMobileTab === 'html' && 'opacity-100'
                )}
              >
                HTML
              </button>
              <button
                onClick={() => setOpenMobileTab('css')}
                className={twMerge(
                  'w-fit h-full text-sm text-[#787c99] font-semibold uppercase bg-[#1a1b26] px-3 opacity-70 transition-opacity z-[1]',
                  openMobileTab === 'css' && 'opacity-100'
                )}
              >
                CSS
              </button>
              <button
                onClick={() => setOpenMobileTab('js')}
                className={twMerge(
                  'w-fit h-full text-sm text-[#787c99] font-semibold uppercase bg-[#1a1b26] px-3 opacity-70 transition-opacity z-[1]',
                  openMobileTab === 'js' && 'opacity-100'
                )}
              >
                JS
              </button>
            </div>
            <Editor type="html" code={htmlCode} setCode={setHtmlCode} />
            <Editor type="css" code={cssCode} setCode={setCssCode} />
            <Editor type="js" code={jsCode} setCode={setJsCode} />
          </div>
          <div className="w-full h-full">
            <iframe
              srcDoc={srcCode}
              title="output"
              sandbox="allow-scripts"
              width={'100%'}
              height={'100%'}
              className="bg-light"
            />
          </div>
        </div>
      </div>
    </EditorContext.Provider>
  )
}

export default App
