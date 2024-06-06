import Head from "next/head";
import { useMemo, useState } from "react";

export default function LetterCaller() {
  const [currentLetter, setCurrentLetter] = useState("");
  const [calledLetters, setCalledLetters] = useState<string[]>([]);

  const bingo = ["B", "I", "N", "G", "O"];
  const letters = useMemo(
    () => ["a", "b", "B", "d", "D", "n", "N", "3", "7"] as const,
    [],
  );

  const getRandomLetter = () => {
    const randomBingoIndex = Math.floor(Math.random() * bingo.length);
    const randomLetterIndex = Math.floor(Math.random() * letters.length);
    const randomBingoLetter = bingo[randomBingoIndex];
    const randomLetter = letters[randomLetterIndex];
    if (calledLetters.includes(`${randomBingoLetter}-${randomLetter}`)) {
      getRandomLetter();
      return;
    }
    setCalledLetters([
      ...calledLetters,
      `${randomBingoLetter}-${randomLetter}`,
    ]);
    setCurrentLetter(`${randomBingoLetter}-${randomLetter}`);
  };

  const reset = () => {
    setCalledLetters([]);
    setCurrentLetter("");
  };

  return (
    <>
      <Head>
        <title>Lettering Bingo - Caller</title>
        <meta
          name="description"
          content="Generate printable bingo sheets for kids to practice their lettering"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center">
        <h2 className="text-4xl">{currentLetter}</h2>
        <button
          className="rounded-lg border-2 px-4 py-2"
          onClick={getRandomLetter}
        >
          Pull a Letter
        </button>
        {calledLetters.length > 0 && (
          <h3 className="mt-6 text-2xl">Called Letters</h3>
        )}
        <ul>
          {calledLetters.map((letter, index) => (
            <li key={index}>{letter}</li>
          ))}
        </ul>
        {calledLetters.length > 0 && (
          <button className="rounded-lg border-2 px-4 py-2" onClick={reset}>
            Start Over
          </button>
        )}
      </main>
    </>
  );
}
