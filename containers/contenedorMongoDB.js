import mongoose from 'mongoose';

class ContenedorMongoDB {
    constructor(model){
        this.model = model;
    }

    async getById(id, lean = false) {
        try{
            if (!mongoose.Types.ObjectId.isValid(id)) return null;
            
            if (!lean) return await this.model.findById(id);

            return await this.model.findById(id).lean().exec()
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async getByField(field, value, findOne = true) {
        try{
            let result;
            if (findOne){
                result = await this.model.findOne({[field]:value});
            } else {
                result = await this.model.find({[field]:value});
            }
            
            return result ? result : null;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async getAll() {
        try{
            const all = await this.model.find({});
            return all;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async searchBy(searchField, criteria) {
        try{
            return await this.model.findOne({searchField:criteria})
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async save(item) {
        try{
            const object = await this.model.create(item);
            return object;
        }
        catch(error){
            return {errorCode:error.code, error:error.message}
        }
    }

    async saveContent(item) {
        try{
            const id = await this.model.create(item);
            return id;
        }
        catch(error){
            return {errorCode:error.code, error:error.message}
        }
    }

    async deleteById(id) {
        try{
            const deleted = await this.model.findOneAndDelete({ _id: id });
            return deleted;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async updateById(id,item) {
        try{
            const updated = await this.model.findOneAndUpdate({ _id: id },item,  {new: true});
            return updated;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async distinct(field,criteria) {
        try{
            const distinct = await this.model.distinct(field, criteria);
            return distinct;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }
}

export default ContenedorMongoDB;