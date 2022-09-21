

import * as CodeBlocks from 'react-code-blocks';

import React from 'react'


type Props = {
    code: string;
    language: string;
    theme: any;
}

function CodeViewer({code, language, theme}: Props) {

  const t = CodeBlocks as any

  const [currentCode, setCurrentCode] = React.useState(code)

  return (
    <div className="codeBlock  scrollbar scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80    ">
   <CodeBlocks.CodeBlock 
   language={language} 
   theme={t[theme]} 
   text={currentCode}
   customStyle={{
    overflow: 'scroll',
   }}
/>
   </div>
  )
}

export default CodeViewer