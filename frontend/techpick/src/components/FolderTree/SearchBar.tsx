import { SearchIcon } from 'lucide-react';
import { useDisclosure } from '@/hooks';
import { searchItemStyle } from './searchBar.css';
import SearchDialog from '../Search2/SearchDialog';

export function SearchBar() {
  const { isOpen: isSearchDialogOpen, onToggle: onSearchDialogToggle } =
    useDisclosure();

  return (
    <div>
      <div className={searchItemStyle} onClick={onSearchDialogToggle}>
        <SearchIcon size={16} />
      </div>

      <SearchDialog
        isOpen={isSearchDialogOpen}
        onOpenChange={onSearchDialogToggle}
      />
    </div>
  );
}
