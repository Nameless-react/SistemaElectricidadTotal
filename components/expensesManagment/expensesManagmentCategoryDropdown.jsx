import React from 'react';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/dropdown';

export function CategoryDropDown ({categories, title, classNames ={
    base: "",
    button: "",
}}){
    return(
        <Dropdown className='dark'>
        <DropdownTrigger>
            <Button className={classNames.button}>
                {title || 'Seleccionar Categoria'}
            </Button>
        </DropdownTrigger>
        <DropdownMenu>
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