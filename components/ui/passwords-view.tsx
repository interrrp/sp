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
              <Button
                variant="outline"
                onClick={() => navigator.clipboard.writeText(password.password)}
              >
                Copy
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
