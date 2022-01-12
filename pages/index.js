import Head from 'next/head'
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import CaptionPreview from './CaptionPreview';
import Link from "next/link";

export default function Home() {
  const [initialized, setInitialized] = useState(false);
  const [captions, setCaptions] = useState([]);
  const [currentCaption, setCurrentCaption] = useState("");
  const [currentTimestamp, setCurrentTimestamp] = useState("00:00:00:000");
  const [currentEndTimestamp, setCurrentEndTimestamp] = useState("00:00:00:000");

  const makeCaption = (captionText, start, end) => {
    // this should be a component to render? perhaps.
    return {
      text: captionText,
      start: toMillis(start),
      end: toMillis(end),
    };
  }
  const addCaption = (event) => {
    event.preventDefault();
    setCaptions([...captions, makeCaption(currentCaption, currentTimestamp, currentEndTimestamp)].sort((a, b) => a.start - b.start));
    setCurrentTimestamp(currentEndTimestamp);
    setCurrentCaption("");
  }

  const removeCaption = (captionIndex) => {
    let cpt = [...captions];
    cpt.splice(captionIndex, 1);
    setCaptions(cpt);
  };

  const toMillis = (value) => {
    let valueParts = value.split(":");
    let hh = parseInt(valueParts.shift());
    let mm = parseInt(valueParts.shift());
    let ss = parseInt(valueParts.shift());
    let ms = parseInt(valueParts.shift());
    mm += hh*60;
    ss += mm*60;
    ms += ss*1000;
    return ms;
  }

  useEffect(() => {
    if (initialized) {
      localStorage.setItem('captions', JSON.stringify(captions));
    } else {
      setCaptions(localStorage.getItem('captions') && JSON.parse(localStorage.getItem('captions')) || []);
      setInitialized(true);
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Caption This</title>
        <meta name="description" content="Caption this utility by D Brinson" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Create a caption with <a href="https://nextjs.org">Caption This</a>!
        </h1>
        <form onSubmit={addCaption}>
          <table>
            <thead>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Caption Text</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {captions.map((caption, index) => <CaptionPreview caption={caption} key={`captionPreview${index}`} removeFn={() => removeCaption(index)} />)}
            </tbody>
            <tfoot>
              <tr>
                <td><input type="text" id="startTime" value={currentTimestamp} onChange={(e) => setCurrentTimestamp(e.target.value)} /></td>
                <td><input type="text" id="endTime" value={currentEndTimestamp} onChange={(e) => setCurrentEndTimestamp(e.target.value)} /></td>
                <td><input type="text" id="captionText" placeholder="The FitnessGram Pacer Test is a multi-stage aerobic capacity test that progressively gets more difficult as it continues." 
                value={currentCaption} onChange={(e) => setCurrentCaption(e.target.value)} /></td>
                <td><input type="submit" value="Add" /></td>
              </tr>
            </tfoot>
          </table>
          <div>
          <Link href='/CaptionView'>go</Link>
          </div>
        </form>
        
      </main>
    </div>
  )
}
