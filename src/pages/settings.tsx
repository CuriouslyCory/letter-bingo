import { useAtom } from "jotai";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { lettersAtom } from "~/lib/state";

/**
 * SettingsPage component allows users to manage a list of letters or numbers.
 * Users can add or remove specific letters or numbers from the list.
 */
const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  const [letters, setLetters] = useAtom(lettersAtom);
  const [addInput, setAddInput] = useState<string>("");

  /**
   * Handles adding a specific letter or number to the list.
   */
  const handleAddLetter = () => {
    if (letters.includes(addInput.trim())) {
      toast({
        title: "Letter already exists!",
      });
      return;
    }
    if (addInput.trim()) {
      setLetters((prevLetters) => [...prevLetters, addInput.trim()]);
      setAddInput(""); // Clear the input field
    }
  };

  const removeLetter = (letter: string) => {
    if (letters.length <= 5) {
      toast({
        title: "You must have at least 5 letters!",
      });
      return;
    }
    setLetters((prevLetters) => prevLetters.filter((l) => l !== letter));
  };

  return (
    <main className="flex flex-col items-center">
      <div className="mb-4">
        <input
          type="text"
          value={addInput}
          onChange={(e) => setAddInput(e.target.value)}
          placeholder="Enter letter or number to add"
          className="mr-2 border p-2"
        />
        <Button onClick={handleAddLetter}>Add Letter/Number</Button>
      </div>

      <ul className="flex flex-wrap gap-x-2">
        {letters.sort().map((letter, index) => (
          <li
            className="cursor-pointer p-1 hover:bg-red-300 hover:line-through"
            onClick={() => removeLetter(letter)}
            key={index}
          >
            {letter}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default SettingsPage;
