import React from 'react';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

/**
 * Component for rendering a category dropdown menu.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.categories - The list of categories to display in the dropdown.
 * @param {string} props.title - The title to display when no category is selected.
 * @param {Object} [props.classNames] - Optional class names for styling.
 * @param {string} [props.classNames.base] - Base class name for the dropdown.
 * @param {string} [props.classNames.button] - Class name for the dropdown button.
 * @param {Function} props.handleDropdownChande - Callback function to handle dropdown selection change.
 * @param {Function} props.handleStateOpenChange - Callback function to handle dropdown open state change.
 * @param {string} props.selectedCategoryName - The name of the currently selected category.
 * @param {boolean} props.isStateDropdownOpen - Boolean indicating if the dropdown is open.
 * @param {string} props.selectedCategory - The key of the currently selected category.
 *
 * @returns {JSX.Element} The rendered category dropdown component.
 */
export function CategoryDropDown({ categories, title, classNames = {
    base: "",
    button: "",
},
    handleDropdownChande,
    handleStateOpenChange,
    selectedCategoryName,
    isStateDropdownOpen,
    selectedCategory,


}) {
    return (
        <Dropdown className='dark' onOpenChange={handleStateOpenChange}>
            <DropdownTrigger>
                <Button className={classNames.button}>
                    {selectedCategoryName || title}
                    <div>
                        <FontAwesomeIcon
                            icon={faCaretDown}
                            className={`ml-1 transition-transform duration-200 ${isStateDropdownOpen ? 'rotate-180' : ''}`}
                        />
                    </div>
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label='Dropdown menu'
                disallowEmptySelection
                selectionMode='single'
                selectedKeys={selectedCategory}
                onSelectionChange={handleDropdownChande}
            >
                <DropdownSection>
                    {categories.map((category) => (
                        <DropdownItem value={category.idExpenseCategory} key={category.idExpenseCategory}>
                            {category.name}
                        </DropdownItem>
                    ))}
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    )
}