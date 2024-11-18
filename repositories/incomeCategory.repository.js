class IncomeCategoryRepository {
    constructor(IncomeCategoryModel, sequelize) {
        this.IncomeCategoryModel = IncomeCategoryModel;
        this.sequelize = sequelize;
    }

    async getIncomeCategories() {
        try {
            const incomeCategories = await this.IncomeCategoryModel.findAll();
            if (!incomeCategories || incomeCategories.length === 0) {
                return null;
            }
            const formattedCategories = incomeCategories.map(category => category.dataValues);
            return formattedCategories;
        } catch (error) {
            console.error('An error occurred while getting income categories:', error);
            throw new Error('Error al obtener las categorias de ingresos.');
        }
    }

    async getIncomeCategoryById(id) {
        try {
            const incomeCategory = await this.IncomeCategoryModel.findByPk(id);
            if (!incomeCategory) {
                return null;
            }
            return incomeCategory.dataValues;
        } catch (error) {
            console.error('An error occurred while getting income category by id:', error);
            throw new Error('Error al obtener la categoria de ingresos por id.');
        }
    }
    async getIncomeCategoryByName(name) {
        try {

            const incomeCategory = await this.IncomeCategoryModel.findOne({ where: { name: name } });

            if (!incomeCategory) {
                return null;
            }

            return incomeCategory.dataValues;
        } catch (error) {
            console.error('Error al obtener la categoría de ingresos por nombre:', error);
            throw new Error('Error al obtener la categoria de ingresos por nombre: ' + error.message); // Agregar el mensaje original para mayor detalle
        }
    }

    async saveIncomeCategory(formData) {
        try {
            const incomeCategory = await this.IncomeCategoryModel.create({
                name: formData.name,
                description: formData.description,
                status: formData.status,
                createdAt: new Date(),
                updatedAt: new Date()

            });
            if (!incomeCategory) {
                return null;
            }
            return incomeCategory.dataValues;
        } catch (error) {
            console.error('An error occurred while saving income category:', error);
            throw new Error('Error al guardar la categoria de ingresos.');
        }
    }

    async updateIncomeCategory(formData, id) {
        try {
            const incomeCategory = await this.IncomeCategoryModel.update({
                name: formData.name,
                description: formData.description,
                status: formData.status,
                updatedAt: new Date()
            }, {
                where: {
                    idIncomeCategory: id
                }
            });
            if (!incomeCategory) {
                return null;
            }
            return incomeCategory;
        } catch (error) {
            console.error('An error occurred while updating income category:', error);
            throw new Error('Error al actualizar la categoria de ingresos.');
        }
    }

    async inactivateIncomeCategory(id) {
        try {
            const incomeCategory = await this.IncomeCategoryModel.update({
                status: 'Inactiva',
                updatedAt: new Date()
            }, {
                where: {
                    idIncomeCategory: id
                }
            });
            if (!incomeCategory) {
                return null;
            }
            return incomeCategory;
        } catch (error) {
            console.error('An error occurred while inactivating income category:', error);
            throw new Error('Error al inactivar la categoria de ingresos.');
        }
    }
}

export default IncomeCategoryRepository;