import { Search as SearchIcon } from 'lucide-react';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../input-group';
import { Button } from '../button';

export function Search() {
  return (
    <InputGroup className="w-[70%] h-16 py-2">
      <InputGroupInput placeholder="Назва ліків, клінік або послуг" />
      <InputGroupAddon className="px-2">
        <SearchIcon className="size-6" />
      </InputGroupAddon>
      <InputGroupAddon
        className="relative before:absolute before:left-[-10px] before:content-[''] before:h-[90%] before:w-[2px] before:bg-secondary"
        align="inline-end"
      >
        <Button className="h-12 text-3xl">Знайти</Button>
      </InputGroupAddon>
    </InputGroup>
  );
}
