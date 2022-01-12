import React from 'react'

export default function CaptionPreview({caption, removeFn}) {
    
    const makeSecondStamp = (value) => {
        let ms = value % 1000;
        let ss = Math.floor(value / 1000);
        let mm = Math.floor(ss / 60);
        ss %= 60;
        let hh = Math.floor(mm/60);
        mm %= 60;
        let tarr = [hh, mm, ss, ms].map(num => num.toFixed());
        tarr[0] = tarr[0].padStart(2, 0);
        tarr[1] = tarr[1].padStart(2, 0);
        tarr[2] = tarr[2].padStart(2, 0);
        tarr[3] = tarr[3].padStart(3, 0);

        return tarr.join(":");
    };

    return (
        <tr>
            <td>{makeSecondStamp(caption.start)}</td>
            <td>{makeSecondStamp(caption.end)}</td>
            <td>{caption.text}</td>
            <td><input type="button" onClick={removeFn} value="Remove" /></td>
        </tr>
    )
}
