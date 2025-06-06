import { createSignal } from 'solid-js';

export default () => {
  const [lastWord, setlastWord] = createSignal('しりとり');
  let wordInput: HTMLInputElement;
  return (<>
    <h1>しりとり</h1>
    <div>Last Word: {lastWord()}</div>
    <input ref={elem => wordInput = elem} onKeyDown={(e) => {
      if (e.key !== "Enter") return;
      const word = wordInput.value;
      if (word === '') return;
      if (word[0] !== lastWord().at(-1)) {
        alert('つながってないよ!');
        return;
      }
      setlastWord(word);
      wordInput.value = '';
    }} />
    <button onClick={() => { setlastWord("しりとり") }}>リセット</button>
  </>);
};
