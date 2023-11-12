import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Password from "@/lib/password";
import { isEmpty } from "@/lib/utils";

interface PasswordInputProps {
  onSubmit: (password: Password) => void | Promise<unknown>;
}

export default function PasswordInput(props: PasswordInputProps) {
  function onSubmit(data: FormData) {
    const name = data.get("name") as string;
    const password = data.get("password") as string;
    if (!isEmpty(name) || !isEmpty(password))
      props.onSubmit({ name, password });
  }

  return (
    <form action={onSubmit} className="flex gap-2">
      <Input name="name" placeholder="Name" autoComplete="off" />
      <Input name="password" placeholder="Password" autoComplete="off" />
      <Button type="submit">Add</Button>
    </form>
  );
}