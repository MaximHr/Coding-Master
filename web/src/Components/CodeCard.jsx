import React, {useState} from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
//importing different languages
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-css-extras';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-csharp';
import { useEffect } from 'react';

const CodeCard = ({file}) => {

    const [code, setCode] = useState(
        file.text
    );
    const [specificLanguage, setSpecificLanguage] = useState(languages.markup);

    const changeLanguage = () => {
        if(file.language === 'html') {
            setSpecificLanguage(languages.markup);

        } else if(file.language === 'css') {
            setSpecificLanguage(languages.css);

        } else if(file.language === 'javascript') {
            setSpecificLanguage(languages.js);

        } else if(file.language === 'java') {
            setSpecificLanguage(languages.java);
            
        } else if(file.language === 'python') {
            setSpecificLanguage(languages.py);

        } else if(file.language === 'csharp') {
            setSpecificLanguage(languages.csharp);

        } else if(file.language === 'plaintext') {
            setSpecificLanguage(languages.plaintext);
        }
    }

    useEffect(() => {
        changeLanguage();
    }, [])

    return (
        <div className='code-editor'>
            <p>Language: <span>{file.language}</span></p>
            <Editor
                value={code}
                highlight={code => highlight(code, specificLanguage)}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                    pointerEvents: 'none'
                }}
            />
        </div>
    )
}

export default CodeCard;