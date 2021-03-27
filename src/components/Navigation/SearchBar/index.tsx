import * as React from "react";
import { useRouter } from "next/router";
import Select from "~components/Forms/Select";
import topics, { stafftopics } from "~containers/Pages/Help/Topics";
import stripSpaces from "~utils/stripSpaces";
import { EventTarget } from "~types";

export type TSearchBarProps = {
  role: string;
};

export type TSearchBarState = {
  searchText: string;
  id: string;
};

const SearchBar = ({ role }: TSearchBarProps): JSX.Element => {
  const router = useRouter();
  const availableTopics = role !== "employee" ? stafftopics : topics;
  const hash = router.asPath.split("#")[0];
  const [state, setState] = React.useState<TSearchBarState>({
    searchText: "",
    id: hash
  });
  const { searchText, id } = state;

  const handleSearchChange = ({ target: { value } }: EventTarget): void => {
    setState({
      searchText: value as string,
      id: stripSpaces(value as string)
    });
  };

  React.useEffect(() => {
    if (searchText && id) router.push(`/employee/help#${id}`);
  }, [id]);

  return (
    <Select
      isSearchable
      height="100%"
      name="searchQuestions"
      placeholder="Type here to search for common questions..."
      value={searchText}
      selectOptions={availableTopics}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;
