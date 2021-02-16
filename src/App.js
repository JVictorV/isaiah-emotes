import './index.css';
import { useEffect, useState } from 'react';

const FiveHead = 'https://cdn.betterttv.net/frankerfacez_emote/239504/2';
const LUL = 'https://cdn.betterttv.net/frankerfacez_emote/128054/2';
const Hmmm = 'https://cdn.betterttv.net/frankerfacez_emote/436953/2';

const emotes = [FiveHead, LUL, Hmmm];

const getRandomEmote = () => emotes[Math.floor(Math.random() * emotes.length)];

const getRandomPos = () => Math.floor(Math.random() * 100);

const getRandomTimer = (max = 10000, min = 2000) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const xPercentToScreenWidth = (x) => Math.floor((window.innerWidth * x) / 100);

const yPercentToScreenHeight = (x) =>
  Math.floor(((window.innerHeight - 50) * x) / 100);

const getCurrentTime = () => new Date().getTime();

const createEmoteObj = (
  timeout = getRandomTimer(),
  x = xPercentToScreenWidth(getRandomPos()),
  y = yPercentToScreenHeight(getRandomPos()),
  url = getRandomEmote(),
) => ({
  x,
  y,
  timeout: getCurrentTime() + timeout,
  url,
});

function App() {
  const [emotes, setEmotes] = useState([]);

  const createEmote = () => {
    setEmotes([...emotes, createEmoteObj()]);
  };

  const createTwoEmotesSameTimeout = () => {
    const timeout = getRandomTimer();

    setEmotes([...emotes, createEmoteObj(timeout), createEmoteObj(timeout)]);
  };

  useEffect(() => {
    if (!emotes.length) {
      return;
    }

    const currentTime = getCurrentTime();

    const sortedEmotes = emotes?.sort((a, b) => a.timeout - b.timeout);

    if (sortedEmotes?.[0]?.timeout < currentTime) {
      setEmotes(sortedEmotes.filter((emote) => emote.timeout > currentTime));
      return;
    }

    const [firstEmote, ...rest] = sortedEmotes;
    const timeout = setTimeout(
      () => setEmotes(rest),
      firstEmote.timeout - currentTime,
    );

    return () => clearTimeout(timeout);
  }, [emotes]);

  return (
    <div>
      <div className='emotes-container'>
        {emotes.map((emote) => (
          <div style={{ position: 'absolute', left: emote.x, top: emote.y }}>
            <img src={emote.url} alt='alt hurr durr' />
            <span>{emote.timeout}</span>
          </div>
        ))}
      </div>
      <button onClick={createEmote}>Create emoji</button>
      <button onClick={createTwoEmotesSameTimeout}>Create 2 emoji</button>
    </div>
  );
}

export default App;
