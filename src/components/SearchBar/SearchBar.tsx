import { ChangeEvent, FormEvent, useState } from 'react';
import s from './SearchBar.module.css';
import toast from 'react-hot-toast';
import { CiSearch } from 'react-icons/ci';
interface SearchBarProps {
  onSearch: (query: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [value, setValue] = useState<string>('');
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value);
      setValue('');
    }
    if (value.trim() == '') {
      toast.error('Enter text!');
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <header>
      <form onSubmit={handleSubmit}>
        <label className={s.wrap}>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={e => setValue(e.target.value)}
            value={value}
          />
          <button className={s.icon}>
            <CiSearch />
          </button>
        </label>
      </form>
    </header>
  );
};
export default SearchBar;
