"use client";

import { useEffectOnce, useLocalStorage } from "react-use";

import PasswordInput from "@/components/ui/password-input";
import PasswordsView from "@/components/ui/passwords-view";
import { useToast } from "@/components/ui/use-toast";
import Password from "@/lib/password";

export default function Home() {
  const [passwords, setPasswords] = useLocalStorage<Password[]>(
    "passwords",
    []
  );
  useEffectOnce(() => {
    if (!passwords) setPasswords([]);
  });

  const { toast } = useToast();

  return (
    <main className="lg:w-1/2 w-full mx-auto px-8">
      <div className="sticky z-10 top-8 backdrop-blur-lg p-4 border rounded-md">
        <PasswordInput
          onSubmit={(password) => {
            setPasswords([...(passwords as Password[]), password]);
            toast({
              title: "Password added",
              description: `Password for "${password.name}" added successfully`,
            });
          }}
        />
      </div>
      <PasswordsView
        passwords={passwords as Password[]}
        onRemove={(name) => {
          setPasswords((passwords) => {
            if (!passwords) return;

            const index = passwords.findIndex(
              (password) => password.name === name
            );
            if (index === -1) return passwords;
            const newPasswords = [...passwords];
            newPasswords.splice(index, 1);
            return newPasswords;
          });

          toast({
            title: "Password removed",
            description: `Password for "${name}" removed successfully`,
          });
        }}
        className="mt-12"
      />
    </main>
  );
}
