export default function ModalCreateTask() {
    return (
        <>
            <Button color="danger" variant="ghost" className="font-bold min-w-40 outline-none" onPress={onOpen}>Eliminar Proyecto</Button>
                <Modal backdrop={"blur"} className="dark" isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Confirmar Suspensión</ModalHeader>
                        <ModalBody>
                            <p>Para confirmar la suspensión del proyecto escriba "{name}"</p>
                            <Input className="outline-none" type="text" value={confirmName} onChange={handleChange} aria-label="Confirmación de nombre de proyecto" aria-describedby="project-name-helper"/>
                            {confirmName !== name && confirmName.length > 0 && (
                                <p id="project-name-helper" className="text-red-500 text-sm mt-1">
                                    El nombre ingresado no coincide con el del proyecto. Por favor, verifíquelo.
                                </p>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={() => handleClose(onClose)}>Cancelar</Button>
                            <Button isDisabled={confirmName !== name} color="primary" onPress={() => handleDelete(onClose)}>Confirmar</Button>
                        </ModalFooter>
                        </>
                    )}
                    </ModalContent>
                </Modal>    
        </>
    )
}