import CodeMirror, { Extension } from '@uiw/react-codemirror'
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { EditorView } from '@codemirror/view'
import { useCallback, useContext } from 'react'
import { Maximize2, Minimize2 } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { EditorContext } from '../context/EditorContext'

interface EditorProps {
  type: 'html' | 'css' | 'js'
  code: string
  setCode: (arg0: string) => void
}

export function Editor({ type, code, setCode }: EditorProps) {
  const onChange = useCallback(
    (val: string) => {
      setCode(val)
    },
    [setCode]
  )

  const { openTabs, setOpenTabs, openMobileTab } = useContext(EditorContext)

  const currentTab =
    type === 'html' ? openTabs[0] : type === 'css' ? openTabs[1] : openTabs[2]

  interface ExtensionsProps extends Record<string, Extension[]> {}

  const extensions: ExtensionsProps = {
    html: [html({ autoCloseTags: true }), EditorView.lineWrapping],
    css: [css(), EditorView.lineWrapping],
    js: [javascript(), EditorView.lineWrapping],
  }

  function handleSize() {
    const check = openTabs.filter((tab) => tab === true)

    if (type === 'html') {
      if (check.length === 1) {
        setOpenTabs([true, openTabs[1], openTabs[2]])
        return
      }
      setOpenTabs([!openTabs[0], openTabs[1], openTabs[2]])
    }

    if (type === 'css') {
      if (check.length === 1) {
        setOpenTabs([openTabs[0], true, openTabs[2]])
        return
      }
      setOpenTabs([openTabs[0], !openTabs[1], openTabs[2]])
    }

    if (type === 'js') {
      if (check.length === 1) {
        setOpenTabs([openTabs[0], openTabs[1], true])
        return
      }
      setOpenTabs([openTabs[0], openTabs[1], !openTabs[2]])
    }
  }

  return (
    <div
      className={twMerge(
        'h-[320px] transition-all relative',
        currentTab ? 'w-full' : 'w-full md:w-[40px]',
        openMobileTab === type ? 'block' : 'hidden md:block'
      )}
    >
      <div
        className={twMerge(
          'flex flex-col pt-[27px] md:pt-0 ring-2 ring-[#1a1b26] absolute left-0 right-0 md:static'
        )}
      >
        <div className="hidden md:flex items-center h-[27px] justify-between relative">
          <div
            className={twMerge(
              'flex items-center gap-1 h-full w-fit px-3 bg-[#1a1b26] transition-transform',
              !currentTab &&
                'absolute scale-50 -translate-y-[22px] -translate-x-[50%] left-[50%] px-1.5'
            )}
          >
            {type === 'html' && (
              <svg viewBox="0 0 15 15" className="file-type-icon size-4">
                <rect fill="#FF3C41" width="15" height="15" rx="4"></rect>
                <path
                  d="M10.97 2.29a.563.563 0 0 0-.495-.29.572.572 0 0 0-.488.277l-5.905 9.86a.565.565 0 0 0-.007.574c.102.18.287.289.495.289a.572.572 0 0 0 .488-.277l5.905-9.86a.565.565 0 0 0 .007-.574"
                  fill="#1a1b26"
                ></path>
              </svg>
            )}
            {type === 'css' && (
              <svg viewBox="0 0 15 15" className="file-type-icon size-4">
                <rect fill="#0EBEFF" width="15" height="15" rx="4"></rect>
                <path
                  d="M8 8.366l1.845 1.065a.507.507 0 0 0 .686-.181.507.507 0 0 0-.186-.685L8.5 7.5l1.845-1.065a.507.507 0 0 0 .186-.685.507.507 0 0 0-.686-.181L8 6.634v-2.13A.507.507 0 0 0 7.5 4c-.268 0-.5.225-.5.503v2.131L5.155 5.569a.507.507 0 0 0-.686.181.507.507 0 0 0 .186.685L6.5 7.5 4.655 8.565a.507.507 0 0 0-.186.685c.134.232.445.32.686.181L7 8.366v2.13c0 .271.224.504.5.504.268 0 .5-.225.5-.503V8.366z"
                  fill="#1a1b26"
                ></path>
              </svg>
            )}
            {type === 'js' && (
              <svg viewBox="0 0 15 15" className="file-type-icon size-4">
                <rect fill="#FCD000" width="15" height="15" rx="4"></rect>
                <path
                  d="M6.554 3.705c0 .267-.19.496-.452.543-1.2.217-2.12 1.61-2.12 3.275 0 1.665.92 3.057 2.12 3.274a.554.554 0 0 1-.205 1.087c-1.733-.322-3.022-2.175-3.022-4.361 0-2.187 1.289-4.04 3.022-4.362a.554.554 0 0 1 .657.544zm1.892 0c0-.347.316-.607.657-.544 1.733.322 3.022 2.175 3.022 4.362 0 2.186-1.289 4.04-3.022 4.361a.554.554 0 0 1-.205-1.087c1.2-.217 2.12-1.61 2.12-3.274 0-1.665-.92-3.058-2.12-3.275a.551.551 0 0 1-.452-.543z"
                  fill="#1a1b26"
                ></path>
              </svg>
            )}
            <span className="text-sm text-[#787c99] font-semibold uppercase">
              {type}
            </span>
          </div>
          <button
            onClick={handleSize}
            className={twMerge(
              'p-1 text-light hover:opacity-75 transition-all hidden md:block',
              currentTab ? 'ml-auto' : 'mx-auto'
            )}
          >
            {currentTab ? (
              <Minimize2 className="size-4" />
            ) : (
              <Maximize2 className="size-4" />
            )}
          </button>
        </div>
        <CodeMirror
          value={code}
          width="100%"
          height="293px"
          theme={tokyoNight}
          extensions={extensions[type]}
          onChange={onChange}
          autoFocus={type === 'html'}
          className="text-[10px] md:text-[13px]"
        />
      </div>
    </div>
  )
}
