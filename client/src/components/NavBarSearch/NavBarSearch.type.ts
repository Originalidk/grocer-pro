export type NavBarSearchProps = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: () => void;
}