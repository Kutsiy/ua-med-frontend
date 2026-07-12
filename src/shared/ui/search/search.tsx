import { Search as SearchIcon } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../input-group';
import { Button } from '../button';

export function Search() {
  return (
    <InputGroup className="">
      <InputGroupInput placeholder="Search..." />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <Button>Знайти</Button>
      </InputGroupAddon>
    </InputGroup>
  );
}
