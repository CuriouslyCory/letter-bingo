import Head from "next/head";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

export default function Home() {
  const letters = useMemo(
    () => ["a", "b", "B", "d", "D", "n", "N", "3", "7"] as const,
    [],
  );
  const [letterMatrix, setLetterMatrix] = useState<string[][]>([]);

  const randomArray = useCallback(() => {
    const array: Array<string[]> = [];
    for (let i = 0; i < 5; i++) {
      const shuffledLetters = [...letters].sort(() => Math.random() - 0.5);
      const row: string[] = [];
      for (let j = 0; j < 5; j++) {
        row.push(shuffledLetters.pop() ?? "");
      }
      array.push(row);
    }
    const rotatedArray = (() => {
      const rotated = [];
      for (let i = 0; i < 5; i++) {
        const column = [];
        for (let j = 0; j < 5; j++) {
          column.push(array?.[j]?.[i] ?? "?");
        }
        rotated.push(column);
      }
      return rotated;
    })();
    return rotatedArray;
  }, [letters]);

  const updateLetterMatrix = useCallback(() => {
    setLetterMatrix(randomArray());
  }, [randomArray]);

  return (
    <>
      <Head>
        <title>Lettering Bingo</title>
        <meta
          name="description"
          content="Generate printable bingo sheets for kids to practice their lettering"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <table className="border-collapse border border-slate-500 text-4xl">
          <thead>
            <tr>
              <th className="border border-slate-600 p-4">B</th>
              <th className="border border-slate-600 p-4">I</th>
              <th className="border border-slate-600 p-4">N</th>
              <th className="border border-slate-600 p-4">G</th>
              <th className="border border-slate-600 p-4">O</th>
            </tr>
          </thead>
          <tbody>
            {letterMatrix?.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((letter, columnIndex) => (
                  <td
                    key={columnIndex}
                    className="text-stroke border border-slate-600 p-4 text-center text-6xl"
                  >
                    <svg width="100" height="100">
                      <text
                        x="50"
                        y="50"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                      >
                        {letter}
                      </text>
                    </svg>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="rounded-lg border-2 px-4 py-2 print:hidden"
          onClick={updateLetterMatrix}
        >
          New Sheet
        </button>
        <button
          className="rounded-lg border-2 px-4 py-2 print:hidden"
          onClick={() => window.print()}
        >
          Print
        </button>
        <Link href="/letter-caller">
          <button className="rounded-lg border-2 px-4 py-2 print:hidden">
            Play Game
          </button>
        </Link>
      </main>
    </>
  );
}
