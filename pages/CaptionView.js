import React, { useState, useEffect } from 'react'

export default function CaptionView({captions}) {
    const [captionText, setCaptionText] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("#00ff00");
    const [textColor, setTextColor] = useState("#333355");
    const [fontFamily, setFontFamily] = useState("Helvetica");
    const loadCaptions = (event) => {
        event.preventDefault();
        const captions = localStorage && localStorage.getItem('captions') && JSON.parse(localStorage.getItem('captions')) || [];
        captions.forEach(caption => {
            console.log(caption);
            setTimeout(() => {
                console.log("displaying", caption.text);
                setCaptionText(caption.text)
            }, caption.start);
            setTimeout(() => {
                console.log('hiding', caption.text);
                setCaptionText("");
            }, caption.end);
        });
    };

    return (
        <main style={{backgroundColor: backgroundColor, color: textColor, fontFamily: `'${fontFamily}', sans-serif`}}>
            <div>{captionText}</div>
            <form style={{position: "absolute", bottom: "0px", left: "0px"}} onSubmit={loadCaptions}>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="backgroundColor">Background Color</label></td>
                            <td><input type="color" name="backgroundColor" id="backgroundColor" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="textColor">Text Color</label></td>
                            <td><input type="color" name="textColor" id="textColor" value={textColor} onChange={(e) => setTextColor(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="fontFamily">Font</label></td>
                            <td><input type="text" name="fontFamily" id="fontFamily" value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} /></td>
                        </tr>
                    </tbody>
                </table>
                <button>Load Captions</button>
            </form>
        </main>
    )
}

CaptionView.getInitialProps = async (d) => {
    console.log(d);
    if (d.req) {
        // server
        return { captions: [] };
    } else {
        return { captions: localStorage && localStorage.getItem('captions') || [] }; 
    }
  }