"use client";

import { useLocalStorage } from "react-use";

import PasswordInput from "@/components/ui/password-input";
import { useToast } from "@/components/ui/use-toast";
import Password from "@/lib/password";
import dynamic from "next/dynamic";

const PasswordsView = dynamic(() => import("@/components/ui/passwords-view"), {
  ssr: false,
});

export default function Home() {
  const [passwords, setPasswords] = useLocalStorage<Password[]>(
    "passwords",
    [],
  ) as unknown as [Password[], (passwords: Password[]) => void];

  const { toast } = useToast();

  return (
    <main className="lg:w-1/2 w-full mx-auto px-8">
      <div className="sticky z-10 top-8 backdrop-blur-lg p-4 border rounded-md">
        <PasswordInput
          onSubmit={(password) => {
            setPasswords([...passwords, password]);
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
          setPasswords(passwords.filter((password) => password.name !== name));
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
