import { Collection } from './collection';
import { IMapper } from './i-mapper';
import { ApiAdapter } from '../api-provider/api.adapter';
import { Model } from './model';

export abstract class Mapper<Interface, CModel extends Model> implements IMapper<Interface, CModel> {
    protected adapter: ApiAdapter<Interface, CModel>;

    public constructor(adapter: ApiAdapter<Interface, CModel>) {
        this.adapter = adapter;
    }

    public async getAll(criteria?: RequestCriteria): Promise<Collection<Interface, CModel>> {
        const requestCollection = await this.adapter.getAll(criteria);

        return this.createCollection(requestCollection);
    }

    public async create(model: CModel): Promise<CModel> {
        const requestModel = await this.adapter.create(model);

        return this.createModel(requestModel);
    }

    public async update(model: CModel): Promise<CModel> {
        const requestModel = await this.adapter.update(model);

        return this.createModel(requestModel);
    }

    public async deleteById(id: number): Promise<void> {
        await this.adapter.deleteById(id);
    }

    public async deleteByAttributes(criteria: RequestCriteria): Promise<void> {
        await this.adapter.deleteByAttributes(criteria);
    }

    public async findById(id: number): Promise<CModel> {
        const requestModel = await this.adapter.findById(id);

        return this.createModel(requestModel);
    }

    public async findByAttributes(criteria: RequestCriteria): Promise<Collection<Interface, CModel>> {
        const requestCollection = await this.adapter.findByAttributes(criteria);

        return this.createCollection(requestCollection);
    }

    protected abstract createModel(data: Interface): CModel;

    protected abstract createCollection(data: Interface[]): Collection<Interface, CModel>;
}
