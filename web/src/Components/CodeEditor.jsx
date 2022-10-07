import React, {useState, useEffect} from 'react';
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

const CodeEditor = ({files, setFiles, index}) => {

    const [code, setCode] = useState(
        `<h1>Paste your code here</h1>`
    );
    const [specificLanguage, setSpecificLanguage] = useState(languages.markup);

    
    useEffect(() => {    
        let newArray = [...files];
        newArray[index].text = code;
        setFiles(newArray);

    }, [code]);

    const changeLanguage = (e) => {
        console.log(languages);
        if(e.target.value === 'html') {
            setSpecificLanguage(languages.markup);

        } else if(e.target.value === 'css') {
            setSpecificLanguage(languages.css);

        } else if(e.target.value === 'javascript') {
            setSpecificLanguage(languages.js);

        } else if(e.target.value === 'java') {
            setSpecificLanguage(languages.java);
            
        } else if(e.target.value === 'python') {
            setSpecificLanguage(languages.py);

        } else if(e.target.value === 'csharp') {
            setSpecificLanguage(languages.csharp);
        } else if(e.target.value === 'plaintext') {
            setSpecificLanguage(languages.plaintext);
        }
        let newArray = [...files];
        newArray[index].language = e.target.value;
        setFiles(newArray)
    }

    return (
        <div className='code-editor'>
            <label htmlFor={`langauges${index}`}>Choose language:</label>
            <select name={`langauges${index}`} onChange={(e) => {changeLanguage(e)}}>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="javascript">JavaScript</option>
                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="csharp">C#</option>
                <option value="plaintext">Plain Text</option>
            </select>
            <Editor
                value={code}
                onValueChange={code => setCode(code)}
                highlight={code => highlight(code, specificLanguage)}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                }}
            />
        </div>
    )
}

export default CodeEditor;