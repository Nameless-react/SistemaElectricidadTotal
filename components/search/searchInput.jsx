import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@nextui-org/input";
export const SearchInput = ({ handleSearch, className = "" }) => {
    return (
        <Input
            placeholder="Buscar"
            className={`dark ${className}`}
            onChange={handleSearch}
            startContent={
                <div>
                    <FontAwesomeIcon size="sm" icon={faSearch} />
                </div>
            }
        />
    )
}