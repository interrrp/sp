import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Password from "@/lib/password";
import { isEmpty } from "@/lib/utils";

interface PasswordInputProps {
  onSubmit: (password: Password) => void | Promise<unknown>;
}

export default function PasswordInput(props: PasswordInputProps) {
  const { toast } = useToast();

  function onSubmit(data: FormData) {
    const name = data.get("name") as string;
    const password = data.get("password") as string;
    if (isEmpty(name) || isEmpty(password)) {
      toast({
        variant: "destructive",
        title: "Nope!",
        description: "Both name and password are required",
      });
      return;
    }
    props.onSubmit({ name, password });
  }

  return (
    <form action={onSubmit} className="flex gap-2" autoComplete="off">
      <Input name="name" placeholder="Name" />
      <Input name="password" type="password" placeholder="Password" />
      <Button type="submit">Add</Button>
    </form>
  );
}
