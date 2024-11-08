import React from 'react';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/dropdown';

export function CategoryDropDown ({categories}){
    return(
        <Dropdown className='dark'>
        <DropdownTrigger>
            <Button className="bg-blue-500 text-white hover:bg-blue-600 w-full sm:w-auto">
                Filtrar por Categoría
            </Button>
        </DropdownTrigger>
        <DropdownMenu>
            <DropdownSection>
                {categories.map((category) => (
                    <DropdownItem value={category.id} key={category.id}>
                        {category.name}
                    </DropdownItem>
                ))}
            </DropdownSection>
        </DropdownMenu>
    </Dropdown>
    )
}