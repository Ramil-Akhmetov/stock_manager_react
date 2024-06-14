import { FormControl, TextField, TextFieldProps } from '@mui/material';
import React, {
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDebounce } from '../../lib/hooks/useDebounce.ts';

type SearchInputProps = {
  onSearch: (search: string) => void;
} & TextFieldProps;

function SearchInput(props: SearchInputProps) {
  const { onSearch, ...otherProps } = props;

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  const onChangeSearch = useCallback(
    (evt: ChangeEvent<HTMLInputElement>) => {
      setSearch(evt.target.value);
    },
    [setSearch]
  );

  const onSubmit = useCallback(async (evt: FormEvent) => {
    evt.preventDefault();
  }, []);
  return (
    <form onSubmit={onSubmit}>
      <TextField
        type="text"
        placeholder="Поиск"
        size="small"
        value={search}
        onChange={onChangeSearch}
        {...otherProps}
      />
    </form>
  );
}

export default memo(SearchInput);
