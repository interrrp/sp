import { Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Password from "@/lib/password";

interface PasswordsViewProps {
  passwords: Password[];
  onRemove?: (name: string) => void | Promise<unknown>;
  className?: string;
}

export default function PasswordsView(props: PasswordsViewProps) {
  return (
    <Table className={props.className}>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Password</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.passwords.map((password) => (
          <TableRow key={password.name}>
            <TableCell>{password.name}</TableCell>
            <TableCell className="flex justify-between items-center">
              {password.password}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    navigator.clipboard.writeText(password.password)
                  }
                >
                  Copy
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash size={16} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Do you really want to remove this password?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action <b>cannot be undone</b>. There will be no
                        way to recover this password.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Nevermind</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive hover:opacity-90 duration-100"
                        onClick={() => {
                          if (props.onRemove) props.onRemove(password.name);
                        }}
                      >
                        Yes
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
